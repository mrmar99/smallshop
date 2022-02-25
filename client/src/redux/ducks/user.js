const SET_IS_AUTH = "courseek/users/SET_IS_AUTH";
const SET_USER = "courseek/users/SET_USER";

const initialState = {
    user: {
        isAuth: false
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_IS_AUTH:
            return { ...state, user: { ...state.user, isAuth: action.isAuth } };
        case SET_USER:
            action.user.isAuth = state.user.isAuth;
            return { ...state, user: action.user }
        default:
            return state;
    }
};

export default reducer;

export const setIsAuth = (isAuth) => (dispatch) => {
    dispatch({
        type: SET_IS_AUTH,
        isAuth
    });
};

export const setUser = (user) => (dispatch) => {
    dispatch({
        type: SET_USER,
        user
    });
};