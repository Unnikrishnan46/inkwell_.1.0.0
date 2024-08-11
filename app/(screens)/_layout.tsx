import { AntDesign } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, TouchableOpacity } from "react-native";

export default function ScreenEntry() {
  const themeState = useSelector((state: any) => state.themeState);
  const navigation = useNavigation();
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="premium"
        options={{
          headerShown: true,
          title: "Premium Membership",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="canvasScreen"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="privacyScreen"
        options={{
          headerShown: true,
          title: "Privacy",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="backUpAndRestoreScreen"
        options={{
          headerShown: true,
          title: "Back Up & Restore",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="exportScreen"
        options={{
          headerShown: true,
          title: "Export",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="passwordScreen"
        options={{
          headerShown: false,
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="guideScreen"
        options={{
          animation: "slide_from_right",
          headerShown: true,
          title: "Guided writting",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="themesSelectionScreen"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="editDiary"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="displayDiary"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="affirmationsScreen"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="inkeyChat"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="moodBoardScreen"
        options={{
          animation: "slide_from_right",
          headerShown: true,
          title: "Mood Board",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="addMoodBoardScreen"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="setPassword"
        options={{
          headerShown: false,
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="changePassword"
        options={{
          headerShown: false,
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="reminder"
        options={{
          headerShown: true,
          title: "Reminder",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="tagManagement"
        options={{
          headerShown: true,
          title: "Tag Management",
          headerTitleStyle: {
            color: themeState?.selectedThemeData?.topBarTitleColor,
            fontFamily: "mondayFeeling",
          },
          headerStyle: {
            backgroundColor: themeState?.selectedThemeData?.topBarBg,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.closeBtn}
            >
              <AntDesign name="close" size={20} color="white" />
            </TouchableOpacity>
          ),
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="displayMoodBoardScreen"
        options={{
          animation: "slide_from_right",
          headerShown: false,
        }}
      />
      
    </Stack>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    padding: 5,
    backgroundColor: "#60527A",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
