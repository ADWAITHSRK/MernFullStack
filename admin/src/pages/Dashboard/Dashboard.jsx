import { Card, Col, Row, Progress } from 'antd';
import { UserOutlined, ShoppingCartOutlined, ProductOutlined } from '@ant-design/icons';
// import { useGetTotalOrdersQuery } from '../../redux/featurtes/orderApiSlice';
// import { useGetTotalCountQuery } from '../../redux/featurtes/productSlice';
// import { useGetTotalUsersQuery } from '../../redux/featurtes/userApiSlice';

const Dashboard = () => {
//   const { data: totalOrders  } = useGetTotalOrdersQuery();
//   const { data: totalProducts } = useGetTotalCountQuery();
//   const { data: totalUsers  } = useGetTotalUsersQuery();

//   console.log("to  ",totalOrders);
//   console.log(" tp ",totalProducts);
//   console.log(" tu ",totalUsers);
const totalOrders = 8;
const totalProducts = 10;
const totalUsers = 9;


  // Calculate percentages for progress bars
  const maxCount = Math.max(8, 9, 10) || 1;
  const orderPercentage = (8 / maxCount) * 100;
  const userPercentage = (9 / maxCount) * 100;
  const productPercentage = (10 / maxCount) * 100;

  return (
    <div className="p-6">
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={8}>
          <Card className="shadow-md">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <ShoppingCartOutlined className="text-blue-600 text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-500 mb-2">Total Orders</h3>
                <Progress
                  percent={orderPercentage}
                  strokeColor="#1890ff"
                  format={() => totalOrders}
                  status="active"
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className="shadow-md">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <UserOutlined className="text-green-600 text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-500 mb-2">Total Users</h3>
                <Progress
                  percent={userPercentage}
                  strokeColor="#52c41a"
                  format={() => totalUsers}
                  status="active"
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card className="shadow-md">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <ProductOutlined className="text-purple-600 text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-gray-500 mb-2">Total Products</h3>
                <Progress
                  percent={productPercentage}
                  strokeColor="#722ed1"
                  format={() => totalProducts}
                  status="active"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card className="shadow-md">
            <h2 className="text-xl font-semibold mb-4">Statistics Overview</h2>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{totalOrders}</div>
                <div className="text-gray-500">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">{totalUsers}</div>
                <div className="text-gray-500">Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600">{totalProducts}</div>
                <div className="text-gray-500">Products</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;