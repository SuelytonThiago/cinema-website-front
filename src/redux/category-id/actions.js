import CategoryActionTypes from "./action-types";

export const setCategoryId = (payload) => ({
    type: CategoryActionTypes.SET_CATEGORY_ID,
    payload,
});