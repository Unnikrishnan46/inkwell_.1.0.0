import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    onBoardScreenCompleted:false,
}

const onBoardState = createSlice({
    name:"onBoardState",
    initialState,
    reducers:{
        setOnBoardScreenCompleted:(state,action:PayloadAction<any>)=>{
            state.onBoardScreenCompleted = action.payload;
        },
    }
});


export const {setOnBoardScreenCompleted} = onBoardState.actions;

export default onBoardState.reducer;