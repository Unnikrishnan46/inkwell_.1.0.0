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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDiaryTop from "@/components/addDiaryTop";
import DiaryToolBar from "@/components/diaryToolBar";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import ShowSkiaImage from "@/components/showSkiaImage";
import VoiceRecordingDisplay from "@/components/voiceRecordingDisplay";
import ShowSticker from "@/components/showSticker";
import { getCurrentDayDetails } from "@/util/utils";
import {
  setCurrentContentItemCount,
  setEditDiaryData,
} from "@/redux/curdDiaryState";
import uuid from "react-native-uuid";
import ImageDisplay from "@/components/imageDisplay";
import * as FileSystem from "expo-file-system";

const statusBarHeight = StatusBar.currentHeight;
const height = Dimensions.get("window").height;

const EditDiaryScreen = () => {
  const { id } = useLocalSearchParams() as any;
  const selectedTheme = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  navigation.canGoBack();
  const [dayAndTimeDetails, setDayAndTimeDetails] = useState({});

  const editDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.editDiaryData;
  const currentContentItemCount = useSelector(
    (state: any) => state.curdDiaryState
  )?.currentContentItemCount;

  const loadDiaryFromFile = async (diaryId: string) => {
    try {
      const fileUri = FileSystem.documentDirectory + `diary-${diaryId}.json`;
      const jsonString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const jsonData = JSON.parse(jsonString);
      // setData(jsonData);
      setDayAndTimeDetails(jsonData.CurrentDayDetails);
      dispatch(setEditDiaryData(jsonData));
    } catch (error) {
      console.error("Error loading diary:", error);
    }
  };

  
  useEffect(() => {
    loadDiaryFromFile(id);
  }, []);

  const handleTitleChange = (e: any) => {
    const currentData = editDiaryData;
    const updatedData = { ...currentData, title: e };
    dispatch(setEditDiaryData(updatedData));
  };

  const handleItemChange = (
    itemCount: number,
    newContent: string,
    itemType: string
  ) => {
    const currentData = editDiaryData;

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
    dispatch(setEditDiaryData(updatedData));

    // Check if an item was deleted and dispatch to update currentContentItemCount
    if (finalCount < initialCount) {
      dispatch(setCurrentContentItemCount(currentContentItemCount - 1));
    }
  };

  const renderDiaryContent = () => {
    return editDiaryData?.body.map((item: any) => {
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
                fontSize:item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
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
            mode={"edit"}
          />
        );
      } else {
        return null;
      }
    });
  };

  const saveDiaryToFile = async () => {
    try {
      const jsonString = JSON.stringify(editDiaryData);
      const fileUri =
        FileSystem.documentDirectory + `diary-${editDiaryData.id}.json`;

      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      dispatch(setEditDiaryData(null));
      router.navigate("(tabs)/home");
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
        source={{ uri: editDiaryData?.background?.backgroundFile }}
        resizeMode="cover"
      >
        <ScrollView style={{ flex: 1 }}>
          <AddDiaryTop
            dayAndTimeDetails={dayAndTimeDetails}
            saveDiaryToFile={saveDiaryToFile}
            mode="edit"
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
              value={editDiaryData?.title}
            />
            {renderDiaryContent()}
          </View>
        </ScrollView>
        <DiaryToolBar mode={"edit"}/>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EditDiaryScreen;

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
