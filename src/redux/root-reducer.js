import { combineReducers } from "redux";

import userReducer from "./user/reducer";
import categoryReducer from "./category-id/reducer";


const rootReducer = combineReducers({
    userReducer,
    categoryReducer,
});


export default rootReducer;