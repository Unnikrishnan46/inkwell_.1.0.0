import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  isMenuBottomSheetOpen: false,
  menuBottomSheetRef: null,
  isDiaryBackgroundSheetOpen: false,
  diaryBackgroundSheetRef: null,
  isDiaryAddImageAndVideoSheetOpen: false,
  addImageAndVideoSheetRef: null,
  isStrokeWidthSheetOpen: false,
  strokeWidthSheetRef : null,
  isFontStyleSheetOpen: false,
  fontStyleSheetOpenRef : null,
  isStickersSheetOpen: false,
  stickersSheetRef : null,
  isText2SpeechTabOpen : false,
  isAddHashTagSheetOpen:false,
  addHashTagSheetRef:null,
  moodFontSheetRef:null,
};

const sheetState = createSlice({
  name: "sheetState",
  initialState,
  reducers: {
    setIsMenuBottomSheetOpen: (state, action: PayloadAction<any>) => {
      state.menuBottomSheet = action.payload;
    },
    setMenuBottomSheetRef: (state, action: PayloadAction<any>) => {
      state.menuBottomSheetRef = action.payload;
    },
    setIsDiaryBackgroundSheetOpen: (state, action: PayloadAction<any>) => {
      state.isDiaryBackgroundSheetOpen = action.payload;
    },
    setDiaryBackgroundSheetRef: (state, action: PayloadAction<any>) => {
      state.diaryBackgroundSheetRef = action.payload;
    },
    setIsDiaryAddImageAndVideoSheetOpen: (
      state,
      action: PayloadAction<any>
    ) => {
      state.isDiaryAddImageAndVideoSheetOpen = action.payload;
    },
    setAddImageAndVideoSheetRef: (state, action: PayloadAction<any>) => {
      state.addImageAndVideoSheetRef = action.payload;
    },
    setIsStrokeWidthSheetOpen: (state, action: PayloadAction<any>) => {
      state.isStrokeWidthSheetOpen = action.payload;
    },
    setStrokeWidthSheetRef: (state, action: PayloadAction<any>) => {
      state.strokeWidthSheetRef = action.payload;
    },
    setIsFontStyleSheetOpen: (state, action: PayloadAction<any>) => {
      state.isFontStyleSheetOpen = action.payload;
    },
    setFontStyleSheetOpenRef: (state, action: PayloadAction<any>) => {
      state.fontStyleSheetOpenRef = action.payload;
    },
    setIsStickersSheetOpen: (state, action: PayloadAction<any>) => {
      state.isStickersSheetOpen = action.payload;
    },
    setstickersSheetRef: (state, action: PayloadAction<any>) => {
      state.stickersSheetRef = action.payload;
    },
    setIsText2SpeechTabOpen: (state, action: PayloadAction<any>) => {
      state.isText2SpeechTabOpen = action.payload;
    },
    setIsAddHashTagSheetOpen: (state, action: PayloadAction<any>) => {
      state.isAddHashTagSheetOpen = action.payload;
    },
    setAddHashTagSheetRef: (state, action: PayloadAction<any>) => {
      state.addHashTagSheetRef = action.payload;
    },
    setMoodFontSheetRef: (state, action: PayloadAction<any>) => {
      state.moodFontSheetRef = action.payload;
    },
  },
});

export const {
  setIsMenuBottomSheetOpen,
  setMenuBottomSheetRef,
  setIsDiaryBackgroundSheetOpen,
  setDiaryBackgroundSheetRef,
  setIsDiaryAddImageAndVideoSheetOpen,
  setAddImageAndVideoSheetRef,
  setIsStrokeWidthSheetOpen,
  setStrokeWidthSheetRef,
  setIsFontStyleSheetOpen,
  setFontStyleSheetOpenRef,
  setIsStickersSheetOpen,
  setstickersSheetRef,
  setIsText2SpeechTabOpen,
  setIsAddHashTagSheetOpen,
  setAddHashTagSheetRef,
  setMoodFontSheetRef
} = sheetState.actions;

export default sheetState.reducer;
