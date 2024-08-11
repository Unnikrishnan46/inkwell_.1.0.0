import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const CanvasHeaderTab = (props: Props) => {
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          console.log("please");
        }}
        style={{
          width: "50%",
          backgroundColor: selectedThemeData?.buttonBg,
          paddingHorizontal: 20,
          padding: 10,
          borderBottomLeftRadius: 10,
          borderTopLeftRadius: 10,
          borderWidth: 0.1,
          borderRightWidth: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: selectedThemeData?.buttonTextColor }}>Image</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled
        style={{
          width: "50%",
          backgroundColor: "white",
          paddingHorizontal: 20,
          padding: 10,
          borderBottomRightRadius: 10,
          borderTopRightRadius: 10,
          borderWidth: 0.1,
          borderLeftWidth: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Stickers</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CanvasHeaderTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "20%",
    marginTop: 15,
  },
});
