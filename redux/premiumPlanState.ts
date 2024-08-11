import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    selectedPlan:"annualy",
    isTrialEnabled:false
}

const premiumPlanState = createSlice({
    name:"premiumPlanState",
    initialState,
    reducers:{
        setSelectedPlan:(state,action:PayloadAction<any>)=>{
            state.selectedPlan = action.payload;
        },
        setIsTrialEnabled:(state,action:PayloadAction<any>)=>{
            state.isTrialEnabled = action.payload;
        },
    }
});


export const {setSelectedPlan,setIsTrialEnabled} = premiumPlanState.actions;

export default premiumPlanState.reducer;