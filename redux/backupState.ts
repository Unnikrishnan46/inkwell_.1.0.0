import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    isAutoBackupEnabled:false,
}

const backupState = createSlice({
    name:"backupState",
    initialState,
    reducers:{
        setIsAutoBackupEnabled:(state,action:PayloadAction<any>)=>{
            state.isAutoBackupEnabled = action.payload;
        },
        
    }
});


export const {setIsAutoBackupEnabled} = backupState.actions;

export default backupState.reducer;