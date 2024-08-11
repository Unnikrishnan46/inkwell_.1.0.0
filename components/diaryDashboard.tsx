import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

type Props = {
  stats:any;
};

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const DiaryDashboard = ({stats}: Props) => {
  
  const dataArray = [
    { title: "Total Diaries", data: stats?.totalDiaries ,bgColor:"#D2BFF7"},
    { title: "Active Days", data: stats?.activeDays,bgColor:"#F9EEAD" },
    { title: "Avg Entries/Month", data: stats?.avgDiariesPerMonth,bgColor:"#CAECEE" },
    { title: "Longest Streak", data: stats?.longestStreak,bgColor:"#FEDEB5" },
  ];

  return (
    <View style={styles.container}>
      {dataArray?.map((item, index) => (
        <TouchableOpacity style={[styles.subContainer,{backgroundColor:item?.bgColor}]} key={index}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.data}>{item.data}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default DiaryDashboard;

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
    flexWrap: "wrap",
    rowGap:10,
    columnGap:10,
    justifyContent:"center"
  },
  subContainer:{
    width:width/2 - 15,
    padding:20,
    backgroundColor:"#FFF5EE",
    gap:10,
    borderRadius:10,
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios:0.2,
      android:0.56
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  title:{
    fontFamily: "SFPro9",
    fontSize: 14,
    textAlign: "center",
    color: "#663EB4",
  },
  data:{
    fontFamily: "SFPro9",
    fontSize: 20,
    textAlign: "center",
    color: "#663EB4",
  }
});
