import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";

type Props = {};

const { height, width } = Dimensions.get("screen");

const AffirmationsScreen = (props: Props) => {
  const [newAffirmation, setNewAffirmation] = useState("");
  const [affirmations, setAffirmations] = useState<string[]>(["I am stronger, smarter."]);
  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;

  useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        const currentAffirmations = await AsyncStorage.getItem('affirmations');
        if (currentAffirmations) {
          setAffirmations(JSON.parse(currentAffirmations));
        }
      } catch (error) {
        console.error("Error fetching affirmations: ", error);
      }
    };

    fetchAffirmations();
  }, []);

  const handleAddAffirmation = async () => {
    if (newAffirmation.trim() === "") {
      return; // Do not add empty affirmations
    }
    try {
      const updatedAffirmations = [...affirmations, newAffirmation];
      await AsyncStorage.setItem('affirmations', JSON.stringify(updatedAffirmations));
      setAffirmations(updatedAffirmations);
      setNewAffirmation(""); // Clear the input field after adding
    } catch (error) {
      console.error("Error saving affirmation: ", error);
    }
  };

  const handleDeleteAffirmation = async (index: number) => {
    try {
      const updatedAffirmations = affirmations.filter((_, i) => i !== index);
      await AsyncStorage.setItem('affirmations', JSON.stringify(updatedAffirmations));
      setAffirmations(updatedAffirmations);
    } catch (error) {
      console.error("Error deleting affirmation: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        style={{
          height: height,
          justifyContent: "center",
          alignItems: "center",
        }}
        source={require("./../../assets/images/themes/theme0.png")}
      >
        <View style={{ marginTop: 120 }}>
          <Text style={{ fontFamily: "DancingScriptBold", fontSize: 50 }}>
            Self Affirmation
          </Text>
        </View>
        <ScrollView
          style={{ width: "100%", height: height, marginTop: 20 }}
          contentContainerStyle={{ justifyContent: "center", alignItems: "center", gap: 10 }}
        >
          {affirmations.map((item: string, index: number) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: selectedThemeData?.bodyBgColor,
                padding: 4,
                borderRadius: 10,
                width: "90%",
                gap: 10,
                paddingLeft: 20,
                paddingVertical: 8,
              }}
            >
              <Pressable onPress={() => handleDeleteAffirmation(index)}>
                <AntDesign name="close" size={25} color={selectedThemeData?.buttonBg}/>
              </Pressable>
              <TextInput
                style={{ width: "100%" }}
                textAlignVertical="center"
                value={item}
                editable={false}
                
              />
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: selectedThemeData?.bodyBgColor,
              padding: 4,
              borderRadius: 10,
              width: "90%",
              gap: 10,
              paddingLeft: 20,
              paddingVertical: 8,
            }}
          >
            <TextInput
              style={{ width: "85%" }}
              textAlignVertical="center"
              multiline
              placeholder="Add new here"
              value={newAffirmation}
              onChangeText={setNewAffirmation}
            />
            <Pressable style={[styles.addBtn,{backgroundColor:selectedThemeData?.buttonBg}]} onPress={handleAddAffirmation}>
              <AntDesign name="plus" size={20} />
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default AffirmationsScreen;

const styles = StyleSheet.create({
  container: {
    height: height,
    justifyContent: "center",
    flex: 1,
  },
  addBtn: {
    height: 30,
    width: 30,
    backgroundColor: "violet",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
});
