import { Button, Card, Rate, Tag, Image } from "antd";
import { Link,useParams } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import "./ProductScreen.css";
import { useGetProductDetailsQuery } from "../../redux/featurtes/productSlice.js";
import Loader from "../../components/Loader/Loader.jsx";
import Message from "../../components/Message/Message.jsx";
import { InputNumber } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/featurtes/cartSlice.js";

const ProductScreen = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductDetailsQuery(id);
  const dispatch = useDispatch()
  console.log("dfsfsdgsgsgsgsddg",product)
  // const navigate = useNavigate()
  const [qty, setQty] = useState(1);

  const addToCartHandler = () =>{
    dispatch(addToCart({...product,qty}))

  }

 



  
  if (isLoading) return <Loader />;
  if (isLoading) return <Loader />;
  if (error)
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );

  return (
    <div className="max-w-7xl mx-auto">
      <Link to="/" className="flex mb-6">
        {" "}
        <FaBackward />
        Go Back
      </Link>
      <div className="mt-10">
        <div className="grid md:grid-cols-3 gap-6 ">
          <div className="md:col-span-1 bg-white p-4 rounded-lg shadow-md mr-5">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
          <div className="md:col-span-1 space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="flex items-center gap-2">
              <Rate
                allowHalf
                disabled
                value={product.rating}
                className="text-blue-500"
              />
              <span className="text-gray-500 text-sm">
                {" "}
  ({product.rating} Reviews)
              </span>
            </div>
            <p className="text-gray-600">{product.description}</p>
            <div className="border-t border-gray-300 my-4"></div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-blue-400">
                <span className="font-bold">Brand:</span>
                {product.brand}
              </div>
              <div className="text-blue-400">
                <span className="font-bold">Category:</span>
                {product.category}
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <Card className="shadow-md">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Price:</span>
                  <span className="text-lg font-bold text-blue-600">
                    ₹{product.price}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold"> Status:</span>
                  <Tag color={product.countInStock > 0 ? "green" : "red"}>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </Tag>
                </div>
                {product.countInStock > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="font-semibold"> Quantity:</span>
                    <InputNumber min={1} max={product.countInStock} value={qty} onChange={(value)=>setQty(value)}/>
                  </div>
                )}
                <Button
                  type="primary"
                  block
                  size="large"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add to Cart{" "}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
