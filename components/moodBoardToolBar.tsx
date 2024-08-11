import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMoodToolData } from "@/redux/moodBoardState";


type Props = {
  handleSelectTextTool: any;
  pickImage: any;
  setSelectedShapeIndex:any;
  setSelectedShapeData:any;
};

const MoodBoardToolBar = ({ handleSelectTextTool, pickImage,setSelectedShapeIndex,setSelectedShapeData }: Props) => {
  
  const dispatch = useDispatch();
  const selectedTool = useSelector(
    (state: any) => state.moodBoardState
  )?.selectedMoodToolData;

  const handleSelectedTool = (tool: string) => {
    dispatch(setSelectedMoodToolData(tool));
    setSelectedShapeIndex(null);
    setSelectedShapeData(null);
  };



  return (
    <View style={styles.container}>
      <Pressable
      style={{borderBottomColor:selectedTool === "line" ? "Pink" : "",borderBottomWidth:selectedTool === "line" ? 1 : 0}}
        onPress={() => {
          handleSelectedTool("line");
        }}
      >
        <MaterialCommunityIcons name="slash-forward" size={25} />
      </Pressable>
      <Pressable
      style={{borderBottomColor:selectedTool === "circle" ? "Pink" : "",borderBottomWidth:selectedTool === "circle" ? 1 : 0}}
        onPress={() => {
          handleSelectedTool("circle");
        }}
      >
        <Feather name="circle" size={25} />
      </Pressable>
      <Pressable
      style={{borderColor:selectedTool === "rectangle" ? "Pink" : "",borderBottomWidth:selectedTool === "rectangle" ? 1 : 0}}
        onPress={() => {
          handleSelectedTool("rectangle");
        }}
      >
        <Feather name="square" size={25} />
      </Pressable>
      <Pressable
      style={{borderColor:selectedTool === "pencil" ? "Pink" : "",borderBottomWidth:selectedTool === "pencil" ? 1 : 0}}
        onPress={() => {
          handleSelectedTool("pencil");
        }}
      >
        <Octicons name="pencil" size={25} />
      </Pressable>
      <Pressable
       onPress={handleSelectTextTool}>
        <Ionicons name="text" size={25} />
      </Pressable>
      <Pressable
      onPress={pickImage}>
        <Octicons name="image" size={25} />
      </Pressable>
      
    </View>
  );
};

export default MoodBoardToolBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 20,
  },
});
