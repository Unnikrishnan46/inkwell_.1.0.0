import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState:any = {
    selectedTool:"",
    voiceRecordState:null,
    imageState:null,
    diaryBackgroundImage:null,
    stickerState:null
}

const toolBarState = createSlice({
    name:"toolBarState",
    initialState,
    reducers:{
        setSelectedTool:(state,action:PayloadAction<any>)=>{
            state.selectedTool = action.payload;
        },
        setVoiceRecordState:(state,action:PayloadAction<any>)=>{
            state.voiceRecordState = action.payload;
        },
        setImageState:(state,action:PayloadAction<any>)=>{
            state.imageState = action.payload;
        },
        setDiaryBackgroundImage:(state,action:PayloadAction<any>)=>{
            state.diaryBackgroundImage = action.payload;
        },
        setStickerState:(state,action:PayloadAction<any>)=>{
            state.stickerState = action.payload;
        },
    }
});


export const {setSelectedTool,setVoiceRecordState,setImageState,setDiaryBackgroundImage,setStickerState} = toolBarState.actions;

export default toolBarState.reducer;