import { useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './HomeScreen.css';
import { useGetProductsQuery } from '../../redux/featurtes/productSlice.js';
import Loader from '../../components/Loader/Loader.jsx';
import Message from '../../components/Message/Message.jsx';
import { Pagination } from 'antd';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Number of products per page

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedProducts = products?.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (isLoading) return <Loader />;
  if (error) return <Message variant='danger'>{error?.data?.message || error.error}</Message>;

  return (
    <div className='max-w-7xl flex flex-col justify-center mx-auto py-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {paginatedProducts?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className='flex justify-center mt-8'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={products?.length || 0}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default HomeScreen;
