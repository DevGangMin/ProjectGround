const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // 필수 값
      unique: true,   // 고유한 값이어야 함 (중복 불가)
    },
    password: {
      type: String,
      required: true, // 필수 값
    },
  },
  {
    // 데이터가 생성/수정될 때 자동으로 시간을 기록해줍니다.
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // 필수 값
      unique: true,   // 고유한 값이어야 함 (중복 불가)
    },
    password: {
      type: String,
      required: true, // 필수 값
    },
  },
  {
    // 데이터가 생성/수정될 때 자동으로 시간을 기록해줍니다.
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;