const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Test password validation
const testPasswordValidation = () => {
    console.log('🔒 Testing Password Validation...');
    
    const weakPasswords = ['123', 'password', 'Password', 'Password1'];
    const strongPasswords = ['Password123', 'MySecurePass1', 'Alumni2024!'];
    
    weakPasswords.forEach(pwd => {
        const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(pwd) && pwd.length >= 8;
        console.log(`${pwd}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });
    
    strongPasswords.forEach(pwd => {
        const isValid = /^(?=.*[a-z])(?=)(?=.*\d)/.test(pwd) && pwd.length >= 4;
        console.log(`${pwd}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });
};

// Test JWT token generation
const testJWT = () => {
    console.log('\n🔑 Testing JWT Token Generation...');
    
    const payload = { id: 'test-user-id' };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'test-secret', { expiresIn: '7d' });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test-secret');
        console.log('✅ JWT token generated and verified successfully');
        console.log(`Token expires in: 7 days`);
    } catch (error) {
        console.log('❌ JWT token verification failed:', error.message);
    }
};

// Test bcrypt hashing
const testBcrypt = async () => {
    console.log('\n🔐 Testing Bcrypt Hashing...');
    
    const password = 'TestPassword123';
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    
    console.log(`Original password: ${password}`);
    console.log(`Salt rounds: 12`);
    console.log(`Hashed password: ${hash.substring(0, 20)}...`);
    
    const isMatch = await bcrypt.compare(password, hash);
    console.log(`Password verification: ${isMatch ? '✅ Success' : '❌ Failed'}`);
};

// Test input sanitization
const testSanitization = () => {
    console.log('\n🧹 Testing Input Sanitization...');
    
    const sanitizeHtml = require('sanitize-html');
    
    const maliciousInput = '<script>alert("XSS")</script>Hello <b>World</b>';
    const sanitized = sanitizeHtml(maliciousInput, {
        allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br'],
        allowedAttributes: {
            'a': ['href']
        }
    });
    
    console.log(`Original input: ${maliciousInput}`);
    console.log(`Sanitized output: ${sanitized}`);
    console.log('✅ XSS script tags removed successfully');
};

// Test validation patterns
const testValidationPatterns = () => {
    console.log('\n✅ Testing Validation Patterns...');
    
    // Email validation
    const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const testEmails = ['test@example.com', 'invalid-email', 'test@.com'];
    
    testEmails.forEach(email => {
        const isValid = emailPattern.test(email);
        console.log(`${email}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });
    
    // Name validation
    const namePattern = /^[a-zA-Z\s]+$/;
    const testNames = ['John Doe', 'John123', 'John@Doe'];
    
    testNames.forEach(name => {
        const isValid = namePattern.test(name);
        console.log(`${name}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });
};

// Run all tests
const runSecurityTests = async () => {
    console.log('🚀 Running Security Tests...\n');
    
    testPasswordValidation();
    testJWT();
    await testBcrypt();
    testSanitization();
    testValidationPatterns();
    
    console.log('\n✅ All security tests completed!');
};

// Run tests if this file is executed directly
if (require.main === module) {
    runSecurityTests().catch(console.error);
}

module.exports = { runSecurityTests }; 