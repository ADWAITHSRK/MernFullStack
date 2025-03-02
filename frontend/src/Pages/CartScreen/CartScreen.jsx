import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart } from "../../redux/featurtes/cartSlice";
import { Table, Button, Card } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `₹${price}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          onClick={() => dispatch(removeFromCart(record._id))}
        />
      ),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <Table
            dataSource={cartItems.map((item) => ({ ...item, key: item._id }))}
            columns={columns}
            pagination={false}
            className="mb-4"
          />
        )}
      </div>
      <div className="ml-5">
        <Card className="p-4 shadow-lg">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <p className="flex justify-between">
            <span>Items Price:</span> <span>₹{itemsPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping:</span> <span>₹{shippingPrice}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax:</span> <span>₹{taxPrice}</span>
          </p>
          <p className="flex justify-between font-bold text-lg">
            <span>Total:</span> <span>₹{totalPrice}</span>
          </p>
          <Button onClick={()=>navigate('/shipping')} type="primary" block className="mt-4">Proceed to Checkout</Button>
        </Card>
      </div>
    </div>
  );
};

export default CartScreen;
