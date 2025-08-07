const Notification = require('../models/Notification');
const User = require('../models/User');
const sendEmail = require('./sendEmail');

const parseMentions = (text) => {
    if (!text) return [];
    const mentionRegex = /@\[([^\]]+)\]/g;
    const matches = text.match(mentionRegex);
    if (!matches) return [];
    return matches.map(match => match.substring(2, match.length - 1));
};

const sendNotification = async (req, notificationData) => {
    const { io, userSockets } = req;
    
    // Validate required fields
    if (!notificationData.recipient || !notificationData.sender || !notificationData.type) {
        console.error('Invalid notification data:', notificationData);
        return;
    }
    
    // Validate notification type
    const validTypes = ['new_comment', 'new_post', 'mention_comment', 'mention_chat', 'new_group_message', 'new_like'];
    if (!validTypes.includes(notificationData.type)) {
        console.error('Invalid notification type:', notificationData.type);
        return;
    }
    
    try {
        const notification = await Notification.create(notificationData);
        const recipientSocketId = userSockets.get(notification.recipient.toString());

        if (recipientSocketId) {
            const populatedNotification = await Notification.findById(notification._id).populate([
                { path: 'sender', select: 'fullName profilePicture' },
                { path: 'post', select: 'title _id' },
                { path: 'group', select: 'name _id' }
            ]);
            io.to(recipientSocketId).emit('new_notification', populatedNotification);
        }

        const unreadCount = await Notification.countDocuments({ recipient: notification.recipient, read: false });
        if (unreadCount === 10) {
            const recipient = await User.findById(notification.recipient);
            if (recipient) {
                sendEmail({
                    email: recipient.email,
                    subject: "Yaar, aap bhool toh nahi gaya humein? ❤️📬",
                    message: `
  <div style="font-family: 'Segoe UI', Roboto, sans-serif; background-color: #f5f7fa; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
      
      <div style="background-color:rgb(159, 75, 232); color: white; padding: 20px 30px;">
        <h2 style="margin: 0;">🌟 You’ve Been Missed!</h2>
      </div>
      
      <div style="padding: 25px 30px; color: #333;">
        <p style="font-size: 16px;">Hi ${recipient.fullName},</p>
        
        <p style="font-size: 16px; line-height: 1.5;">
          Your <strong>Alumni Portal </strong> has been active — and you’ve got <strong>10+ unread notifications</strong> waiting just for you.
        </p>
        
        <p style="font-size: 16px; line-height: 1.5;">
          Someone might have replied to your post, shared a new opportunity, or mentioned you in a conversation. We’d hate for you to miss it ❤️
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://alumni-portal-davjjp.vercel.app/login" target="_blank" style="background-color:rgb(176, 103, 232); color: white; padding: 14px 30px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">
            Visit Your Portal Now
          </a>
        </div>
        
        <p style="font-size: 15px; color: #666; text-align: center;">
          You belong here. Let’s reconnect 🌐
        </p>
      </div>
      
      <div style="background-color: #f0f0f0; text-align: center; padding: 15px; font-size: 13px; color: #777;">
        JNV Mandphia Alumni Association Portal<br/>
        <a href="https://alumni-portal-davjjp.vercel.app/" style="color: #888;">Unsubscribe</a> • 
        <a href="https://alumni-portal-davjjp.vercel.app/" style="color: #888;">Visit Portal</a>
      </div>
    </div>
  </div>
`
                });
            }
        }
    } catch (error) { console.error("Error sending notification:", error); }
};
module.exports = { parseMentions, sendNotification };