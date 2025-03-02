
import Order from "../models/orderModel.js";

const addOrderitems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Validate order items structure
    const validatedItems = orderItems.map(item => ({
      product: item.product,
      name: item.name,
      qty: Number(item.qty),
      image: item.image,
      price: Number(item.price),
    }));

    const order = new Order({
      orderItems: validatedItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice: Number(itemsPrice),
      taxPrice: Number(taxPrice),
      shippingPrice: Number(shippingPrice),
      totalPrice: Number(totalPrice),
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ 
      message: "Server Error",
      error: error.message 
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (order) {
      if (req.user._id.toString() === order.user._id.toString()) {
        res.json(order);
      } else {
        res.status(401).json({ message: "Not Authorized" });
      }
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (req.user.isAdmin) {
        order.isDeliverd = true;
        order.deliveredAt = Date.now();

        if (order.paymentMethod === "COD" && !order.isPaid) {
          order.isPaid = true;
          order.paidAt = Date.now();
          order.paymentResult = {
            id: order._id,
            status: "Completed",
            update_time: new Date().toISOString(),
            email_address: order.user.email,
          };
        }
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order Not Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
    if(req.user.isAdmin){
    const orders = await Order.find({})
      .populate("user", "id name")
      .sort({ createdAt: -1 });
    res.json(orders);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTotalOrdersCount = async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {addOrderitems , getMyOrders , getOrderById , updateOrderToDelivered , getOrders ,getTotalOrdersCount}