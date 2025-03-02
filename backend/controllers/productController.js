import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      return res.json(product);
    }

    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getTotalProductsCount = async(req,res) =>{
  try{
      const count =  await Product.countDocuments();
      res.json({count})
  }
  catch(error){
    res.status(500).json({ message: 'Server Error' });
  }
}

export { getProducts, getProductById , getTotalProductsCount};