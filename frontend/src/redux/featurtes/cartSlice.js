import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] , shippingAddress: {},paymentMethod : '' };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let delivery = state.cartItems.length > 0 ? 50 : 0;
        
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item._id);
      
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        // Store product ID and necessary details
        state.cartItems.push({
          product: item._id, // Store product ID here
          name: item.name,
          image: item.image,
          price: item.price,
          countInStock: item.countInStock,
          qty: item.qty || 1
        });
      }

      
      let total = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        total += state.cartItems[i].price * state.cartItems[i].qty;
      }
      state.itemsPrice = addDecimals(total);

      
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : delivery);

      
      state.taxPrice = addDecimals(Number((0.01 * state.itemsPrice).toFixed(2)));

      
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

    
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;

      let delivery =0
      if (state.cartItems.length >0) {
          delivery = 50;
        }

      
      let newCartItems = [];
      for (let i = 0; i < state.cartItems.length; i++) {
        if (state.cartItems[i]._id !== itemId) {
          newCartItems.push(state.cartItems[i]);
        }
      }
      state.cartItems = newCartItems;

      
      let total = 0;
      for (let i = 0; i < state.cartItems.length; i++) {
        total += state.cartItems[i].price * state.cartItems[i].qty;
      }
      state.itemsPrice = addDecimals(total);
      state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : delivery);
      state.taxPrice = addDecimals(Number((0.01 * state.itemsPrice).toFixed(2)));
      state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
      ).toFixed(2);

      
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress : (state ,action) =>{
      state.shippingAddress = action.payload
      localStorage.setItem("cart",JSON.stringify(state))
    },

    clearCart : (state ) =>{
      state.cartItems = []
      localStorage.setItem("cart",JSON.stringify(state))
    },

    savePaymentMethod : (state,action) =>{
      state.paymentMethod = action.payload
      localStorage.setItem('cart',JSON.stringify(state))
    }

  },
});

export const { addToCart, removeFromCart ,saveShippingAddress,clearCart,savePaymentMethod} = cartSlice.actions;
export default cartSlice.reducer;
