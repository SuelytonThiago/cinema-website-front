import UserActionTypes from "./action-types";

const initialState = {
    currentUser: {
        name: '',
        email: '',
        cpf: '',
        contactNumber: '',
        password: '',
        profileImg: '',
      },
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return { ...state, currentUser: action.payload }
        case UserActionTypes.LOGOUT:
            return { ...state, currentUser: null }
        case UserActionTypes.SET_USER_DATA:
            return { ...state, currentUser: action.payload };
        case UserActionTypes.UPDATE_PROFILE_IMG:
            return {...state,
                currentUser: {
                    ...state.currentUser,
                    profileImg: action.payload, 
                },
            };

        default:
            return state;
    }
};

export default userReducer;