import CategoryActionTypes from "./action-types";

const initialState = {
    currentCategoryId: null,
};

const categoryReducer = (state = initialState, action) => {
    switch (action.type){
        case CategoryActionTypes.SET_CATEGORY_ID: 
            return { ...state, currentCategoryId: action.payload }
        default:
            return state
    }
}

export default categoryReducer;