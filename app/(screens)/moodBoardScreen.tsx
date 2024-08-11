import { Dimensions, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";

type Props = {};

const width = Dimensions.get("window").width;

const MoodBoardScreen = (props: Props) => {
  const router = useRouter();
  const [allMoodBoards, setAllMoodBoards] = useState<any>([]);
  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;

  
  const getAllMoodBoards = async () => {
    try {
      const folderName = "moodBoards";
      const folderPath = `${FileSystem.documentDirectory}${folderName}`;

      // Check if the folder exists
      const folderExists = await FileSystem.getInfoAsync(folderPath);
      if (!folderExists.exists) {
        return [];
      }

      // Get all files in the folder
      const files = await FileSystem.readDirectoryAsync(folderPath);

      // Get file info for each file and sort by creation time
      const filesWithInfo = await Promise.all(
        files.map(async (file) => {
          const filePath = `${folderPath}/${file}`;
          const fileInfo = await FileSystem.getInfoAsync(filePath);
          return { name: file, path: filePath, ...fileInfo };
        })
      );

      // Sort files by modification time (newest first)
      const sortedFiles = filesWithInfo.sort(
        (a: any, b: any) => b.modificationTime - a.modificationTime
      );

      setAllMoodBoards(sortedFiles);
    } catch (error) {
      console.error("Error retrieving mood boards:", error);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      getAllMoodBoards();
    }, [])
  );

  const handleMoodBoardPress = (data: any) => {
    router.navigate({ pathname: "/(screens)/displayMoodBoardScreen", params: data });
  };

  const RenderItem = ({ data }: any) => {
    const prefix = data?.name.split('_')[0];
    return (
      <Pressable onPress={() => { handleMoodBoardPress(data) }} style={{ width: "100%", padding: 15, backgroundColor: "#FFFFFF", marginBottom: 10 }}>
        <View>
          <Text style={{ fontSize: 15, fontWeight: "400" }}>{prefix}</Text>
        </View>
      </Pressable>
    )
  };

  return (
    <SafeAreaView style={[styles.container,{backgroundColor:selectedThemeData?.bodyBgColor}]}>
      <FlatList data={allMoodBoards} renderItem={({ item }) => <RenderItem data={item} />} />
      <Pressable
        onPress={() => {
          router.navigate("(screens)/addMoodBoardScreen");
        }}
        style={[styles.addBtn,{backgroundColor:selectedThemeData?.buttonBg}]}
      >
        <AntDesign name="plus" size={25} color={selectedThemeData?.buttonTextColor}/>
      </Pressable>
    </SafeAreaView>
  );
};

export default MoodBoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fceeee",
    justifyContent: "center",
    padding: 15,
  },
  addBtn: {
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "violet",
  },
});
