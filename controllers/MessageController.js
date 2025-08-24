const Message = require('../models/MessageModel');

exports.getMessages = async (req, res) => {
  const currentUserId = req.user._id;   // logged-in user
  const otherUserId = req.params.userId;

  try {
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: otherUserId },
        { sender: otherUserId, receiver: currentUserId }
      ]
    }).sort({ timestamp: 1 }); // oldest first

    res.json({ status: 'success', messages });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};