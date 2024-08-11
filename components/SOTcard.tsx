import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { router } from "expo-router";

const scaleFontSize = (baseSize: number, screenWidth: number) => {
  const scale = screenWidth / 375; // 375 is a common base width (iPhone 6/7/8)
  return Math.round(baseSize * scale);
};

const width = Dimensions.get("screen").width;

const SOTcard = () => {
  const themeState = useSelector((state: any) => state.themeState);
  return (
    <View style={styles.cardMain}>
      <View style={styles.imageDiv}>
          <Image
            style={styles.imageStyle}
            source={themeState?.selectedThemeData?.image}
          />
      </View>
      <View style={styles.cardSubMain}>
        <Text
          style={{
            fontFamily: "inkfree",
            fontSize: scaleFontSize(20, width),
            textAlign: "center",
            color: "black",
          }}
        >
          My diary is my best friend with ink of love i write myself into it
        </Text>
        <TouchableOpacity
        onPress={()=>{router.navigate("(screens)/themesSelectionScreen")}}
          style={[
            styles.SOTbtn,
            { backgroundColor: themeState?.selectedThemeData?.buttonBg },
          ]}
        >
          <Text style={{ fontFamily: "jaldiRegular", fontSize: 15 }}>
            SEE OTHER THEMES
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SOTcard;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardMain: {
    alignItems: "center",
    width: Dimensions.get("window").width * 0.8,
    // height: Dimensions.get("window").height / 2,
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    paddingBottom:20,
  },

  imageDiv: {
    width: "100%",
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  imageStyle: {
    width: "100%",
    height: Dimensions.get("screen").width * 0.5,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardSubMain: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
    gap: 20,
  },
  SOTbtn: {
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width - 100,
    height: 45,
    borderRadius: 14,
  },
});
