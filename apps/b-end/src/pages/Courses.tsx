import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';

type CourseItem = {
  id: number;
  title: string;
  teacher: string;
  status: 'online' | 'offline';
};

const columns: ProColumns<CourseItem>[] = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '课程名称', dataIndex: 'title' },
  { title: '讲师', dataIndex: 'teacher' },
  {
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      online: { text: '已上线', status: 'Success' },
      offline: { text: '未上线', status: 'Default' },
    },
  },
];

export default function CoursesPage() {
  return (
    <PageContainer>
      <ProTable<CourseItem>
        columns={columns}
        rowKey="id"
        search={false}
        dataSource={[
          { id: 1, title: 'React 入门', teacher: '张三', status: 'online' },
          { id: 2, title: 'TypeScript 实战', teacher: '李四', status: 'offline' },
        ]}
      />
    </PageContainer>
  );
}
