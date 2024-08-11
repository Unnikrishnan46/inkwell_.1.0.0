import {
  Button,
  Dimensions,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import DisplayDiaryTop from "@/components/displayDiaryTop";
import VoiceRecordingDisplay from "@/components/voiceRecordingDisplay";
import ShowSkiaImage from "@/components/showSkiaImage";
import ImageDisplay from "@/components/imageDisplay";
import ShowSticker from "@/components/showSticker";
import { AntDesign } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

type Props = {};

const statusBarHeight = StatusBar.currentHeight;
const height = Dimensions.get("window").height;

const DisplayDiary = (props: Props) => {
  const [data, setData] = useState<any>({});
  const { id } = useLocalSearchParams() as any;

  const selectedTheme = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;

  useEffect(() => {
    loadDiaryFromFile(id);
  }, [id]);

  const loadDiaryFromFile = async (diaryId: string) => {
    try {
      const fileUri = FileSystem.documentDirectory + `diary-${diaryId}.json`;
      const jsonString = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const jsonData = JSON.parse(jsonString);
      setData(jsonData);
    } catch (error) {
      console.error("Error loading diary:", error);
    }
  };

  const renderDiaryContent = () => {
    return data?.body?.map((item: any) => {
      if (item.itemType === "text") {
        return (
          <View>
            {item.itemContent !== "" && (
              <TextInput
                key={item.itemCount}
                style={{
                  fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
                  fontFamily: item.itemFont ? item.itemFont : "SFPro11",
                  textAlignVertical: "top",
                  marginBottom: 10,
                  color: item.itemFontColor ? item.itemFontColor : "#000000",
                  textAlign: item?.itemTextAlign ? item?.itemTextAlign : "auto",
                }}
                placeholderTextColor={"#9983C3"}
                multiline={true}
                value={item.itemContent}
                readOnly={true}
              />
            )}
          </View>
        );
      } else if (item.itemType === "image") {
        return (
          <View key={item.itemCount} style={{ gap: 10 }}>
            <ImageDisplay
              source={item.itemFile}
              itemCount={item.itemCount}
              editMode={false}
            />
            {item.itemContent !== "" && (
              <TextInput
                key={`textInput-${item.itemCount}`}
                style={{
                  fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
                  fontFamily: item.itemFont ? item.itemFont : "SFPro11",
                  textAlignVertical: "top",
                  marginBottom: 10,
                  color: item.itemFontColor ? item.itemFontColor : "#000000",
                  textAlign: item?.itemTextAlign ? item?.itemTextAlign : "auto",
                }}
                placeholderTextColor={"#9983C3"}
                multiline={true}
                value={item.itemContent}
                readOnly={true}
              />
            )}
          </View>
        );
      } else if (item.itemType === "skiaImage") {
        return (
          <View>
            <ShowSkiaImage
              source={item.itemFile}
              itemCount={item.itemCount}
              editMode={false}
            />
            {item.itemContent !== "" && (
              <TextInput
                key={`textInput-${item.itemCount}`}
                style={{
                  fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
                  fontFamily: item.itemFont ? item.itemFont : "SFPro11",
                  textAlignVertical: "top",
                  marginBottom: 10,
                  color: item.itemFontColor ? item.itemFontColor : "#000000",
                  textAlign: item?.itemTextAlign ? item?.itemTextAlign : "auto",
                }}
                placeholderTextColor={"#9983C3"}
                multiline={true}
                value={item.itemContent}
                readOnly={true}
              />
            )}
          </View>
        );
      } else if (item.itemType === "voiceRecording") {
        return (
          <View>
            <VoiceRecordingDisplay
              source={item.itemFile}
              itemCount={item.itemCount}
              editMode={false}
            />
            {item.itemContent !== "" && (
              <TextInput
                key={`textInput-${item.itemCount}`}
                style={{
                  fontSize: item?.itemFontSize ? item?.itemFontSize : Dimensions.get("window").height * 0.03,
                  fontFamily: item.itemFont ? item.itemFont : "SFPro11",
                  textAlignVertical: "top",
                  marginBottom: 10,
                  color: item.itemFontColor ? item.itemFontColor : "#000000",
                  textAlign: item?.itemTextAlign ? item?.itemTextAlign : "auto",
                }}
                placeholderTextColor={"#9983C3"}
                multiline={true}
                value={item.itemContent}
                readOnly={true}
              />
            )}
          </View>
        );
      } else if (item.itemType === "sticker") {
        return (
          <ShowSticker
            source={item.itemFile}
            itemCount={item.itemCount}
            editMode={false}
            id={item.itemId}
            position={item.position}
            scaleProp={item.scale}
            mode={"display"}
          />
        );
      } else {
        return null;
      }
    });
  };

  const handleEditBtnPress = () => {
    router.navigate({ pathname: `/(screens)/editDiary`, params: { id: id } });
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
        source={{
          uri: data?.background?.backgroundImage
            ? data?.background?.backgroundFile
            : undefined,
        }}
        resizeMode="cover"
      >
        <ScrollView style={{ flex: 1, marginBottom: 10 }}>
          <DisplayDiaryTop
            dayAndTimeDetails={data?.CurrentDayDetails}
            data={data}
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
              style={{
                fontSize: 30,
                fontFamily: "SFProDisplay",
                textAlignVertical: "top",
                color: "#000000",
              }}
              placeholder="Title"
              placeholderTextColor={"#9983C3"}
              multiline={false}
              value={data?.title}
              readOnly={true}
            />
            {renderDiaryContent()}
          </View>
        </ScrollView>
        {/* <DiaryToolBar /> */}
        <Pressable onPress={handleEditBtnPress} style={styles.editBtn}>
          <AntDesign name="edit" size={25} color={"white"} />
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default DisplayDiary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 0,
      android: statusBarHeight,
    }),
    justifyContent: "space-between",
  },
  editBtn: {
    height: 45,
    width: 45,
    backgroundColor: "#8c43f3",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
