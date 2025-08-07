const cron = require('node-cron');
const { sendBirthdayEmails } = require('../services/birthdayService');
const moment = require('moment');

// Birthday email cron job - runs every day at 6:00 AM
const startBirthdayCronJob = () => {
    console.log('Initializing birthday email cron job...');
    
    // Cron expression: '0 6 * * *' means every day at 6:00 AM
    // Format: second minute hour day-of-month month day-of-week
    // 0 6 * * * = At 6:00 AM every day
    // 30 18 * * * = At 6:30 PM every day (example)
    const birthdayJob = cron.schedule('0 6 * * *', async () => {
        const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(`\n🎂 Birthday email cron job triggered at: ${currentTime}`);
        
        try {
            await sendBirthdayEmails();
        } catch (error) {
            console.error('Error in birthday cron job:', error);
        }
        
        console.log('🎉 Birthday email cron job completed.\n');
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata" // Indian Standard Time
    });
    
    console.log('Birthday email cron job scheduled successfully!');
    console.log('Schedule: Every day at 6:00 AM IST');
    console.log('Timezone: Asia/Kolkata (Indian Standard Time)');
    
    return birthdayJob;
};

module.exports = {
    startBirthdayCronJob
};
