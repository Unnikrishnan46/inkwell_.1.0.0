import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    affirmationListData:["I am worthy of love."],
}

const affirmationState = createSlice({
    name:"affirmationState",
    initialState,
    reducers:{
        setAffirmationListData:(state,action:PayloadAction<any>)=>{
            state.affirmationListData = action.payload;
        },
        
    }
});


export const {setAffirmationListData} = affirmationState.actions;

export default affirmationState.reducer;