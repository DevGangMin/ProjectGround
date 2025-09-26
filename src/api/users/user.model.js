const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // 필수 값
      unique: true,   // 고유한 값 (중복 불가)
    },
    password: {
      type: String,
      required: true, // 필수 값
    },
  },
  {
    // 시간 기록
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;