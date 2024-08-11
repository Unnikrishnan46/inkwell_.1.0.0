import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  ImageBackground,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDiaryTop from "@/components/addDiaryTop";
import DiaryToolBar from "@/components/diaryToolBar";
import { router, useFocusEffect, useNavigation, useRouter } from "expo-router";
import ShowSkiaImage from "@/components/showSkiaImage";
import VoiceRecordingDisplay from "@/components/voiceRecordingDisplay";
import ShowSticker from "@/components/showSticker";
import { getCurrentDayDetails } from "@/util/utils";
import {
  setCurrentContentItemCount,
  setFocusedInput,
  setNewDiaryData,
} from "@/redux/curdDiaryState";
import uuid from "react-native-uuid";
import ImageDisplay from "@/components/imageDisplay";
import * as FileSystem from "expo-file-system";
import { allEmotionMoods } from "@/util/moodList";


const statusBarHeight = StatusBar.currentHeight;
const height = Dimensions.get("window").height;

const AddDiary = () => {
  const selectedTheme = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;
  const navigation = useNavigation();
  const router = useRouter();

  const focusedInput = useSelector(
    (state: any) => state.curdDiaryState
  )?.focusedInput; 

  const dispatch = useDispatch();
  navigation.canGoBack();

  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;  
  

  const currentContentItemCount = useSelector(
    (state: any) => state.curdDiaryState
  )?.currentContentItemCount;

  // useFocusEffect(
  //   useCallback(() => {
  //     const data = getCurrentDayDetails(new Date());
  //     const id = uuid.v4();
  //     dispatch(
  //       setNewDiaryData({
  //         id: `${id}-${new Date().toISOString()}`,
  //         title: "",
  //         CurrentDayDetails: data,
  //         background: {
  //           backgroundImage: false,
  //           backgroundFile: undefined,
  //           backgroundColor: selectedTheme?.bodyBgColor,
  //         },
  //         moodData: allEmotionMoods[0]?.moodData[0],
  //         body: [{ itemCount: 1, itemType: "text", itemContent: "" }],
  //       })
  //     );
  //     dispatch(setCurrentContentItemCount(currentContentItemCount + 1));
  //   }, [])
  // );

  useEffect(()=>{
    const data = getCurrentDayDetails(new Date());
    const id = uuid.v4();
    dispatch(
      setNewDiaryData({
        id: `${id}-${new Date().toISOString()}`,
        title: "",
        CurrentDayDetails: data,
        background: {
          backgroundImage: false,
          backgroundFile: undefined,
          backgroundColor: selectedTheme?.bodyBgColor,
        },
        moodData: allEmotionMoods[0]?.moodData[0],
        body: [{ itemCount: 1, itemType: "text", itemContent: "" }],
      })
    );
    dispatch(setCurrentContentItemCount(currentContentItemCount + 1));
  },[]);

  const handleTitleChange = (e: any) => {
    const currentData = newDiaryData;
    const updatedData = { ...currentData, title: e };
    dispatch(setNewDiaryData(updatedData));
  };

  const handleItemChange = (
    itemCount: number,
    newContent: string,
    itemType: string
  ) => {
    const currentData = newDiaryData;

    // Map through items to update content
    const updatedBody = currentData.body.map((item: any) => {
      if (item.itemCount === itemCount) {
        return { ...item, itemContent: newContent }; // update item content
      }
      return item;
    });

    // Get the count of items before filtering
    const initialCount = updatedBody.length;

    // Filter out items with itemType 'text' and empty itemContent, except itemCount 1
    const filteredBody = updatedBody.filter((item: any) => {
      if (item.itemCount === 1) {
        return true;
      }
      return !(item.itemType === "text" && item.itemContent === "");
    });

    // Get the count of items after filtering
    const finalCount = filteredBody.length;

    // Dispatch updated data to Redux store
    const updatedData = { ...currentData, body: filteredBody };
    dispatch(setNewDiaryData(updatedData));

    // Check if an item was deleted and dispatch to update currentContentItemCount
    if (finalCount < initialCount) {
      dispatch(setCurrentContentItemCount(currentContentItemCount - 1));
    }
  };

  const renderDiaryContent = () => {
    return newDiaryData?.body.map((item: any) => {
      if (item.itemType === "text") {
        return (
          <TextInput
            key={item.itemCount}
            onChangeText={(e) => handleItemChange(item.itemCount, e, "text")}
            style={{
              fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
              fontFamily: item.itemFont ? item.itemFont : "SFPro11",
              textAlignVertical: "top",
              marginBottom: 10,
              color: item.itemFontColor ? item.itemFontColor : "#000000",
              textAlign:item?.itemTextAlign ? item?.itemTextAlign : "auto",
              
            }}
            placeholder="Dear Diary..."
            placeholderTextColor={"#9983C3"}
            multiline={true}
            value={item.itemContent}
            onFocus={()=>{dispatch(setFocusedInput(item))}}
          />
        );
      } else if (item.itemType === "image") {
        return (
          <View key={item.itemCount} style={{ gap: 10 }}>
            <ImageDisplay
              source={item.itemFile}
              itemCount={item.itemCount}
              editMode={true}
            />
            <TextInput
              key={`textInput-${item.itemCount}`}
              onChangeText={(e) => handleItemChange(item.itemCount, e, "image")}
              style={{
                fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
                fontFamily: item.itemFont ? item.itemFont : "SFPro11",
                textAlignVertical: "top",
                marginBottom: 10,
                color: item.itemFontColor ? item.itemFontColor : "#000000",
                textAlign:item?.itemTextAlign ? item?.itemTextAlign : "auto"
              }}
              placeholder="Write more here..."
              placeholderTextColor={"#9983C3"}
              multiline={true}
              value={item.itemContent}
              onFocus={()=>{dispatch(setFocusedInput(item))}}
            />
          </View>
        );
      } else if (item.itemType === "skiaImage") {
        return (
          <View>
            <ShowSkiaImage
              source={item.itemFile}
              itemCount={item.itemCount}
              editMode={true}
            />
            <TextInput
              key={`textInput-${item.itemCount}`}
              onChangeText={(e) =>
                handleItemChange(item.itemCount, e, "skiaImage")
              }
              style={{
                fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
                fontFamily: item.itemFont ? item.itemFont : "SFPro11",
                textAlignVertical: "top",
                marginBottom: 10,
                color: item.itemFontColor ? item.itemFontColor : "#000000",
                textAlign:item?.itemTextAlign ? item?.itemTextAlign : "auto"
              }}
              placeholder="Write more here..."
              placeholderTextColor={"#9983C3"}
              multiline={true}
              value={item.itemContent}
              onFocus={()=>{dispatch(setFocusedInput(item))}}
            />
          </View>
        );
      } else if (item.itemType === "voiceRecording") {
        return (
          <View>
            <VoiceRecordingDisplay
              source={item.itemFile}
              itemCount={item.itemCount}
              editMode={true}
            />
            <TextInput
              key={`textInput-${item.itemCount}`}
              onChangeText={(e) =>
                handleItemChange(item.itemCount, e, "voiceRecording")
              }
              style={{
                fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
                fontFamily: item.itemFont ? item.itemFont : "SFPro11",
                textAlignVertical: "top",
                marginBottom: 10,
                color: item.itemFontColor ? item.itemFontColor : "#000000",
                textAlign:item?.itemTextAlign ? item?.itemTextAlign : "auto"
              }}
              placeholder="Write more here..."
              placeholderTextColor={"#9983C3"}
              multiline={true}
              value={item.itemContent}
              onFocus={()=>{dispatch(setFocusedInput(item))}}
            />
          </View>
        );
      } else if (item.itemType === "sticker") {
        return (
          <ShowSticker
            source={item.itemFile}
            itemCount={item.itemCount}
            editMode={true}
            id={item.itemId}
            position={item.position}
            scaleProp={item.scale}
            mode={"add"}
          />
        );
      } else {
        return null;
      }
    });
  };

  const saveDiaryToFile = async () => {
    try {
      const jsonString = JSON.stringify(newDiaryData);
      const fileUri =
        FileSystem.documentDirectory + `diary-${newDiaryData.id}.json`;

      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      dispatch(setNewDiaryData(null));
      router.back();
    } catch (error) {
      console.error("Error saving diary:", error);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: selectedTheme?.bodyBgColor },
      ]}
    >
      <ImageBackground
        style={styles.container}
        source={{ uri: newDiaryData?.background?.backgroundFile }}
        resizeMode="cover"
      >
        <ScrollView style={{ flex: 1 }}>
          <AddDiaryTop
            dayAndTimeDetails={newDiaryData?.CurrentDayDetails}
            saveDiaryToFile={saveDiaryToFile}
            mode="add"
          />
          <View
            style={{
              flexDirection: "column",
              paddingHorizontal: 20,
              marginTop: Platform.select({
                ios: 10,
                android: 20,
              }),
              gap: 10,
              flex: 1,
              height: height,
            }}
          >
            <TextInput
              onChangeText={handleTitleChange}
              style={{
                fontSize: Dimensions.get("window").height * 0.04,
                fontFamily: "SFProDisplay",
                textAlignVertical: "top",
              }}
              placeholder="Title"
              placeholderTextColor={"#9983C3"}
              multiline={false}
              value={newDiaryData?.title}
            />
            {renderDiaryContent()}
          </View>
        </ScrollView>
        <DiaryToolBar mode={"add"}/>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AddDiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 0,
      android: statusBarHeight,
    }),
    justifyContent: "space-between",
  },
});
