import UserActionTypes from "./action-types";

export const loginUser = (payload) => ({
    type: UserActionTypes.LOGIN,
    payload,
});

export const logoutUser = () => ({
    type: UserActionTypes.LOGOUT,
    payload: null,
});

export const updateUser = (payload) => ({
    type: UserActionTypes.SET_USER_DATA,
    payload,
})

export const updateProfileImage = (profileImg) => {
    return {
      type: UserActionTypes.UPDATE_PROFILE_IMG,
      payload: profileImg,
    };
  };

