const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    // 프로젝트를 작성자의 고유 ID를 저장
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // 'User' 모델과 연결
    },
    title: {
      type: String,
      required: [true, '제목을 입력해주세요.'],
    },
    description: {
      type: String,
      required: [true, '설명을 입력해주세요.'],
    },
    status: {
      type: String,
      required: true,
      default: '모집중', // 기본 상태
    },
    // TODO: 추가 정보들은 나중에 필요할 때 더 확장할 수 있습니다.
    // recruitmentField: { type: String },
    // attachedFiles: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;