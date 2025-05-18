const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String, },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isBlocked: {
    type: Boolean,
    default: false
  },
  token: { type: String, required: false },
});

module.exports = models.User || model('User', userSchema);
