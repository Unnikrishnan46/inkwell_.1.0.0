import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, getMonthAndYear } from "@/util/utils";
import DiarySliced from "@/components/diarySliced";
import { setCurrentSelectedMonth } from "@/redux/calendarState";
import * as FileSystem from "expo-file-system";

const CalendarScreen = () => {
  const [currentDay, setCurrentDay] = useState(formatDate(new Date()));
  const [selectedDay, setSelectedDay] = useState(formatDate(new Date()));
  const [currentDiary, setCurrentDiary] = useState<any>([]);
  const dispatch = useDispatch();
  const selectedTheme = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;

  const handleMonthChange = (date: DateData) => {
    dispatch(
      setCurrentSelectedMonth(getMonthAndYear(new Date(date.dateString)))
    );
  };

  const marked = {
    [selectedDay]: {
      marked: true,
      selected: true,
      selectedColor: selectedTheme?.calendarSelectedDayBG,
      selectedTextColor: "black",
      dotColor: "transparent",
    },
    [currentDay]: {
      selected: true,
      selectedColor: selectedTheme?.calendarCurrentBG,
      selectedTextColor: "#ffff",
    },
  };

  const handleDayPress = (date: DateData) => {
    setSelectedDay(date.dateString);
  };


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

      // Sort allDiaries by date extracted from the id
      allDiaries.sort((a, b) => {
        const dateA = new Date(a.id.split("-").pop()) as any;
        const dateB = new Date(b.id.split("-").pop()) as any;
        return dateB - dateA;
      });

      const filteredDiaries = allDiaries.filter((diary) =>
        diary.id.includes(selectedDay)
      );
      console.log(filteredDiaries);
      setCurrentDiary(filteredDiaries);
    } catch (error) {
      console.error("Error loading all diaries:", error);
    }
  };

  useEffect(() => {
    loadAllDiaries();
  }, [selectedDay]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: selectedTheme?.bodyBgColor },
      ]}
    >
      <Calendar

        hideArrows={true}
        hideExtraDays={true}
        theme={{
          calendarBackground: selectedTheme?.bodyBgColor,
          dayTextColor: selectedTheme?.addDiaryBtnBg,
          indicatorColor: 'blue',
        }}
        customHeaderTitle={<View></View>}
        onMonthChange={(date: any) => {
          handleMonthChange(date);
        }}
        markedDates={marked}
        enableSwipeMonths={true}
        onDayPress={(date: any) => {
          handleDayPress(date);
        }}
      />
      <ScrollView style={{ width: "100%", paddingHorizontal: 10,gap:10 ,flexDirection:"column"}}>
        {currentDiary?.map((diary: any, index: any) => (
          <DiarySliced data={diary} key={index} mb={1}/>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
