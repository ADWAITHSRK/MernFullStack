import React, { useState } from "react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from "../../redux/featurtes/productSlice.js";
import { Form, Input, Button, List, Card, message, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Table } from 'antd';

const ProductManagementPage = () => {
  const { data: products, isLoading, isError, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

  const handleCreateProduct = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createProduct(formData).unwrap();
      message.success("Product created successfully");
      form.resetFields();
      setImageFile(null);
      refetch();
    } catch (error) {
      console.log(error);
      message.error("Product creation failed");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      message.success("Product deleted successfully");
      refetch();
    } catch (error) {
      console.log(error);
      message.error("Deletion failed");
    }
  };


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `₹${price}`,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'In Stock',
      dataIndex: 'countInStock',
      key: 'countInStock',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image, record) =>
        image ? <img src={image} alt={record.name} className="w-16 h-16 object-contain" /> : 'No Image',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id)}
        />
      ),
    },
  ];


  return (
    <div className="flex flex-wrap p-4 gap-4">
      {/* Products List */}
      <div className="min-w-[400px]">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {isError ? (
        <div className="text-red-500">Error loading products</div>
      ) : (
        <Table
          columns={columns}
          dataSource={products}
          loading={isLoading}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
          className="shadow-md rounded-lg overflow-hidden"
        />
      )}
    </div>

      {/* Create Product Form */}
      <div className="flex-1 min-w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Create New Product</h2>
        <Form form={form} onFinish={handleCreateProduct} layout="vertical">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please enter brand" }]}
          >
            <Input placeholder="Enter brand" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please enter category" }]}
          >
            <Input placeholder="Enter category" />
          </Form.Item>

          <Form.Item
            label="Stock Quantity"
            name="countInStock"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <Input type="number" placeholder="Enter stock quantity" />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please enter Rating" }]}
          >
            <Input type="number" placeholder="Enter stock quantity" />
          </Form.Item>


          <Form.Item label="Product Image">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProductManagementPage;
