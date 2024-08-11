import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import SettingsTabWithoutSwitch from "@/components/settingsTabWithoutSwitch";
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Menu = () => {
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  const menuData = [
    {
      name: "Premium",
      icon: <AntDesign name="export" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/premium",
    },
    {
      name: "Themes",
      icon: <Ionicons name="color-palette-outline" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/themesSelectionScreen",
    },
    {
      name: "Privacy",
      icon: <MaterialCommunityIcons name="shield-check-outline" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/privacyScreen",
    },
    {
      name: "Back Up & Restore",
      icon: <Feather name="download-cloud" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/backUpAndRestoreScreen",
    },
    {
      name: "Export",
      icon: <Feather name="printer" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/exportScreen",
    },
    {
      name: "Settings",
      icon: <Feather name="settings" size={Dimensions.get("window").height * 0.04} />,
      route: "(screens)/settings",
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: selectedThemeData?.bodyBgColor }}>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        {menuData?.map((item,index)=>(
          <SettingsTabWithoutSwitch
          key={index}
          title={item?.name}
          content=""
          icon={item?.icon}
          onPress={()=>{router.navigate(item?.route)}}
        />
        ))}
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({});
