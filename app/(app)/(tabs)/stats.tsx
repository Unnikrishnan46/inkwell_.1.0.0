import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useCallback } from "react";
import DiaryDashboard from "@/components/diaryDashboard";
import MoodStaticsChart from "@/components/moodStaticsChart";
import MoodStaticPieChart from "@/components/moodStaticPieChart";
import BestDayInWeakGraph from "@/components/bestDayInWeakGraph";
import { useDispatch, useSelector } from "react-redux";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

const height = Dimensions.get("window").height;

const Stats = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    totalDiaries: 0,
    activeDays: 0,
    avgDiariesPerMonth: 0,
    longestStreak: 0,
    moodCounts: {
      happy: 0,
      neuter: 0,
      notBad: 0,
      casual: 0,
      sad: 0,
    },
  });
  const [diaries,setDiaries] = useState<any>([]);
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  useFocusEffect(
    useCallback(() => {
      loadAllDiaries();
    }, [])
  );

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
      setDiaries(allDiaries);
      calculateStats(allDiaries);
    } catch (error) {
      console.error("Error loading all diaries:", error);
    }
  };

  const calculateStats = (diaries: any) => {
    const totalDiaries = diaries.length;

    const dateMap = new Map();
    let longestStreak = 0;
    let currentStreak = 0;

    diaries.forEach((diary: any) => {
      const dateKey = `${diary.CurrentDayDetails.year}-${diary.CurrentDayDetails.month}-${diary.CurrentDayDetails.day}`;
      if (!dateMap.has(dateKey)) {
        dateMap.set(dateKey, true);
      }
    });

    const dates = Array.from(dateMap.keys()).sort();
    const firstDate = new Date(dates[0]);
    const lastDate = new Date(dates[dates.length - 1]);
    const months =
      (lastDate.getFullYear() - firstDate.getFullYear()) * 12 +
      (lastDate.getMonth() - firstDate.getMonth()) +
      1;

    let previousDate: any = null;
    dates.forEach((date, index) => {
      const currentDate = new Date(date) as any;
      if (previousDate) {
        const diffDays = Math.floor(
          (currentDate - previousDate) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          currentStreak += 1;
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
        } else {
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }
      previousDate = currentDate;
    });

    const activeDays = dateMap.size;
    const avgDiariesPerMonth = totalDiaries / months;
    const moodCounts = calculateMoodCounts(diaries);
    
    setStats({
      totalDiaries,
      activeDays,
      avgDiariesPerMonth,
      longestStreak,
      moodCounts,
    });
  };

  const calculateMoodCounts = (diaries: any) => {
    const moodCounts:any = {
      happy: 0,
      neuter: 0,
      notBad: 0,
      casual: 0,
      sad: 0,
    };

    diaries.forEach((diary: any) => {
      const mood = diary?.moodData?.emotion;
      console.log(mood);
      
      if (moodCounts[mood] !== undefined) {
        moodCounts[mood] += 1;
      }
    });

    return moodCounts;
  };

  return (
    <ScrollView style={styles.container}>
      {diaries?.length > 0 ? 
      <View style={{ padding: 10 }}>
        <DiaryDashboard stats={stats} />
        <Text style={styles.heading}>Mood Statistics All Time</Text>
        <MoodStaticsChart stats={stats}/>
        <Text style={styles.heading}>Mood Statistics All Time</Text>
        <MoodStaticPieChart stats={stats}/>
        <Text style={styles.heading}>Best day in a week</Text>
        <BestDayInWeakGraph diaries={diaries}/>
        <View style={styles.dailyStatic}>
          <Text>Daily Statistics</Text>
          <TouchableOpacity onPress={()=>{router.navigate("(screens)/premium")}} style={[styles.btn,{backgroundColor:selectedThemeData?.buttonBg}]}>
            <Text style={[styles.btnText,{color:selectedThemeData?.buttonTextColor}]}>Upgrade Premium</Text>
          </TouchableOpacity>
        </View>
      </View> : 
      <View style={{flex:1,justifyContent:"center",alignItems:"center",height:"100%",marginTop:50}}>
        <Image source={require("../../../assets/images/icons/empty.png")}/>
        <Text>NO ENTRIES</Text>
      </View> }
    </ScrollView>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dailyStatic: {
    padding: 20,
    backgroundColor: "#EDEADE",
    marginTop: 10,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.2,
      android: 0.56,
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    gap: 20,
  },
  btn: {
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
  },
  heading: {
    fontFamily: "SFPro9",
    fontSize: 20,
    // textAlign: "center",
    paddingVertical: 15,
    color: "#663EB4",
  },
});
