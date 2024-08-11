import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    isReminderEnabled:false,
    isSetReminderModalOpen:false,
}

const reminderState = createSlice({
    name:"reminderState",
    initialState,
    reducers:{
        setIsReminderEnabled:(state,action:PayloadAction<any>)=>{
            state.isReminderEnabled = action.payload;
        },
        setIsSetReminderModalOpen:(state,action:PayloadAction<any>)=>{
            state.isSetReminderModalOpen = action.payload;
        },
    }
});


export const {setIsReminderEnabled,setIsSetReminderModalOpen} = reminderState.actions;

export default reminderState.reducer;