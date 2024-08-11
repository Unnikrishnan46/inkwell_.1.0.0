import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";

type Props = {};

const StatsScreenHeader = (props: Props) => {
  const themeState = useSelector((state: any) => state.themeState);
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={()=>{router.back()}}>
          <AntDesign name="arrowleft" size={25} color={themeState?.selectedThemeData?.topBarIconColor}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StatsScreenHeader;

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingLeft:20,
  },
  container:{
    flexDirection:"row"
  }
});
