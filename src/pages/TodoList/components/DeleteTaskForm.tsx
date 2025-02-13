import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

interface DeleteTaskFormProps {
  onSubmit: (taskId: string) => void;
}

const DeleteTaskForm = {
  show: (taskId: string, onSubmit: DeleteTaskFormProps['onSubmit']) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa task này không?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okButtonProps: { danger: true },
      onOk: () => onSubmit(taskId)
    });
  }
};

export default DeleteTaskForm; 