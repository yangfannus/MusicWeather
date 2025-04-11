const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '请提供用户名'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, '请提供邮箱'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        '请提供有效的邮箱',
      ],
    },
    password: {
      type: String,
      required: [true, '请提供密码'],
      minlength: 6,
      select: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema); 