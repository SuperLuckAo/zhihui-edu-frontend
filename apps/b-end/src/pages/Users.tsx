import { PageContainer, ProTable } from '@ant-design/pro-components';
import type { ProColumns } from '@ant-design/pro-components';

type UserItem = {
  id: number;
  username: string;
  email: string;
  role: string;
};

const columns: ProColumns<UserItem>[] = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '用户名', dataIndex: 'username' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '角色', dataIndex: 'role' },
];

export default function UsersPage() {
  return (
    <PageContainer>
      <ProTable<UserItem>
        columns={columns}
        rowKey="id"
        search={false}
        dataSource={[
          { id: 1, username: 'admin', email: 'admin@zhihui.edu', role: '管理员' },
          { id: 2, username: 'student01', email: 's01@zhihui.edu', role: '学员' },
        ]}
      />
    </PageContainer>
  );
}
