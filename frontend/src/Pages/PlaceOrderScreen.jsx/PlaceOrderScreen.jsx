import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Button, List, Card, Image, Spin, Alert, Typography } from "antd";
import { useCreateOrderMutation } from "../../redux/featurtes/orderApiSlice";
import { clearCart } from "../../redux/featurtes/cartSlice";

const { Text } = Typography;

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const orderItems = cart.cartItems.map((item) => ({
        product: item.product, // This should now be the product ID
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
      }));

      const res = await createOrder({
        orderItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      toast.success("Order Created SuccesFully",{position:'top-center'})
      dispatch(clearCart());
      navigate(`/`);
      console.log(res)
    } catch (error) {
      toast.error(error.data.detail);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="md:col-span-2">
          <div className="mb-8">
            <Card title="Shipping Address" className="shadow-sm ">
              <Text>{cart.shippingAddress.address} </Text>
              <Text>
                {cart.shippingAddress.city},{cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </Text>
            </Card>
          </div>

          <div className="mb-8">
            <Card title="Payment Method" className="shadow-sm">
              <Text strong>Method:</Text>
              <Text>{cart.paymentMethod}</Text>
            </Card>
          </div>

          <Card title="Order Items" className="shadow-sm">
            <List
              itemLayout="horizontal"
              dataSource={cart.cartItems}
              renderItem={(item) => (
                <List.Item>
                  <div className="flex items-center w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      preview={false}
                      className="rounded"
                    />
                    <Link
                      to={`/product/${item._id}`}
                      className="ml-4 flex-1 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                    <Text className="mx-2 "> {item.qty} </Text>
                    <Text className="mx-2 "> ₹{item.qty * item.price} </Text>
                  </div>
                </List.Item>
              )}
            ></List>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card title="Order Summary" className="shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Text>Items:</Text>
                <Text>₹{cart.itemsPrice}</Text>
              </div>

              <div className="flex justify-between">
                <Text>Shipping:</Text>
                <Text>₹{cart.shippingPrice}</Text>
              </div>

              <div className="flex justify-between">
                <Text>Tax:</Text>
                <Text>₹{cart.taxPrice}</Text>
              </div>

              <div className="flex justify-between">
                <Text>Total:</Text>
                <Text>₹{cart.totalPrice}</Text>
              </div>

              {error && (
                <Alert
                  message={error?.data?.message || "Error placing order"}
                  type="error"
                  className="mt-4"
                />
              )}

              <Button
                type="primary"
                block
                size="large"
                onClick={placeOrderHandler}
                disabled={
                  !cart.cartItems?.length ||
                  !cart.shippingAddress ||
                  !cart.paymentMethod ||
                  isLoading
                }
              >
                {isLoading ? <Spin /> : "Place Order"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
