const express = require('express');
const router = express.Router();
const { createProject } = require('./project.controller');
const { protect } = require('../../middleware/auth.middleware'); // 인증 미들웨어

// POST /api/projects 경로로 요청이 오면,
// 먼저 protect 미들웨어로 사용자를 인증하고, 통과하면 createProject 함수를 실행합니다.
router.post('/', protect, createProject);

module.exports = router;