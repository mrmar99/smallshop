const SET_PRODUCTS = "kostinich/products/SET_PRODUCTS";
const SET_STORE = "kostinich/products/SET_STORE";

const initialState = {
    products: [],
    current_store: 1
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return { ...state, products: action.products };
        case SET_STORE:
            return { ...state, current_store: action.current_store };
        default:
            return state;
    }
}

export default reducer;

export const setProducts = (data) => (dispatch) => {
    dispatch({
        type: SET_PRODUCTS,
        products: data
    });
};

export const setStore = (current_store) => (dispatch) => {
    dispatch({
        type: SET_STORE,
        current_store
    });
};