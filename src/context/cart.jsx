import { createContext, useReducer } from "react";
import { CART_ACTION_TYPES, cartInitialState, cartReducer } from "../cart";

export const CartContext = createContext()

function useCartReducer() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = product => dispatch({
        type: CART_ACTION_TYPES.ADD_TO_CART,
        payload: product
    })

    const reduceFromCart = product => dispatch({
        type: CART_ACTION_TYPES.REDUCE_FROM_CART,
        payload: product
    })

    const removeFromCart = product => dispatch({
        type: CART_ACTION_TYPES.REMOVE_FROM_CART,
        payload: product
    })

    const clearCart = () => dispatch({
        type: CART_ACTION_TYPES.CLEAR_CART,
    })




    return { addToCart, removeFromCart, clearCart, state, reduceFromCart }
}

export function CartProvider({ children }) {
    const { addToCart, removeFromCart, clearCart, state, reduceFromCart } = useCartReducer()

    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            removeFromCart,
            clearCart,
            reduceFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}