const Project = require('./project.model');

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (로그인한 사용자만)
const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: '제목과 설명을 모두 입력해주세요.' });
    }

    const project = new Project({
      title,
      description,
      user: req.user.id, // ✅ protect 미들웨어로부터 받은 사용자 ID
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: '서버 오류가 발생했습니다.', error: error.message });
  }
};

module.exports = {
  createProject,
};