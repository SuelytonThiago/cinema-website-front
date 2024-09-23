import ShowLoginModalTypes from "./action-types";

export const showLoginModal = () => ({
    type: ShowLoginModalTypes.SHOW_LOGIN_MODAL,
  });
  
  export const hideLoginModal = () => ({
    type: ShowLoginModalTypes.HIDE_LOGIN_MODAL,
  });