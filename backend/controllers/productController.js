import Product from '../models/productModel.js';


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCount = async (req, res) => {
  try {
    const products = await Product.find({});
    
    res.json(products[0].countInStock)
  } catch (error) {
    console.error('Error:', error); // Log the error
    res.status(500).json({ message: "faadgasgsgsgs" });
  }
};

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


// @route   GET /api/products/totalproducts
// @access  Public



export { getProducts, getProductById ,getCount};