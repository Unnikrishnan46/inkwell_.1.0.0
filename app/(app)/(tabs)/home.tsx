import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SOTcard from "@/components/SOTcard";
import * as FileSystem from "expo-file-system";
import { setAllDiariesData } from "@/redux/curdDiaryState";
import DiarySliced from "@/components/diarySliced";
import HomeFab from "@/components/homeFab";
import { Portal } from "react-native-paper";

const height = Dimensions.get("window").height;

const HomeScreen = () => {
  const themeState = useSelector((state: any) => state.themeState);
  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;
  const allDiariesData = useSelector(
    (state: any) => state.curdDiaryState
  )?.allDiariesData;
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;
  const currentContentItemCount = useSelector(
    (state: any) => state.curdDiaryState
  )?.currentContentItemCount;

  const dispatch = useDispatch();
  const listAllDiaryFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory as string
      );
      const diaryFiles = files.filter((file) => file.endsWith(".json"));
      return diaryFiles;
    } catch (error) {
      console.error("Error listing diary files:", error);
      return [];
    }
  };

  const loadAllDiaries = async () => {
    try {
      const diaryFiles = await listAllDiaryFiles();
      const allDiaries = await Promise.all(
        diaryFiles.map(async (file) => {
          const fileUri = FileSystem.documentDirectory + file;
          const jsonString = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.UTF8,
          });
          return JSON.parse(jsonString);
        })
      );

      allDiaries.sort((a, b) => {
        const dateA = new Date(
          `${a.CurrentDayDetails.year}-${a.CurrentDayDetails.month}-${a.CurrentDayDetails.day}T${a.CurrentDayDetails.hours}:${a.CurrentDayDetails.minutes}`
        ) as any;
        const dateB = new Date(
          `${b.CurrentDayDetails.year}-${b.CurrentDayDetails.month}-${b.CurrentDayDetails.day}T${b.CurrentDayDetails.hours}:${b.CurrentDayDetails.minutes}`
        ) as any;
        return dateB - dateA;
      });

      dispatch(setAllDiariesData(allDiaries));
    } catch (error) {
      console.error("Error loading all diaries:", error);
    }
  };

  useEffect(() => {
    loadAllDiaries();
  }, [newDiaryData, currentContentItemCount]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeState?.selectedThemeData?.bodyBgColor },
      ]}
    >
      <Portal.Host>
        <View
          style={[
            styles.scrollViewContent,
            { backgroundColor: themeState?.selectedThemeData?.bodyBgColor },
          ]}
        >
          <View
            style={[
              styles.viewStyle,
              {
                backgroundColor: themeState?.selectedThemeData?.bodyBgColor,
                padding: allDiariesData.length < 0 ? 0 : 10,
                gap: 10,
                justifyContent:
                  allDiariesData.length < 0 ? "center" : "flex-start",
              },
            ]}
          >
            {allDiariesData.length > 0 ? (
              <FlatList
                style={{ width: "100%", height: "100%" }}
                data={allDiariesData}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <DiarySliced data={item} mb={5} />}
              />
            ) : (
              <View style={{height:"100%",justifyContent:"center"}}>
                <SOTcard />
              </View>
            )}
          </View>
        </View>
        <HomeFab />
      </Portal.Host>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
  },
  scrollViewContent: {
    flexGrow: 1,
    // height:height
  },
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noteBtn: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "violet",
    position: "absolute",
    bottom: 15,
    right: 10,
  },
});
