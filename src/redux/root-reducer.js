import { combineReducers } from "redux";

import loginModalReducer from "./show-login-modal/reducer"
import userReducer from "./user/reducer";
import categoryReducer from "./category-id/reducer";


const rootReducer = combineReducers({
    userReducer,
    categoryReducer,
    loginModalReducer,
});


export default rootReducer;