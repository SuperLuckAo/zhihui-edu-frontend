import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function WelcomePage() {
  return (
    <PageContainer ghost header={{ title: '欢迎' }}>
      <Card>
        <Title level={3}>智慧学院 - 管理后台</Title>
        <Paragraph>这里是 B 端管理后台，用于课程、用户、订单等数据管理。</Paragraph>
      </Card>
    </PageContainer>
  );
}
