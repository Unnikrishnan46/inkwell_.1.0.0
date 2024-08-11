import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { setImageState } from "@/redux/toolBarState";
import { setCurrentContentItemCount, setNewDiaryData } from "@/redux/curdDiaryState";

type Props = {
  source:any;
  itemCount:any;
  editMode:any;
};

const ImageDisplay = ({source,itemCount,editMode}: Props) => {
  const dispatch = useDispatch();
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;
  const currentContentItemCount = useSelector(
    (state: any) => state.curdDiaryState
  )?.currentContentItemCount;

  
  const deleteItem = () => {
    const currentData = newDiaryData;
    const updatedBody = currentData.body
      .map((item:any) => {
        if (item.itemCount === itemCount) {
          if (item.itemContent === '') {
            return null; // Mark item for deletion
          } else {
            return { ...item, itemType: 'text', itemFile: undefined }; // Change itemType to 'text' and remove 'itemImage'
          }
        }
        return item;
      })
      .filter((item:any) => item !== null) // Remove items marked for deletion
      .map((item:any, index:any) => ({ ...item, itemCount: index + 1 })); // Update itemCount for remaining items

    const updatedData = { ...currentData, body: updatedBody };
    dispatch(setNewDiaryData(updatedData));
    dispatch(setCurrentContentItemCount(updatedBody.length));
  };

  return (
    <View style={styles.container}>
      <Image
        style={[{ width: 200, height: 200 }, styles.imageStyle]}
        source={{ uri: source }}
      />
      <Pressable onPress={deleteItem} style={[styles.deleteBtn,{display:editMode ? "flex" : "none"}]}>
        <AntDesign name="close" size={15} color={"white"} />
      </Pressable>
    </View>
  );
};

export default ImageDisplay;

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
  },
  imageStyle: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 10,
  },
  deleteBtn: {
    position: "absolute",
    height: 25,
    width: 25,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    right: -10,
    top: -10,
  },
});
