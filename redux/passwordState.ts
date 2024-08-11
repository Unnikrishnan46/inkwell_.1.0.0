import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  isPasswordEnabled: false,
  hasPassword: false,
  addRecoveryPasswordOpen: false,
  isBioMetricEnabled:false,
  isPasswordSuccess:false,
};

const passwordState = createSlice({
  name: "passwordState",
  initialState,
  reducers: {
    setIsPasswordEnabled: (state, action: PayloadAction<any>) => {
      state.isPasswordEnabled = action.payload;
    },
    setHasPassword: (state, action: PayloadAction<any>) => {
      state.hasPassword = action.payload;
    },
    setAddRecoveryPasswordOpen: (state, action: PayloadAction<any>) => {
      state.addRecoveryPasswordOpen = action.payload;
    },
    setIsBioMetricEnabled: (state, action: PayloadAction<any>) => {
      state.isBioMetricEnabled = action.payload;
    },
    setIsPasswordSuccess: (state, action: PayloadAction<any>) => {
      state.isPasswordSuccess = action.payload;
    },
  },
});

export const {
  setIsPasswordEnabled,
  setHasPassword,
  setAddRecoveryPasswordOpen,
  setIsBioMetricEnabled,
  setIsPasswordSuccess
} = passwordState.actions;

export default passwordState.reducer;
