import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    selectedMoodToolData:"circle",
}

const moodBoardState = createSlice({
    name:"moodBoardState",
    initialState,
    reducers:{
        setSelectedMoodToolData:(state,action:PayloadAction<any>)=>{
            state.selectedMoodToolData = action.payload;
        },
        
    }
});


export const {setSelectedMoodToolData} = moodBoardState.actions;

export default moodBoardState.reducer;