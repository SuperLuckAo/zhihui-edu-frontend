export default {
  'GET /api/courses': {
    data: [
      { id: 1, title: 'React 入门', teacher: '张三', status: 'online' },
      { id: 2, title: 'TypeScript 实战', teacher: '李四', status: 'offline' },
    ],
    success: true,
  },
  'GET /api/users': {
    data: [
      { id: 1, username: 'admin', email: 'admin@zhihui.edu', role: '管理员' },
      { id: 2, username: 'student01', email: 's01@zhihui.edu', role: '学员' },
    ],
    success: true,
  },
};
