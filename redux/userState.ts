import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    userInfoData:null,
}

const userState = createSlice({
    name:"userState",
    initialState,
    reducers:{
        setUserInfoData:(state,action:PayloadAction<any>)=>{
            state.userInfoData = action.payload;
        },
        
    }
});


export const {setUserInfoData} = userState.actions;

export default userState.reducer;