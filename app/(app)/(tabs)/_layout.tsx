import React from "react";
import { router, Tabs, useSegments } from "expo-router";
import { Platform, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setIsMenuBottomSheetOpen } from "@/redux/sheetState";
import SearchScreenHeader from "@/components/searchScreenHeader";
import StatsScreenHeader from "@/components/statsScreenHeader";

const TabLayout = () => {
  const themeState = useSelector((state: any) => state.themeState);
  const sheetState = useSelector((state: any) => state.sheetState);
  const selectedMonthAndYear = useSelector(
    (state: any) => state.calendarState
  ).currentSelectedMonth;
  const dispatch = useDispatch();

  const handleOpenPress = () => {
    sheetState.menuBottomSheetRef?.open();
    dispatch(setIsMenuBottomSheetOpen(true));
  };

  const handleClosePress = () => {
    sheetState.menuBottomSheetRef?.close();
    dispatch(setIsMenuBottomSheetOpen(false));
  };

  const toggleBottomSheet = () => {
    if (sheetState?.isMenuBottomSheetOpen) {
      handleClosePress();
    } else {
      handleOpenPress();
    }
  };

  const segment = useSegments();
  const currentRouteName = segment.at(-1);

  const isTabBarVisible = currentRouteName === "add_diary";

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: Platform.select({
            ios: 80,
            android: 72,
          }),
          elevation: 0,
          backgroundColor: themeState?.selectedThemeData?.bottonBarBg,
          alignItems: "center",
          justifyContent: "center",
          display: isTabBarVisible ? "none" : "flex",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          headerShown: true,
          href: null,
          title: "Inkwell",
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
            marginLeft: 10,
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                router.navigate("(screens)/premium");
              }}
            >
              <MaterialCommunityIcons
                style={{ marginRight: 15 }}
                name="crown-outline"
                size={30}
                color={themeState?.selectedThemeData?.topBarIconColor}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <Feather
                name={focused ? "align-left" : "align-left"}
                size={24}
                color={
                  focused
                    ? "#f02a4B"
                    : themeState?.selectedThemeData?.bottomBarIconColor
                }
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="menu"
        // listeners={{tabPress:(e)=>{
        //   // e.preventDefault();
        //   console.log(e);
        //   router.
        // }}}
        options={{
          headerShown: true,
          title: "Menu",
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerLeft: () => (
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                  }}
                >
                  <AntDesign
                    name="arrowleft"
                    size={25}
                    color={themeState?.selectedThemeData?.topBarIconColor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            // <TouchableOpacity
            //   onPress={(event) => {
            //     event.preventDefault();
            //     toggleBottomSheet();
            //   }}
            // >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather
                name={focused ? "align-left" : "align-left"}
                size={28}
                color={
                  focused
                    ? "#f02a4B"
                    : themeState?.selectedThemeData?.bottomBarIconColor
                }
              />
            </View>
            //  </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="stats"
        options={{
          headerShown: true,
          title: "Stats",
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerRight: () => (
            <TouchableOpacity>
              <MaterialCommunityIcons
                style={{ marginRight: 15 }}
                name="crown-outline"
                size={30}
                color={themeState?.selectedThemeData?.topBarIconColor}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Ionicons
                name={focused ? "stats-chart-outline" : "stats-chart-outline"}
                size={28}
                color={
                  focused
                    ? "#f02a4B"
                    : themeState?.selectedThemeData?.bottomBarIconColor
                }
              />
            </View>
          ),
          headerLeft: () => <StatsScreenHeader />,
        }}
      />

      <Tabs.Screen
        name="add_diary"
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                backgroundColor: themeState?.selectedThemeData?.addDiaryBtnBg,
                height: 60,
                width: 60,
                borderRadius: 50,
                flex: 0,
                justifyContent: "center",
                marginBottom: Platform.select({
                  ios: 45,
                  android: 65,
                }),
                borderColor: "white",
                borderWidth: 3,
              }}
            >
              <AntDesign
                name={focused ? "plus" : "plus"}
                size={28}
                color={
                  focused
                    ? "#f02a4B"
                    : themeState?.selectedThemeData?.addDiaryIconColor
                }
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: `${selectedMonthAndYear?.monthName}-${selectedMonthAndYear?.year}`,
          headerShown: true,
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "SFProDisplay",
            fontWeight: "bold",
            marginLeft: 10,
          },
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign
                name={focused ? "calendar" : "calendar"}
                color={
                  focused
                    ? "#f02a4B"
                    : themeState?.selectedThemeData?.bottomBarIconColor
                }
                size={28}
              />
            </View>
          ),
          headerLeft: () => <StatsScreenHeader />,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerTitleStyle: { display: "none" },
          headerLeft: () => <SearchScreenHeader />,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={focused ? "search" : "search-outline"}
                color={
                  focused
                    ? "#f02a4B"
                    : themeState?.selectedThemeData?.bottomBarIconColor
                }
                size={28}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
