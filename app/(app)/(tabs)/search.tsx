import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useDispatch, useSelector } from "react-redux";
import DiarySliced from "@/components/diarySliced";

const Search = () => {
  const [allDiaryDatas, setAllDiaryDatas] = useState<any>([]);
  const [filteredDiaries, setFilteredDiaries] = useState<any>([]);

  const searchQuery = useSelector(
    (state: any) => state.searchState
  ).searchQuery;
  console.log(searchQuery);
  
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
      setAllDiaryDatas(allDiaries);
    } catch (error) {
      console.error("Error loading all diaries:", error);
    }
  };

  useEffect(() => {
    loadAllDiaries();
  }, []);

  useEffect(() => {
    if(searchQuery !== ""){
    const filtered = allDiaryDatas.filter((diary: any) => {
      const { title, id, CurrentDayDetails } = diary;
      const date = `${CurrentDayDetails.year}-${CurrentDayDetails.month}-${CurrentDayDetails.day}`;
      const day = CurrentDayDetails.dayOfWeek.toLowerCase();
      const month = CurrentDayDetails.monthName.toLowerCase();
      const query = searchQuery.toLowerCase();
      return (
        title.toLowerCase().includes(query) ||
        id.toLowerCase().includes(query) ||
        date.includes(query) ||
        day.includes(query) ||
        month.includes(query)
      );
    });
    setFilteredDiaries(filtered);
  }else{
    setFilteredDiaries([]);
  }
  }, [searchQuery, allDiaryDatas]);

  return (
    <View style={styles.container}>
      {filteredDiaries.length === 0 ? (
        <View style={styles.noSearchContainer}>
          <MaterialCommunityIcons
            name="text-box-search-outline"
            color={"#E5DBFB"}
            size={50}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "300",
              color: "gray",
              flexShrink: 1,
            }}
          >
            Not every searcher can find but those who find are searchers
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredDiaries}
          renderItem={({ item }) => <DiarySliced data={item} mb={10} />}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 10 }}
        />
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EDFD",
    paddingHorizontal: 10,
  },
  noSearchContainer: {
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    marginTop: 20,
  },
});
