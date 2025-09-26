const User = require('./user.model'); // 1. 우리가 만든 User 모델 가져오기
const bcrypt = require('bcryptjs');     // 2. 암호화 라이브러리 가져오기

// 회원가입 요청을 처리하는 최종 함수
const registerUser = async (req, res) => {
  try {
    // 3. Postman 또는 프론트엔드에서 보낸 email, password를 받음
    const { email, password } = req.body;

    // 4. 필수 정보가 모두 있는지 확인
    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 모두 입력해주세요.' });
    }

    // 5. 이미 가입된 이메일인지 데이터베이스에서 확인
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: '이미 가입된 이메일입니다.' });
    }

    // 6. 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 7. 암호화된 비밀번호로 새로운 사용자를 생성
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // 8. 성공적으로 생성되면, 주요 정보를 응답으로 보냄 (비밀번호 제외!)
    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        message: '회원가입 성공!'
      });
    } else {
      res.status(400).json({ message: '사용자 생성에 실패했습니다.' });
    }
  } catch (error) {
    // 9. 서버 내부에서 오류가 발생한 경우
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
};

module.exports = {
  registerUser,
};