import { useEffect } from "react";
import { Button, Card, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../redux/featurtes/cartSlice.js";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { Title, Text } = Typography;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  
  useEffect(() => {
    dispatch(savePaymentMethod("COD"))
  }, [dispatch, navigate]);


  return (
    <div className="min-h-screen p-8">
      <Row justify="center" align="middle">
        <Col xs={24} sm={20} md={16} lg={12} xl={10}>
          <Card className="mt-8 shadow-lg rounded-lg">
            <Title level={2} className="text-center mb-6">
              Payment Method
            </Title>

            <div className="text-center">
              <Title level={4} className="mb-4">
                Cash on Delivery
              </Title>

              <Text type="secondary " className="text-gray-500 text-lg">
                Payment Will Be Collected At the Time of Delivery
              </Text>

              <div className="mt-8">
                <Button
                  type="primary"
                  size="large"
                  className="w-full h-12 text-lg font-semibold"
                  onClick={() => navigate("/placeorder")}
                >
                  Continue to Order Summary
                </Button>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentScreen;
