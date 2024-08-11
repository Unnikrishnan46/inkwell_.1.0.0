import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    selectedImageOrVideoIcon:"image",
}

const iconState = createSlice({
    name:"iconState",
    initialState,
    reducers:{
        setSelectedImageOrVideoIcon:(state,action:PayloadAction<any>)=>{
            state.selectedImageOrVideoIcon = action.payload;
        },
        
    }
});


export const {setSelectedImageOrVideoIcon} = iconState.actions;

export default iconState.reducer;