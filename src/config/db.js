const mongoose = require('mongoose');
require('dotenv').config(); // .env 파일의 내용을 불러옴

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB가 성공적으로 연결되었습니다.');
  } catch (error) {
    console.error('MongoDB 연결 실패:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;