export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

const clearCart = []

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMVOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART',
    REDUCE_FROM_CART: 'REDUCE_FROM-CART',
}


export const updateLocalStorage = (state) => {
    window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action

    if (actionType === CART_ACTION_TYPES.REDUCE_FROM_CART) {
        const { id } = actionPayload
        const productInCartIndex = state.findIndex(item => item.id === id)


        if (productInCartIndex >= 0) {
            const newState = [
                ...state.slice(0, productInCartIndex),
                { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity === 1 ? state[productInCartIndex].quantity : state[productInCartIndex].quantity - 1 },
                ...state.slice(productInCartIndex + 1)
            ]

            updateLocalStorage(newState)


            return newState
        }
    }

    if (actionType === CART_ACTION_TYPES.ADD_TO_CART) {
        const { id } = actionPayload

        const productInCartIndex = state.findIndex(item => item.id === id)

        if (productInCartIndex >= 0) {
            const newState = [
                ...state.slice(0, productInCartIndex),
                { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
                ...state.slice(productInCartIndex + 1)
            ]

            updateLocalStorage(newState)

            return newState
        }

        const newState = [
            ...state,
            {
                ...actionPayload,
                quantity: 1
            }
        ]

        updateLocalStorage(newState)


        return newState

    }

    if (actionType === CART_ACTION_TYPES.REMOVE_FROM_CART) {
        const { id } = actionPayload
        const newState = state.filter(item => item.id !== id)
        updateLocalStorage(newState)
        return newState
    }

    if (actionType === CART_ACTION_TYPES.CLEAR_CART) {
        updateLocalStorage(clearCart)
        return clearCart
    }

    return state

}
