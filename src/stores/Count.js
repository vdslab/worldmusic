import { createSlice } from "@reduxjs/toolkit";

//変数の宣言
const initialState = {
  count: 0,
};

//storeと呼ばれるデータの格納場所をsliceという名前で分割して役割ごとにそれぞれの変数で管理する
const slice = createSlice({
  //userという名前のsliceを作成
  name: "user",
  //初期値としてinitialStateで宣言した値が使われる
  initialState,
  reducers: {
    //ここで関数を作成する
    CountUp: (state, action) => {
      //state.変数名で値を参照、変更できる
      //action.payloadでcompnents.ファイル名で宣言した関数で呼び出した引数を持ってくる
      state.count += action.payload;
    },
    CountDown: (state, action) => {
      state.count -= action.payload;
    },
  },
});

export default slice.reducer;
export const { CountUp, CountDown } = slice.actions;
