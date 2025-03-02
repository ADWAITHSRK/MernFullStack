import ProductCard from '../../components/ProductCard/ProductCard'
import './HomeScreen.css'
import { useGetProductsQuery } from '../../redux/featurtes/productSlice.js';
import Loader from '../../components/Loader/Loader.jsx';
import Message from '../../components/Message/Message.jsx';

const HomeScreen = () => {
  const {data:products,isLoading,error} = useGetProductsQuery();

  if (isLoading) return <Loader/>;
  if (error) return <Message variant='danger'>{error?.data?.message || error.error}</Message>;

  return (
    <div className='max-w-7xl flex justify-center mx-auto py-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {products.map((product)=>(<ProductCard key={product._id} product={product}/>))}
        </div>
    </div>
  )
}

export default HomeScreen