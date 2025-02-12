import { Button, Card, Typography, Row, Col, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const TodoList = () => {
  return (
    <Card>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Todo List</Title>
        <Button
          type="primary"
          style={{
            backgroundColor: '#8B5CF6',
            borderRadius: '20px',
          }}
          icon={<PlusOutlined />}
        >
          Create Task
        </Button>
      </Row>

      {/* Filter */}
      <Row style={{ marginBottom: 24 }}>
        <Button type="link" style={{ color: '#8B5CF6', fontWeight: 'bold', padding: '8px 16px' }}>
          All Tasks
        </Button>
      </Row>

      {/* Task Grid */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            style={{
              borderRadius: 8,
              borderTop: '3px solid #8B5CF6'
            }}
            bodyStyle={{ padding: 16 }}
          >
            <Title level={5} style={{ marginBottom: 8 }}>React</Title>
            <Paragraph style={{ color: '#6B7280', marginBottom: 16 }}>
              Learn all basic concepts of react
            </Paragraph>
            <Row justify="end">
              <Space>
                <Button type="text" icon={<EditOutlined style={{ color: '#4B5563' }} />} />
                <Button type="text" icon={<DeleteOutlined style={{ color: '#4B5563' }} />} />
              </Space>
            </Row>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default TodoList; 