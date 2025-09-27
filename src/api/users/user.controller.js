const User = require('./user.model');
const bcrypt = require('bcryptjs');

// 회원가입 요청을 처리하는 최종 함수
const registerUser = async (req, res) => {
  try {
    // Postman 또는 프론트엔드에서 보낸 email, password를 받음
    const { email, password } = req.body;

    // 필수 정보가 모두 있는지 확인
    if (!email || !password) {
      return res.status(400).json({ message: '이메일과 비밀번호를 모두 입력해주세요.' });
    }

    // 이미 가입된 이메일인지 데이터베이스에서 확인
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: '이미 가입된 이메일입니다.' });
    }

    // 비밀번호 암호화
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 암호화된 비밀번호로 새로운 사용자를 생성
    const user = await User.create({
      email,
      password: hashedPassword,
    });

    // 성공적으로 생성되면, 주요 정보를 응답으로 보냄 (비밀번호 제외)
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
    // 서버 내부에서 오류 발생
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // email로 user 검색
    const user = await User.findOne({ email });

    // 사용자 존재 여부, 입력된 비밀번호, 암호화된 비밀번호의 일치 여부 확인
    if (user && (await bcrypt.compare(password, user.password))) {
      // 조건에 부합할 시 JWT(출입증)를 생성
      const token = jwt.sign(
        { id: user._id }, // 토큰에 담을 정보 (사용자의 고유 ID)
        process.env.JWT_SECRET, // .env 파일에 저장할 비밀키
        { expiresIn: '7d' } // 토큰 유효기간 (7일)
      );

      // 4. 사용자 정보와 토큰을 함께 응답으로 보냅니다.
      res.json({
        _id: user._id,
        email: user.email,
        token: token, // 생성된 JWT
        message: '로그인 성공!'
      });
    } else {
      // 5. 사용자가 없거나 비밀번호가 틀린 경우
      res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  // 미들웨어를 통과했다면, req.user에 사용자 정보가 들어있습니다.
  res.json(req.user);
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
