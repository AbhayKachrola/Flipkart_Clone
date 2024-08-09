import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;

            const existItem = state.cartItems.find(product => product.id === item.id);
            
            if(existItem){
                return {
                    ...state, cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                // saveCart(item)
                return  { ...state, cartItems: [...state.cartItems, item]}
            }

        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(product => product.id !== action.payload)
            }
        default:
            return state;
    }
}

// Function to save the cart to localStorage
// function saveCart(cart)
//  {
//   localStorage.setItem('cart', JSON.stringify(cart));
// }

// Function to load the cart from localStorage
// function loadCart() {
//   const cart = localStorage.getItem('cart');
//   return cart ? JSON.parse(cart): [];
// }