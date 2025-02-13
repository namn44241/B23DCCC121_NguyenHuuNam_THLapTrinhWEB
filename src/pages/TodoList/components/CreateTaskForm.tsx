import { Form, Input, Button, Select } from 'antd';
import { useState } from 'react';

const { TextArea } = Input;

// Danh sách chủ đề mẫu
const TOPICS = [
  { label: 'React', value: 'react' },
  { label: 'Python', value: 'python' },
  { label: 'Maths', value: 'maths' },
  { label: 'Science', value: 'science' },
  { label: 'JavaScript', value: 'javascript' },
];

// Random color khi không chọn màu
const RANDOM_COLORS = [
  { label: 'Đỏ', value: '#ff4d4f' },
  { label: 'Cam', value: '#ff7a45' },
  { label: 'Vàng', value: '#ffa940' },
  { label: 'Xanh lá', value: '#52c41a' },
  { label: 'Xanh dương', value: '#1890ff' },
  { label: 'Tím', value: '#722ed1' },
];

interface CreateTaskFormProps {
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [selectedColor, setSelectedColor] = useState<string>(RANDOM_COLORS[0].value);

  const handleSubmit = (values: any) => {
    onSubmit({ ...values, color: selectedColor });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        label="Chủ đề"
        name="topic"
        rules={[{ required: true, message: 'Vui lòng chọn chủ đề!' }]}
      >
        <Select
          placeholder="Chọn chủ đề"
          options={TOPICS}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Nội dung"
        name="content"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
      >
        <TextArea 
          rows={4}
          placeholder="Nhập nội dung công việc"
        />
      </Form.Item>

      <Form.Item
        label="Màu viền"
        name="color"
      >
        <Select
          defaultValue={RANDOM_COLORS[0].value}
          onChange={(color: string) => setSelectedColor(color)}
          options={RANDOM_COLORS.map(color => ({
            label: (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ 
                  width: 20, 
                  height: 20, 
                  backgroundColor: color.value,
                  borderRadius: 4 
                }} />
                {color.label}
              </div>
            ),
            value: color.value
          }))}
        />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Tạo Task
        </Button>
        <Button onClick={onCancel}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default CreateTaskForm;
