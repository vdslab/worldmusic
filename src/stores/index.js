import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Count";
import detailReducer from "./details";

//sliceをくっつけてstoreとする
const reducer = combineReducers({
  user: userReducer,
  detail: detailReducer,
});

const store = configureStore({ reducer });

export default store;
