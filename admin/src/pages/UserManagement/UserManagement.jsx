import { useGetUsersQuery, useDeleteUserMutation } from '../../redux/featurtes/userApiSlice';
import { Table, Button, Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useEffect } from 'react';
import { message } from 'antd';


const UserManagement = () => {
  const { data: users, isLoading, isError} = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  console.log(users)

  useEffect(() => {
    if (isError) {
      message.error('Error loading users');
    }
  }, [isError]);

  // const showDeleteConfirm = (userId) => {
  //   confirm({
  //     title: 'Are you sure you want to delete this user?',
  //     icon: <ExclamationCircleFilled />,
  //     content: 'This action cannot be undone',
  //     okText: 'Yes',
  //     okType: 'danger',
  //     cancelText: 'No',
  //     onOk() {
  //       handleDelete(userId);
  //     },
  //   });
  // };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      message.success('User deleted successfully');
      
    } catch (err) {
      message.error(err?.data?.message || 'Deletion failed');
    }
  };

  const columns = [
    {
      title: '  Users',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          danger
          onClick={() => handleDelete(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-sm">
        <Table
          columns={columns}
          dataSource={users?.totalUsers?.filter(user=>user.isAdmin !== true)}
          rowKey="_id"
          loading={isLoading}
          scroll={{ x: 768 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default UserManagement;