import React from 'react';
import { Table, Button, message } from 'antd';
import { useGetOrdersQuery, useUpdateOrderMutation } from '../../redux/featurtes/orderApiSlice.js';

const OrderManagement = () => {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const [updateOrder, { isLoading: updating }] = useUpdateOrderMutation();

  console.log(orders)

  const handleDelivered = async (orderId) => {
    try {
      await updateOrder(orderId).unwrap();
      message.success('Order marked as delivered and paid successfully');
    } catch (error) {
      error.message('Failed to mark order as delivered');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'User',
      dataIndex: ['user'],
      key: 'user',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Paid',
      dataIndex: 'isPaid',
      key: 'isPaid',
      render: (isPaid) => (isPaid ? 'Yes' : 'No'),
    },
    {
      title: 'Delivered',
      dataIndex: 'isDelivered',
      key: 'isDelivered',
      render: (isDelivered, record) => (
        isDelivered ? (
          <span className="text-green-500">Delivered</span>
        ) : (
          <Button 
            type="primary" 
            onClick={() => handleDelivered(record._id)}
            loading={updating}
            disabled={record.isPaid}>
            
            Mark as Delivered
          </Button>
        )
      ),
    },
  ];

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-xl font-bold mb-5">Orders List</h2>
      {isLoading ? (
        <p>Loading Orders...</p>
      ) : (
        <Table columns={columns} dataSource={orders} rowKey="_id" pagination={{ pageSize: 5 }} />
      )}
    </div>
  );
};

export default OrderManagement;
