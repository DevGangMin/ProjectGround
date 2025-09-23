// 회원가입 요청을 처리하는 함수
const registerUser = (req, res) => {
  // TODO: 나중에 이곳에 실제 회원가입 로직을 구현할 것입니다.
  // (데이터베이스에 사용자 정보 저장 등)

  // 지금은 연결 확인을 위해 간단한 JSON 메시지를 응답으로 보냅니다.
  res.status(201).json({ message: '회원가입 API 연결 성공!' });
};

module.exports = {
  registerUser,
};