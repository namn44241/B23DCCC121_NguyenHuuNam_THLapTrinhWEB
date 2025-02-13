import { Button, Card, Typography, Row, Col, Space, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import CreateTaskForm from './components/CreateTaskForm';

const { Title, Paragraph } = Typography;

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);

  // Load tasks từ localStorage khi component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values: any) => {
    console.log('Form values:', values); // Debug
    const newTask = {
      ...values,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    console.log('Saved tasks:', newTasks); // Debug
    setIsModalOpen(false);
  };

  return (
    <Card>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
        <Title level={2} style={{ margin: 0 }}>Todo List</Title>
        <Button
          type="primary"
          style={{
            backgroundColor: '#ff4d4f',
            borderRadius: '20px',
          }}
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Create Task
        </Button>
      </Row>

      {/* Filter */}
      <Row style={{ marginBottom: 24 }}>
        <Button 
          type="link" 
          style={{ 
            color: '#ff4d4f',
            fontWeight: 'bold', 
            padding: '8px 16px' 
          }}
        >
          All Tasks
        </Button>
      </Row>

      {/* Task Grid */}
      <Row gutter={[24, 24]}>
        {tasks.map((task) => (
          <Col key={task.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                borderRadius: 8,
                borderTop: `3px solid ${task.color || '#ff4d4f'}`
              }}
              bodyStyle={{ padding: 16 }}
            >
              <Title level={5} style={{ marginBottom: 8 }}>{task.topic}</Title>
              <Paragraph style={{ color: '#6B7280', marginBottom: 16 }}>
                {task.content}
              </Paragraph>
              <Row justify="end">
                <Space>
                  <Button type="text" icon={<EditOutlined style={{ color: '#4B5563' }} />} />
                  <Button type="text" icon={<DeleteOutlined style={{ color: '#4B5563' }} />} />
                </Space>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Create Task Modal */}
      <Modal
        title="Create New Task"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <CreateTaskForm
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </Modal>
    </Card>
  );
};

export default TodoList; 