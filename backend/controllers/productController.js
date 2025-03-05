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

const createProduct = async (req,res) => {

  try {
    const {name,price,description,brand,category,countInStock,rating} = req.body
    const product = new Product ({
      name,
      price,
      description,
      brand,
      rating,
      category,
      countInStock,
      image:req.file ? `uploads/${req.file.filename}` : "",

    })
    const createdProduct = await product.save();
    res.status(201).json(createdProduct)
  }
  catch(error){
    console.error(error);
    res.status(500).json({message : "Product Create Failed"})
  }
}

const deleteProduct = async (req,res) =>{
  try {

    const product = await Product.findById(req.params.id)
    if(product){
      await product.deleteOne();
      res.json({message:"Product Deleted SuccesFully"})
    }
    else{
      res.status(404).json({message:"No Product"})
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({message :"Deletion Failed"})

  }
}


// @route   GET /api/products/totalproducts
// @access  Public



export { getProducts, getProductById ,getCount,createProduct,deleteProduct};