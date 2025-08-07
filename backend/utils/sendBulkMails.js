const sendMail = require('./sendEmail'); // Your existing utility
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Send emails to a list of users (with fullName and email) with a delay to avoid spamming.
 * 
 * @param {Array} users - Array of Mongoose User documents or plain objects with fullName and email
 * @param {Object} options - { subject, message } — message can include {{name}} placeholder
 * @param {Number} delayMs - Delay between emails in milliseconds (default 1500ms)
 */
async function sendBulkEmails(users, options, delayMs = 1500) {
    if (!Array.isArray(users)) throw new Error('Users must be an array');

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // Skip if no email or full name
        if (!user.email || !user.fullName) {
            console.warn(`⚠️ Skipping user with missing email or name:`, user);
            continue;
        }

        try {
            await sendMail({
                email: user.email,
                subject: options.subject,
                message: options.message.replace('{{name}}', user.fullName),
            });

            console.log(`✅ Email sent to ${user.fullName} <${user.email}>`);
        } catch (err) {
            console.error(`❌ Failed to send email to ${user.email}:`, err.message);
        }

        if (i !== users.length - 1) await sleep(delayMs); // delay before next email
    }
}

module.exports = sendBulkEmails;
