import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDrawingColor, setSelectedDrawingTool, setStrokeWidth } from "@/redux/drawingToolsState";
import { dataArray } from "@/util/colorList";

type Props = {};

const CanvasBottomPart = ({}: Props) => {
  const dispatch = useDispatch();
  
  const selectedDrawingColor = useSelector(
    (state: any) => state.drawingToolState
  ).selectedDrawingColor;
  const selectedDrawingTool = useSelector(
    (state: any) => state.drawingToolState
  ).selectedDrawingTool;
const [previousColor, setPreviousColor] = useState("#3498db");
  const strokeWidthSheetRef = useSelector((state:any)=>state.sheetState).strokeWidthSheetRef;
  const sheetState = useSelector((state:any)=>state.sheetState);
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSelectedDrawingColor(item?.color));
      }}
      style={[styles.colorBox, { backgroundColor: item?.color,borderColor:selectedDrawingColor === item?.color ? "#D3D3D3" : "white" }]}
    />
  );

  const renderSeparator = () => <View style={{ width: 10 }} />;

  const handleImagePress = (toolName:any)=>{
    dispatch(setSelectedDrawingTool(toolName));
    if(toolName === "pencil"){
      dispatch(setStrokeWidth(1));
    }else if(toolName === "pen"){
      dispatch(setStrokeWidth(3));
    }else if(toolName === "sketch"){
      dispatch(setStrokeWidth(10));
    }else if(toolName === "eraser"){
      dispatch(setStrokeWidth(10));
      dispatch(setSelectedDrawingColor("#ffffff"));
    }
  }


  const toggleStrokeSheet = () => {
    if (sheetState?.isMenuBottomSheetOpen) {
      strokeWidthSheetRef?.close();
    } else {
      strokeWidthSheetRef?.open();
    }
  };


  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <FlatList
          data={dataArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={renderSeparator}
        />
      </View>
      <View style={styles.toolsContainer}>
        <TouchableOpacity onPress={()=>{handleImagePress("pencil")}}>
          <Image
            style={[styles.ToolsImage,{opacity:selectedDrawingTool === "pencil" ? 1 : 0.3}]}
            source={require("../assets/images/drawingTools/pencil1.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleImagePress("sketch")}}>
          <Image
            style={[styles.ToolsImage,{opacity:selectedDrawingTool === "sketch" ? 1 : 0.5}]}
            source={require("../assets/images/drawingTools/pen2.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleImagePress("pen")}}>
          <Image
            style={[[styles.ToolsImage,{opacity:selectedDrawingTool === "pen" ? 1 : 0.5}]]}
            source={require("../assets/images/drawingTools/pen.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{handleImagePress("eraser")}}>
          <Image
            style={[styles.ToolsImage,{opacity:selectedDrawingTool === "eraser" ? 1 : 0.5}]}
            source={require("../assets/images/drawingTools/eracer.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleStrokeSheet}
          style={{
            borderWidth: 1,
            borderRadius: 50,
            height: 30,
            width: 30,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 50,
              backgroundColor: "black",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CanvasBottomPart;

const styles = StyleSheet.create({
  colorBox: {
    borderColor: "white",
    borderWidth: 2,
    height: 40,
    width: 40,
    borderRadius: 50,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  container: {
    paddingHorizontal: 10,
  },
  ToolsImage: {
    objectFit: "contain",
    height: 100,
    width: 70,
    // borderWidth: 1,
  },
  toolsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
