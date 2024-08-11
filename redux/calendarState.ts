import {getMonthAndYear } from "@/util/utils";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    currentSelectedMonth:getMonthAndYear(new Date),
}

const calendarState = createSlice({
    name:"calendarState",
    initialState,
    reducers:{
        setCurrentSelectedMonth:(state,action:PayloadAction<any>)=>{
            state.currentSelectedMonth = action.payload;
        },
        
    }
});


export const {setCurrentSelectedMonth} = calendarState.actions;

export default calendarState.reducer;