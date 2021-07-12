import { createSlice } from "@reduxjs/toolkit";

//変数の宣言
const initialState = {
  startMonth: "2018-01",
  endMonth: "2018-06",
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
    changeStartMonth: (state, action) => {
      //state.変数名で値を参照、変更できる
      //action.payloadでcompnents.ファイル名で宣言した関数で呼び出した引数を持ってくる
      state.startMonth = action.payload;
      // changeData(changeDBYear(state.year));
    },
    changeEndMonth: (state, action) => {
      state.endMonth = action.payload;
    },
    changeFeature: (state, action) => {
      // console.log(action.payload);
      state.feature = action.payload;
    },

    changeCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  changeStartMonth,
  changeFeature,
  changeEndMonth,
  changeCountry,
} = slice.actions;
