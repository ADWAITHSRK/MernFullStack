import { useGetOrdersQuery,useUpdateOrderMutation } from "../../../redux/featurtes/orderApiSlice.js";

 const AdminOrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  const [updateOrder] = useUpdateOrderMutation();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      
      {isLoading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading orders</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <div 
              key={order._id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                    <p className="text-xs font-mono text-gray-400 truncate">{order._id}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {order.user.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total</p>
                    <p className="text-sm font-semibold">${order.totalPrice}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment</p>
                    <p className={`text-sm ${order.isPaid ? 'text-green-600' : 'text-red-600'}`}>
                      {order.isPaid ? 
                        `Paid: ${order.paidAt.substring(0, 10)}` : 
                        'Not Paid'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Delivery</p>
                    <p className={`text-sm ${order.isDelivered ? 'text-green-600' : 'text-red-600'}`}>
                      {order.isDelivered ? 
                        `Delivered: ${order.deliveredAt.substring(0, 10)}` : 
                        'Pending'}
                    </p>
                  </div>
                </div>

                {!order.isDelivered && (
                  <button
                    onClick={() => updateOrder(order._id)}
                    className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors text-sm font-medium"
                  >
                    Mark as Delivered
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrderList;

