import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  photoAndVideoPermissionModal: false,
  isVoiceRecordModal: false,
  imageState: null,
  isSaveEntryModalOpen: false,
  isSaveMoodBoardModalOpen: false,
  isSaveEditModalOpen: false,
  isAskPremiumModalOpen:false,
};

const modalState = createSlice({
  name: "modalState",
  initialState,
  reducers: {
    setPhotoAndVideoPermissionModal: (state, action: PayloadAction<any>) => {
      state.photoAndVideoPermissionModal = action.payload;
    },
    setIsVoiceRecordModal: (state, action: PayloadAction<any>) => {
      state.isVoiceRecordModal = action.payload;
    },
    setImageState: (state, action: PayloadAction<any>) => {
      state.imageState = action.payload;
    },
    setIsSaveEntryModalOpen: (state, action: PayloadAction<any>) => {
      state.isSaveEntryModalOpen = action.payload;
    },
    setIsSaveMoodBoardModalOpen: (state, action: PayloadAction<any>) => {
      state.isSaveMoodBoardModalOpen = action.payload;
    },
    setIsSaveEditModalOpen: (state, action: PayloadAction<any>) => {
      state.isSaveEditModalOpen = action.payload;
    },
    setIsAskPremiumModalOpen: (state, action: PayloadAction<any>) => {
      state.isAskPremiumModalOpen = action.payload;
    },
  },
});

export const {
  setPhotoAndVideoPermissionModal,
  setIsVoiceRecordModal,
  setImageState,
  setIsSaveEntryModalOpen,
  setIsSaveMoodBoardModalOpen,
  setIsSaveEditModalOpen,
  setIsAskPremiumModalOpen
} = modalState.actions;

export default modalState.reducer;
