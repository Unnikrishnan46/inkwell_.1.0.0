import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddHashTagSheetRef,
  setIsAddHashTagSheetOpen,
} from "@/redux/sheetState";
import ActionSheet, {
  ActionSheetRef,
  useScrollHandlers,
} from "react-native-actions-sheet";
import {
  FlatList,
  NativeViewGestureHandler,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNewDiaryData } from "@/redux/curdDiaryState";
import cloneDeep from 'lodash/cloneDeep';

type Props = {};

const width = Dimensions.get("window").width;
const height = Dimensions.get("screen").height;

const AddHashTagSheet = (props: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const newDiaryData = useSelector((state: any) => state.curdDiaryState)
    ?.newDiaryData;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const dispatch = useDispatch();
  const handlers = useScrollHandlers();

  // console.log(tags,newDiaryData);
  

  useEffect(() => {
    dispatch(setAddHashTagSheetRef(actionSheetRef.current));
    getAllTags();
  }, [dispatch]);

  const handleAddTag = async () => {
    if (newTag.trim()) {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      setNewTag("");
      await AsyncStorage.setItem("allTags", JSON.stringify(updatedTags));
      getAllTags();
    }
  };

  const handleSelectTag = (tag: string) => {
    const updatedDiaryData = cloneDeep(newDiaryData);
    
    if (!updatedDiaryData.tags) {
      updatedDiaryData.tags = [];
    }
    if (updatedDiaryData.tags.includes(tag)) {
      updatedDiaryData.tags = updatedDiaryData.tags.filter((t: string) => t !== tag);
    } else {
      updatedDiaryData.tags.push(tag);
    }
    dispatch(setNewDiaryData(updatedDiaryData));
  };

  const getAllTags = async () => {
    const allTags = await AsyncStorage.getItem("allTags");
    console.log(allTags);
    
    if (allTags) {
      setTags(JSON.parse(allTags));
    }
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      snapPoints={[100]}
      initialSnapIndex={0}
      gestureEnabled={true}
      containerStyle={{ height: height / 2 }}
      onClose={() => {
        dispatch(setIsAddHashTagSheetOpen(false));
      }}
    >
      <NativeViewGestureHandler
        simultaneousHandlers={handlers.simultaneousHandlers}
      >
        <ScrollView style={{ paddingBottom: 20 }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingBottom: Platform.select({ ios: 20, android: 10 }),
            }}
          >
            <Text style={{ fontSize: 30, fontFamily: "SFPro" }}>
              Select an existing tag or add new tags
            </Text>
          </View>

          <View style={styles.container}>
            {tags?.map((item: string, index: number) => (
              <Pressable
                onPress={()=>{handleSelectTag(item)}}
                key={index}
                style={[
                  styles.tagContainer,{backgroundColor:newDiaryData?.tags?.includes(item) ? "gray" : "pink"}]}
              >
                <Text>{item}</Text>
              </Pressable>
            ))}

            <TextInput
              style={styles.textInput}
              placeholder="Add new tag"
              value={newTag}
              onChangeText={setNewTag}
              onSubmitEditing={handleAddTag}
            />
          </View>
        </ScrollView>
      </NativeViewGestureHandler>
    </ActionSheet>
  );
};

export default AddHashTagSheet;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tagContainer: {
    borderRadius: 15,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "#E5DBFB",
    paddingVertical: 10,
  },
  selectedTag: {
    backgroundColor: "#C4B0F0",
  },
  textInput: {
    backgroundColor: "#F9F6EE",
    width: "50%",
    padding: 10,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
});
