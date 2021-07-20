import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import detailReducer from "./details";

//sliceをくっつけてstoreとする
const reducer = combineReducers({
  detail: detailReducer,
});

const store = configureStore({ reducer });

export default store;
