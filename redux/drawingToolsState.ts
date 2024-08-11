import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const initialState:any = {
    selectedDrawingTool:"pencil",
    selectedDrawingColor:"#3498db",
    strokeWidth:1
}

const drawingToolState = createSlice({
    name:"drawingToolState",
    initialState,
    reducers:{
        setSelectedDrawingTool:(state,action:PayloadAction<any>)=>{
            state.selectedDrawingTool = action.payload;
        },
        setSelectedDrawingColor:(state,action:PayloadAction<any>)=>{
            state.selectedDrawingColor = action.payload;
        },
        setStrokeWidth:(state,action:PayloadAction<any>)=>{
            state.strokeWidth = action.payload;
        },
    }
});


export const {setSelectedDrawingTool,setSelectedDrawingColor,setStrokeWidth} = drawingToolState.actions;

export default drawingToolState.reducer;