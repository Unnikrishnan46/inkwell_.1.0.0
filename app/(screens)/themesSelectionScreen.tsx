import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Platform,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import ThemeSelectionDisplay from "@/components/themeSelectionDisplay";
import { router } from "expo-router";
import Carousel from "react-native-reanimated-carousel";
import ThemesDataList from "@/util/themeDataList";
import { setSelectedThemeData } from "@/redux/themeState";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};
const statusBarHeight = StatusBar.currentHeight;
const width = Dimensions.get("window").width;

const ThemesSelectionScreen = (props: Props) => {
  const [currentTheme, setCurrentTheme] = useState(ThemesDataList[0]);
  const dispatch = useDispatch();
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;

  console.log(selectedThemeData ,currentTheme);
  

  const handleSelectTheme = async () => {
    await AsyncStorage.setItem("theme", JSON.stringify(currentTheme));
    const theme = await AsyncStorage.getItem("theme");
    if (theme !== null) {
      console.log("Applied");
      dispatch(setSelectedThemeData(JSON.parse(theme)));
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: currentTheme?.topBarBg }]}
    >
      <ImageBackground
        resizeMode="cover"
        blurRadius={Platform.OS === "ios" ? 8 : 3}
        source={currentTheme?.image}
        style={styles.imageBg}
      >
        <View style={styles.themeHeader}>
          <TouchableOpacity
            onPress={() => {
              router.navigate("/(app)/(tabs)/home");
            }}
            style={styles.closeBtn}
          >
            <AntDesign name="close" size={20} color={"white"} />
          </TouchableOpacity>
          <Text style={styles.headingText}>
            How would you like to see your diary ?
          </Text>
        </View>
        <Carousel
          style={{ marginTop: 10 }}
          loop
          width={width}
          autoPlay={false}
          data={ThemesDataList}
          scrollAnimationDuration={500}
          renderItem={({ item }) => <ThemeSelectionDisplay item={item} />}
          onSnapToItem={(index) => setCurrentTheme(ThemesDataList[index])}
        />

        <TouchableOpacity
          style={[styles.SOTbtn, { backgroundColor: currentTheme.buttonBg }]}
          onPress={handleSelectTheme}
        >
          <Text
            style={{
              fontFamily: "jaldiRegular",
              fontSize: Dimensions.get("window").height * 0.02,
            }}
          >
            {selectedThemeData == currentTheme ? "APPLIED" : "APPLY"}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ThemesSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 0,
      android: statusBarHeight,
    }),
    justifyContent: "space-between",
  },
  imageBg: {
    flex: 1,
  },
  themeHeader: {},
  closeBtn: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#60527A",
    margin: 10,
    marginBottom: 0,
  },
  headingText: {
    fontFamily: "SFPro11",
    fontSize: Dimensions.get("window").height * 0.028,
    textAlign: "center",
  },
  SOTbtn: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height * 0.06,
    borderRadius: 14,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});
