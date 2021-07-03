import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

//変数の宣言
const initialState = {
  year: 2020,
  period: "01-06",
  feature: "acousticness",
  country: "UK",
};

//storeと呼ばれるデータの格納場所をsliceという名前で分割して役割ごとにそれぞれの変数で管理する
const slice = createSlice({
  //userという名前のsliceを作成
  name: "detail",
  //初期値としてinitialStateで宣言した値が使われる
  initialState,
  reducers: {
    //ここで関数を作成する
    changeYear: (state, action) => {
      //state.変数名で値を参照、変更できる
      //action.payloadでcompnents.ファイル名で宣言した関数で呼び出した引数を持ってくる
      state.year = action.payload;
      // changeData(changeDBYear(state.year));
    },
    changePeriod: (state, action) => {
      state.period = action.payload;
    },
    changeFeature: (state, action) => {
      state.feature = action.payload;
    },

    changeCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export default slice.reducer;
export const { changePeriod, changeFeature, changeYear } = slice.actions;
