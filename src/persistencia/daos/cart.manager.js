import cartModel from '../models/cart.model.js';

export default class CartManager {
  async getCarts() {
    try {
      const products = await cartModel.find().populate('products');
      return products;
    } catch (err) {
      console.log('getCarts: ' + err);
    }
  }

  async getCartById(id) {
    try {
      const product = await cartModel.findById(id).populate('products._id', '-__v', 'Products'); //SOLO ME FUNCIONA ASÍ 'products._id' NO SE PORQUE NO FUNCIONA CON 'products.product' del esquema
      // const product = await cartModel.findById(id).populate({
      //   path: 'products._id', 
      //   model: 'Products'
      // });
      return product;
    } catch (err) {
      console.log('getCartById: ' + err);
    }
  }

  async addCart(objCart) {
    try {
      const cart = await cartModel.create(objCart);
      if (objCart.prodId) {
        cart.products.push(objCart.prodId);
        cart.save();
      }
      return cart;
    } catch (err) {
      console.log('addCart: ' + err);
    }
  }

  async addProductToCart(cartId, prodId) {
    try {
      const cart = await cartModel.findById(cartId);

      if (cart.products.length === 0) {
        cart.products.push(prodId);
        cart.save();
        return cart;
      }

      cart.products.forEach(prod => {
        if (prod._id == prodId) {
          throw new Error('This product already exits in the cart.');
        }
      })
      
      cart.products.push(prodId);
      cart.save();
      return cart;
    } catch (err) {
      console.log('addProductToCart' + err);
    }
  }

  async addQuantity(cartId, prodId, quantity) {
    try {
      const cart = await cartModel.findById(cartId);
      cart.products.forEach(prod => {
        if (prod._id == prodId){
          prod.quantity += quantity;
          cart.save();
        }
      });
      return cart;
    } catch (err) {
      console.log('addQuantity' + err);
    }
  }

  async emptyCart(cartId){
    try {
      const cart = await cartModel.findByIdAndUpdate(cartId, {products: []}, { new: true });
      return cart;
    } catch (err) {
      console.log('deleteCart' + err);
    }
  }

  async deletaProduct(cartId, prodId){
    try {
      const cart = await cartModel.findByIdAndUpdate(
        cartId,
        { $pull: { products: { _id: prodId } } },
        { new: true });
      return cart;
    } catch (err) {
      console.log('deletaProduct' + err);
    }
  }
}