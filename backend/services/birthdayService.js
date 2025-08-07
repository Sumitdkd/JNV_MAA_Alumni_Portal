const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const moment = require('moment');

// Function to get today's birthday users
const getTodaysBirthdayUsers = async () => {
    try {
        const today = new Date();
        const todayMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
        const todayDay = today.getDate();

        const birthdayUsers = await User.find({
            isApproved: true,
            $expr: {
                $and: [
                    { $eq: [{ $dayOfMonth: '$dateOfBirth' }, todayDay] },
                    { $eq: [{ $month: '$dateOfBirth' }, todayMonth] }
                ]
            }
        });

        console.log(`Found ${birthdayUsers.length} users with birthdays today (${todayDay}/${todayMonth})`);
        return birthdayUsers;
    } catch (error) {
        console.error('Error fetching today\'s birthday users:', error);
        return [];
    }
};

// Function to calculate age
const calculateAge = (dateOfBirth) => {
    return moment().diff(moment(dateOfBirth), 'years');
};

// Function to generate birthday email template
const generateBirthdayEmailTemplate = (user) => {
    const age = calculateAge(user.dateOfBirth);
    const firstName = user.fullName.split(' ')[0];
    
    return `
    <div style="font-family: 'Montserrat', sans-serif; background: #f0f2f5; padding: 40px 20px; margin: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.07);">

        <div style="background: linear-gradient(145deg, #8448ac 0%, #FF9F43 100%); padding: 40px 25px; text-align: center; position: relative;">
            <div style="font-size: 65px; margin-bottom: 10px; line-height: 1;">
                <span style="display: inline-block; transform: rotate(-5deg);">🥳</span>
            </div>
            <h1 style="color: white; margin: 0; font-size: 30px; font-weight: 700; text-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                Happy Birthday, Dearest ${firstName}!
            </h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 18px; font-weight: 300;">
                आपको जन्मदिन की हार्दिक शुभकामनाएं! 🎂
            </p>
        </div>

        <div style="padding: 30px 30px; text-align: center;">

            <div style="margin-bottom: 25px;">
                <div style="font-size: 70px; margin-bottom: 10px; line-height: 1;">
                    <span style="display: inline-block; transform: scale(1.05);">✨</span>
                </div>
                <h2 style="color: #4a4a4a; margin: 0 0 8px 0; font-size: 26px; font-weight: 600;">
                    Celebrating ${age} Years of Wonderful You!
                </h2>
                <p style="color: #7f8c8d; margin: 0; font-size: 16px;">
                    Another incredible year filled with joy and amazing memories.
                </p>
            </div>

            <div style="background: #fff8f2; border-radius: 10px; padding: 25px; margin-bottom: 25px; border-left: 5px solid #FF9F43;">
                <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                    From Your Warm Navodaya Family
                </h3>
                <p style="color: #555; line-height: 1.6; margin: 0; font-size: 15px;">
                    We're thinking of all the happy times from our school days at <strong>JNV Mandphia,Chittorgarh</strong>. Those shared moments are truly precious!
                    <br><br>
                    May this new year bring you immense happiness, success, and everything wonderful you deserve. We're cheering for you!
                </p>
            </div>

            <div style="background: linear-gradient(135deg, #e0f7f4 0%, #d1f2eb 100%); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
                <p style="color: #2c3e50; margin: 0; font-size: 16px; line-height: 1.6;">
                    "May your birthday be filled with sunshine, smiles, and all the happiness your heart can hold. Here's to making more beautiful memories!" ❤️
                </p>
            </div>

            <div style="margin: 30px 0;">
                <a href="https://alumni-portal-davjjp.vercel.app/login"
                   style="background: linear-gradient(135deg, #8448ac 0%, #8448ac 100%);
                          color: white;
                          padding: 14px 35px;
                          text-decoration: none;
                          border-radius: 50px;
                          display: inline-block;
                          font-weight: 600;
                          font-size: 16px;
                          box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
                          transition: all 0.3s ease-in-out;">
                    Connect with Your Navodaya Family! 🎉
                </a>
            </div>

        </div>

        <div style="background: #f8faff; padding: 25px 30px; text-align: center; border-top: 1px solid #e9eff5;">
            <p style="color: #7f8c8d; margin: 0 0 10px 0; font-size: 14px;">
                Warmest wishes from the <strong>JNV MAA-Mandphia Alumni Association</strong>
            </p>
            <p style="color: #7f8c8d; margin: 0 0 15px 0; font-size: 13px; font-style: italic;">
                "Once a Navodain, Always a Navodain!" <span style="color: #FF6B6B;">💙</span>
            </p>
            <div style="border-top: 1px solid #e0e6ed; padding-top: 15px; margin-top: 15px;">
                <p style="color: #aeb6c1; margin: 0; font-size: 12px;">
                    Part of your Navodaya Alumni family.<br>
                    <a href="https://alumni-portal-davjjp.vercel.app/" style="color: #FF6B6B; text-decoration: none; font-weight: 500;">Visit Alumni Portal</a> •
                    <a href="mailto:jnvchittorgarhalumni@gmail.com" style="color: #FF6B6B; text-decoration: none; font-weight: 500;">Contact Us</a>
                </p>
            </div>
        </div>
    </div>
</div>
    `;
};

// Function to send birthday email to a user
const sendBirthdayEmail = async (user) => {
    try {
        const emailTemplate = generateBirthdayEmailTemplate(user);
        
        await sendEmail({
            email: user.email,
            subject: `🎉 Happy Birthday ${user.fullName.split(' ')[0]}! From Your DAV Family 🎂`,
            message: emailTemplate
        });
        
        console.log(`Birthday email sent successfully to ${user.fullName} (${user.email})`);
        return true;
    } catch (error) {
        console.error(`Failed to send birthday email to ${user.fullName} (${user.email}):`, error);
        return false;
    }
};

// Main function to send birthday emails to all users with birthdays today
const sendBirthdayEmails = async () => {
    try {
        console.log('Starting birthday email service...');
        const birthdayUsers = await getTodaysBirthdayUsers();
        
        if (birthdayUsers.length === 0) {
            console.log('No birthdays today. Service completed.');
            return;
        }
        
        let successCount = 0;
        let failureCount = 0;
        
        // Send emails to all birthday users
        for (const user of birthdayUsers) {
            const success = await sendBirthdayEmail(user);
            if (success) {
                successCount++;
            } else {
                failureCount++;
            }
            
            // Add small delay between emails to avoid overwhelming the email service
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log(`Birthday email service completed!`);
        console.log(`Successfully sent: ${successCount} emails`);
        console.log(`Failed to send: ${failureCount} emails`);
        
    } catch (error) {
        console.error('Error in birthday email service:', error);
    }
};

module.exports = {
    sendBirthdayEmails,
    getTodaysBirthdayUsers,
    sendBirthdayEmail,
    generateBirthdayEmailTemplate
};
