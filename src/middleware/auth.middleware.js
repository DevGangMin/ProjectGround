const jwt = require('jsonwebtoken');
const User = require('../api/users/user.model');

const protect = async (req, res, next) => {
  let token;

  // 요청 헤더에 'Authorization' 필드가 있고, 'Bearer'로 시작하는지 확인
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 'Bearer' 부분을 제외하고 실제 토큰 값만 추출
      token = req.headers.authorization.split(' ')[1];

      // 토큰이 유효한지 비밀키를 사용해 검증
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 토큰에 담겨있던 사용자 ID를 이용해 DB에서 사용자 정보를 조회(비밀번호 제외)
      req.user = await User.findById(decoded.id).select('-password');

      // 검문 통과! 다음 단계(실제 컨트롤러)로 이동
      next();
    } catch (error) {
      // 토큰 검증에 실패한 경우 (위조, 만료 등)
      res.status(401).json({ message: '인증에 실패했습니다. (토큰 오류)' });
    }
  }

  // 토큰이 아예 없는 경우
  if (!token) {
    res.status(401).json({ message: '인증에 실패했습니다. (토큰 없음)' });
  }
};

module.exports = { protect };