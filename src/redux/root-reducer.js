import { combineReducers } from "redux";

import loginModalReducer from "./show-login-modal/reducer"
import userReducer from "./user/reducer";



const rootReducer = combineReducers({
    userReducer,
    loginModalReducer,
});


export default rootReducer;