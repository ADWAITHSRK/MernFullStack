
import { useGetOrdersByIdQuery } from "../../redux/featurtes/orderApiSlice";
const OrderPage = () => {
  const {data:order} = useGetOrdersByIdQuery()
  const status1 = order?.isDelivered
  
    
    // const products = [
    //     {
    //       name: "Product A",
    //       qty: 2,
    //       image: "https://via.placeholder.com/40",
    //       price: "$20",
    //     },
    //     {
    //       name: "Product B",
    //       qty: 1,
    //       image: "https://via.placeholder.com/40",
    //       price: "$15",
    //     },
    //     {
    //       name: "Product C",
    //       qty: 3,
    //       image: "https://via.placeholder.com/40",
    //       price: "$30",
    //     },
    //   ];
    
  return (
    <div className='h-[90vh] w-full flex flex-col items-center '>
          <div className="p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Qty</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Image</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
            <th className="border border-gray-300 px-4 py-2 text-left">isDelivered</th>

          </tr>
        </thead>
        <tbody>
          {order?.orderItems?.map((item, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.qty}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.price}</td>
              <td className="border border-gray-300 px-4 py-2">{status1 ? 'Yes' : 'No'}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex flex-col p-4 gap-1.5">
    </div>

    </div>
  )
}

export default OrderPage