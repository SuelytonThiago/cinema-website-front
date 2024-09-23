import ShowLoginModalTypes from "./action-types";

const initialState = {
    isVisible: false,
  };
  
  const loginModalReducer = (state = initialState, action) => {
    switch (action.type) {
      case ShowLoginModalTypes.SHOW_LOGIN_MODAL:
        return { ...state, isVisible: true };
      case ShowLoginModalTypes.HIDE_LOGIN_MODAL:
        return { ...state, isVisible: false };
      default:
        return state;
    }
  };
  
  export default loginModalReducer;