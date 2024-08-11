import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    searchQuery:""
}

const searchState = createSlice({
    name:"searchState",
    initialState,
    reducers:{
        setSearchQuery:(state,action:PayloadAction<any>)=>{
            state.searchQuery = action.payload;
        },
        
    }
});


export const {setSearchQuery} = searchState.actions;

export default searchState.reducer;