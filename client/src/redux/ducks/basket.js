const SET_QUANTITY = "kostinich/basket/SET_QUANTITY";
const SET_BASKET = "kostinich/basket/SET_BASKET";
const SET_PRODUCT_QUANTITY = "kostinich/basket/SET_PRODUCT_QUANTITY";
const DELETE_PRODUCT = "kostinich/basket/DELETE_PRODUCT";
const CLEAR_BASKET = "kostinich/basket/CLEAR_BASKET";

const initialState = {
    quantity: 0,
    basket: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BASKET:
            let isCurrentProduct = false;
            Object.values(state.basket).forEach((product) => {
                console.log(action.product.id, product.id)
                if (action.product.id === product.id) {
                    isCurrentProduct = true;
                }
            });

            if (isCurrentProduct) {
                return {
                    ...state,
                    basket: {
                        ...state.basket,
                        [action.product.id]: {
                            ...action.product,
                            quantity: state.basket[action.product.id].quantity + 1
                        }
                    }
                }
            }
            return {
                ...state,
                basket: {
                    ...state.basket,
                    [action.product.id]: {
                        ...action.product,
                        quantity: 1
                    }
                },
                quantity: state.quantity + 1
            };
        case SET_QUANTITY:
            return { ...state, quantity: action.qty };
        case SET_PRODUCT_QUANTITY:
            return {
                ...state,
                basket: { ...state.basket, [action.product.id]: { ...action.product, quantity: parseInt(action.qty) } }
            };
        case DELETE_PRODUCT:
            const newBasket = state.basket;
            delete newBasket[action.productId];
            return {
                ...state,
                basket: newBasket
            };
        case CLEAR_BASKET:
            return {
                ...state,
                quantity: 0,
                basket: {}
            };
        default:
            return state;
    }
}

export default reducer;

export const setBasket = (product) => (dispatch) => {
    dispatch({
        type: SET_BASKET,
        product
    });
};

export const setQuantity = (qty) => (dispatch) => {
    dispatch({
        type: SET_QUANTITY,
        qty
    });
};

export const setProductQuantity = (qty, product) => (dispatch) => {
    dispatch({
        type: SET_PRODUCT_QUANTITY,
        qty,
        product
    });
};

export const deleteProduct = (productId) => (dispatch) => {
    dispatch({
        type: DELETE_PRODUCT,
        productId
    });
};

export const clearBasket = () => (dispatch) => {
    dispatch({
        type: CLEAR_BASKET
    })
}