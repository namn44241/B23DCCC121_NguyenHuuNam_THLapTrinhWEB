import { Button, Card, Typography, Row, Col, Space, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import CreateTaskForm from './components/CreateTaskForm';
import EditTaskForm from './components/EditTaskForm';
import DeleteTaskForm from './components/DeleteTaskForm';

const { Title, Paragraph } = Typography;

const TodoList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<any[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

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

  const showEditModal = (task: any) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleEditSubmit = (values: any) => {
    const newTasks = tasks.map(task => 
      task.id === values.id ? values : task
    );
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setIsEditModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    DeleteTaskForm.show(taskId, (id) => {
      const newTasks = tasks.filter(task => task.id !== id);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    });
  };

  return (
    <Card>
      {/* Header */}
      <Row justify="center" align="middle" style={{ marginBottom: 32 }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2} style={{ margin: 0, marginBottom: 16 }}>Todo List</Title>
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
        </Col>
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
                  <Button 
                    type="text" 
                    icon={<EditOutlined style={{ color: '#4B5563' }} />} 
                    onClick={() => showEditModal(task)}
                  />
                  <Button 
                    type="text" 
                    icon={<DeleteOutlined style={{ color: '#4B5563' }} />} 
                    onClick={() => handleDeleteTask(task.id)}
                    danger
                  />
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

      {/* Edit Task Modal */}
      <Modal
        title="Edit Task"
        visible={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
        destroyOnClose
      >
        {editingTask && (
          <EditTaskForm
            task={editingTask}
            onCancel={handleEditCancel}
            onSubmit={handleEditSubmit}
          />
        )}
      </Modal>
    </Card>
  );
};

export default TodoList; 