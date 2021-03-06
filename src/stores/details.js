import { createSlice } from "@reduxjs/toolkit";

//変数の宣言
const initialState = {
  startMonth: [],
  endMonth: "2018-03",
  feature: "acousticness",
  country: [],
  musicid: "a",
  max: -Infinity,
  min: Infinity,
  sorted: "昇順",
  display: "No",
  judgeVis: 0,
  choosedCountry: "No",
  choosedFeature: "No",
  choosedPeriod: "No",
  regionId: "",
  isRegionShowed: false,
  isSwmpltChoosed: false,
  isSwmpltShowed: [],
  selectClicked: false,
  checkRaderFeatureClicked: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  checkRegionClicked: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  swarmpltMin: Infinity,
  swarmpltMax: -Infinity,
  selectedCount: true,
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

    changeMusicId: (state, action) => {
      state.musicid = action.payload;
    },

    changeMax: (state, action) => {
      state.max = action.payload;
    },

    changeMin: (state, action) => {
      state.min = action.payload;
    },

    changeSorted: (state, action) => {
      state.sorted = action.payload;
    },

    changeDisplay: (state, action) => {
      state.display = action.payload;
    },

    changeJudgeVis: (state, action) => {
      state.judgeVis = action.payload;
    },

    changeChoosedCountry: (state, action) => {
      state.choosedCountry = action.payload;
    },

    changeChoosedFeature: (state, action) => {
      state.choosedFeature = action.payload;
    },

    changeChoosedPeriod: (state, action) => {
      state.choosedPeriod = action.payload;
    },
    changeRegionId: (state, action) => {
      state.regionId = action.payload;
    },

    changeIsRegionShowed: (state, action) => {
      state.isRegionShowed = action.payload;
    },

    changeIsSwmpltChoosed: (state, action) => {
      state.isSwmpltChoosed = action.payload;
    },

    changeIsSwmpltShowed: (state, action) => {
      state.isSwmpltShowed = action.payload;
    },

    changeSelectClicked: (state, action) => {
      state.selectClicked = action.payload;
    },

    changeCheckRaderFeatureClicked: (state, action) => {
      state.checkRaderFeatureClicked = action.payload;
    },

    changeCheckRegionClicked: (state, action) => {
      state.checkRegionClicked = action.payload;
    },
    changeSwarmpltMin: (state, action) => {
      state.swarmpltMin = action.payload;
    },
    changeSwarmpltMax: (state, action) => {
      state.swarmpltMax = action.payload;
    },
    changeSlectedCount: (state, action) => {
      state.selectedCount = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  changeStartMonth,
  changeFeature,
  changeEndMonth,
  changeCountry,
  changeMusicId,
  changeMax,
  changeMin,
  changeSorted,
  changeDisplay,
  changeJudgeVis,
  changeChoosedCountry,
  changeChoosedFeature,
  changeChoosedPeriod,
  changeRegionId,
  changeIsRegionShowed,
  changeIsSwmpltChoosed,
  changeIsSwmpltShowed,
  changeSelectClicked,
  changeCheckRaderFeatureClicked,
  changeCheckRegionClicked,
  changeSwarmpltMax,
  changeSwarmpltMin,
  changeSlectedCount,
} = slice.actions;
