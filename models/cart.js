const cartItems = {};

module.exports = class Cart {

  static addCartItem(productId) {
    const cartItem = cartItems[productId];
    if(cartItem) {
      cartItem.quantity +=1;
    } else {
      cartItems[productId] = {quantity: 1};
    }
  }

  static removeCartItem(productId) {
    cartItems[productId] = undefined;
  }

  static getCartItems() {
    return cartItems;
  }

  static getCartItemIds() {
    return Object.keys(cartItems);
  }

  static getQuantityByItemId(id) {
    return cartItems[id].quantity;
  }
};