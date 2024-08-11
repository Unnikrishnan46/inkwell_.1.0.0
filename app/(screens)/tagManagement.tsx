import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

type Props = {};

const TagManagement = (props: Props) => {
  const [allTags, setAllTags] = useState<any>([]);
  const [newTag, setNewTag] = useState("");
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  const getAllTags = async () => {
    const allTags = await AsyncStorage.getItem("allTags");
    if (allTags) {
      setAllTags(JSON.parse(allTags));
    }
  };

  const deleteTag = async (index: number) => {
    const updatedTags = allTags.filter((_: any, i: number) => i !== index);
    setAllTags(updatedTags);
    await AsyncStorage.setItem("allTags", JSON.stringify(updatedTags));
  };

  const handleAddTag = async () => {
    if (newTag.trim()) {
      const updatedTags = [...allTags, newTag];
      setAllTags(updatedTags);
      setNewTag("");
      await AsyncStorage.setItem("allTags", JSON.stringify(updatedTags));
      getAllTags();
    }
  };

  useEffect(() => {
    getAllTags();
  }, []);

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: selectedThemeData?.bodyBgColor },
      ]}
    >
      <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <TextInput
            value={newTag}
            onChangeText={setNewTag}
            onSubmitEditing={handleAddTag}
            style={styles.textInput}
            placeholder="Add new tags here"
          />
          <Pressable
          onPress={handleAddTag}
            style={[
              styles.addBtn,
              { backgroundColor: selectedThemeData?.buttonBg },
            ]}
          >
            <AntDesign
              name="plus"
              size={20}
              color={selectedThemeData?.buttonTextColor}
            />
          </Pressable>
        </View>
      <View style={styles.tagList}>
        {allTags?.map((tag: any, index: number) => (
          <View key={index} style={styles.tagContainer}>
            <Text style={styles.text}>{tag}</Text>
            <Pressable onPress={() => deleteTag(index)}>
              <AntDesign name="close" size={20} />
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TagManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop:20
  },
  tagContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "pink",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    gap: 7,
  },
  text: {
    fontSize: 16,
  },
  textInput: {
    width: "87%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  addBtn: {
    height: 40,
    width: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
