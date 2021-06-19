import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Count";

//sliceをくっつけてstoreとする
const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({ reducer });

export default store;
