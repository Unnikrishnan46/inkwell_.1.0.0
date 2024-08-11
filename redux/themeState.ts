import ThemesDataList from "@/util/themeDataList";
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState:any = {
    selectedThemeData:ThemesDataList[0],
}

const themeState = createSlice({
    name:"themeState",
    initialState,
    reducers:{
        setSelectedThemeData:(state,action:PayloadAction<any>)=>{
            state.selectedThemeData = action.payload;
        },
        
    }
});


export const {setSelectedThemeData} = themeState.actions;

export default themeState.reducer;

