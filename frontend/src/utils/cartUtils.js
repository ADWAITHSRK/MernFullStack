// Helper function to round numbers to 2 decimal places
export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  
  // Update cart utility function
  export const updateCart = (state) => {
    let itemsPrice = 0;
    let shippingPrice = 0;
    let taxPrice = 0;
    let totalPrice = 0;
  
    // Calculate items price using a basic loop
    for (let i = 0; i < state.cartItems.length; i++) {
      itemsPrice += Number(state.cartItems[i].price) * Number(state.cartItems[i].qty);
    }
  
    // Calculate shipping price (free if items price > 100, else $10)
    shippingPrice = itemsPrice > 100 ? 0 : 10;
  
    // Calculate tax price (15% of items price)
    taxPrice = 0.15 * itemsPrice;
  
    // Calculate total price
    totalPrice = itemsPrice + shippingPrice + taxPrice;
  
    // Round all prices to 2 decimal places
    state.itemsPrice = addDecimals(itemsPrice);
    state.shippingPrice = addDecimals(shippingPrice);
    state.taxPrice = addDecimals(taxPrice);
    state.totalPrice = addDecimals(totalPrice);
  
    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(state));
  
    return state;
  };