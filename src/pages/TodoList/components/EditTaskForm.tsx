import { Form, Input, Button, Select, Popover } from 'antd';
import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input;

// Danh sách chủ đề mẫu
const TOPICS = [
  { label: 'React', value: 'react' },
  { label: 'Python', value: 'python' },
  { label: 'Maths', value: 'maths' },
  { label: 'Science', value: 'science' },
  { label: 'JavaScript', value: 'javascript' },
];

// Component ColorPicker giữ nguyên như cũ
const ColorPickerComponent = ({ color, onChange }: { color: string; onChange: (color: string) => void }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      content={
        <div onClick={e => e.stopPropagation()}>
          <SketchPicker
            color={color}
            onChange={(newColor) => onChange(newColor.hex)}
          />
        </div>
      }
      trigger="click"
      visible={open}
      onVisibleChange={setOpen}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 80,
            height: 32,
            background: color,
            borderRadius: 4,
            border: '1px solid #d9d9d9',
            cursor: 'pointer'
          }}
        />
        <span>{color}</span>
      </div>
    </Popover>
  );
};

interface EditTaskFormProps {
  task: {
    id: string;
    topic: string;
    content: string;
    color: string;
  };
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const [colorHex, setColorHex] = useState<string>(task.color);
  const [customTopics, setCustomTopics] = useState<{ label: string; value: string }[]>([]);

  // Load custom topics từ localStorage
  useEffect(() => {
    const savedTopics = localStorage.getItem('customTopics');
    if (savedTopics) {
      setCustomTopics(JSON.parse(savedTopics));
    }
  }, []);

  // Set initial form values
  useEffect(() => {
    form.setFieldsValue({
      topic: task.topic,
      content: task.content
    });
  }, [task]);

  const handleSubmit = (values: any) => {
    // Nếu là topic mới, lưu vào localStorage
    if (!TOPICS.find(t => t.value === values.topic) && 
        !customTopics.find(t => t.value === values.topic)) {
      const newCustomTopics = [...customTopics, { label: values.topic, value: values.topic }];
      setCustomTopics(newCustomTopics);
      localStorage.setItem('customTopics', JSON.stringify(newCustomTopics));
    }
    
    onSubmit({ 
      ...task,
      ...values, 
      color: colorHex 
    });
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Chủ đề"
        name="topic"
        rules={[{ required: true, message: 'Vui lòng chọn hoặc nhập chủ đề!' }]}
      >
        <Select
          showSearch
          allowClear
          placeholder="Chọn hoặc nhập chủ đề mới"
          options={[
            ...TOPICS,
            ...customTopics.map(topic => ({
              ...topic,
              label: (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{topic.label}</span>
                  <CloseOutlined
                    onClick={(e) => {
                      e.stopPropagation();
                      const newCustomTopics = customTopics.filter(t => t.value !== topic.value);
                      setCustomTopics(newCustomTopics);
                      localStorage.setItem('customTopics', JSON.stringify(newCustomTopics));
                    }}
                    style={{ color: '#ff4d4f' }}
                  />
                </div>
              )
            }))
          ]}
          style={{ width: '100%' }}
          onInputKeyDown={(e) => {
            if (e.key === 'Enter') {
              const value = (e.target as HTMLInputElement).value;
              if (!value) return;
              const newTopic = { label: value, value };
              setCustomTopics([...customTopics, newTopic]);
              localStorage.setItem('customTopics', JSON.stringify([...customTopics, newTopic]));
            }
          }}
        />
      </Form.Item>

      <Form.Item
        label="Nội dung"
        name="content"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
      >
        <TextArea rows={4} placeholder="Nhập nội dung công việc" />
      </Form.Item>

      <Form.Item label="Màu viền">
        <ColorPickerComponent color={colorHex} onChange={setColorHex} />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
          Lưu thay đổi
        </Button>
        <Button onClick={onCancel}>Hủy</Button>
      </Form.Item>
    </Form>
  );
};

export default EditTaskForm; 