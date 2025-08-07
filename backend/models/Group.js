const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);