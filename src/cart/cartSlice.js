import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  quantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const existant = state.cart.find(
        (product) => product.id === action.payload.id
      );
      if (existant) {
        existant.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteProduct: (state, action) => {
      state.cart = state.cart.filter((product) => {
        return product.id !== action.payload;
      });
    },
    clearCart: (state, action) => {
      state.cart = [];
    },
    increseQuantity: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity + 1 };
        } else {
          return product;
        }
      });
    },
    decreseQuantity: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.id === action.payload) {
          return { ...product, quantity: product.quantity - 1 };
        } else {
          return product;
        }
      });
    },
    calculateTotal: (state, action) => {
      state.totalPrice = state.cart.reduce((total, product) => {
        return total + product.price * product.quantity;
      }, 0);
    },
  },
});

export const {
  addToCart,
  deleteProduct,
  clearCart,
  increseQuantity,
  decreseQuantity,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
