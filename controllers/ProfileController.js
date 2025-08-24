const Profile=require('../models/ProfileModel');
const User=require('../models/UserModel');
const {ImageUpload,musicUpload,cloudinary}=require('../utils/upload');
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';
exports.updateProfile = async (req, res) => {
  try {
    const { name, surname } = req.body;

    // Find existing profile for this user
    let profile = await Profile.findOne({ user: req.user._id });
    
    if (!profile) {
      // Create new profile
      profile = await Profile.create({
        name,
        surname,
        profileUrl: req.file?.path || '',
        imagePublicId: req.file?.filename || '',
        user: req.user._id
      });

      // Link profile to user
      const user = await User.findById(req.user._id);
      user.Profile = profile._id;
      await user.save();
    } else {
      // Update existing profile
      if (profile.imagePublicId && req.file) {
        await cloudinary.uploader.destroy(profile.imagePublicId);
      }

      profile.name = name || profile.name;
      profile.surname = surname || profile.surname;
      if (req.file) {
        profile.profileUrl = req.file.path;
        profile.imagePublicId = req.file.filename;
      }

      await profile.save();

      // Ensure user has profile linked
      const user = await User.findById(req.user._id);
      user.Profile = profile._id;
      await user.save();
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile details updated successfully',
      profile
    });

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({
        status: 'fail',
        message: 'Profile was not created'
      });
    }

    res.status(200).json({
      status: 'success',
      profile:profile
    });

  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err.message
    });
  }
};

exports.getUser=async (req,res)=>{
try{
  const user=await User.findOne(req.user._id);
  if(!user)
    return res.json({
     status:'fail',
     message:'user not found'
  })
 res.status(200).json({
    status:'success',
    user:user
  })

}
catch(err)
{
  res.status(500).json({
      status: 'fail',
      message: err.message
    });
}
  

}