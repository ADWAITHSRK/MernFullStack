import { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../../redux/featurtes/cartSlice.js';

const ShippingScreen = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    form.setFieldsValue(shippingAddress);
  }, [shippingAddress, form]);

  const onFinish = (values) => {
    dispatch(saveShippingAddress(values));
    navigate('/payment');
  };

  return (
    <div className="container mx-auto  max-w-screen-sm md:max-w-screen-sm p-8">
      <h1 className="text-2xl font-bold mb-6">Shipping Address</h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={shippingAddress}
      >
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address!' }]}
        >
          <Input placeholder="Enter street address" />
        </Form.Item>

        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true, message: 'Please enter your city!' }]}
        >
          <Input placeholder="Enter city" />
        </Form.Item>

        <Form.Item
          label="Postal Code"
          name="postalCode"
          rules={[{ required: true, message: 'Please enter postal code!' }]}
        >
          <Input placeholder="Enter postal code" />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: 'Please enter your country!' }]}
        >
          <Input placeholder="Enter country" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Continue to Payment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShippingScreen;