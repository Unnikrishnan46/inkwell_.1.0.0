import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Providers from "@/redux/provider";
import MenuModal from "@/components/menuModal";
import DiaryBackgroundSheet from "@/components/diaryBackgroundSheet";
import AddImageAndVideoSheet from "@/components/addImageAndVideoSheet";
import RequestMediaPermission from "@/components/requestMediaPermission";
import StrokeWidthSheet from "@/components/strokeWidthSheet";
import FontStyleSheet from "@/components/fontStyleSheet";
import StickersSheet from "@/components/stickersSheet";
import AddHashTagSheet from "@/components/addHashTagSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PaperProvider } from "react-native-paper";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as LocalAuthentication from "expo-local-authentication";
import AddRecoveryPassword from "@/components/addRecoveryPassword";
import SetReminderModal from "@/components/setReminderModal";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/util/registerForPushNotificationsAsync";
import "../util/notificationTask";
import { registerBackgroundNotificationTask } from "../util/notificationTask";
import SaveEntryModal from "@/components/saveEntryModal";
import VoiceRecordModal from "@/components/voiceRecordModal";
import SaveEditModal from "@/components/saveEditModal";
import AskPremiumModal from "@/components/askPremiumModal";
import ThemesDataList from "@/util/themeDataList";
import ThemeInitializer from "@/components/ThemeInitializer";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: null,
};

SplashScreen.preventAutoHideAsync();

const BACKGROUND_FETCH_TASK = "background-fetch-task";

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const now = new Date();
    // Check if it's midnight
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      await AsyncStorage.removeItem("affirmations");
    }
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // Android only
    startOnBoot: true, // Android only
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    priority: Notifications.AndroidNotificationPriority.MAX,
  }),
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
    BeauRivage: require("../assets/fonts/BeauRivage-Regular.ttf"),
    AllanBold: require("../assets/fonts/Allan-Bold.ttf"),
    AllanRegular: require("../assets/fonts/Allan-Regular.ttf"),
    mondayFeeling: require("../assets/fonts/MondayFeelings-7BD2l.ttf"),
    inkfree: require("../assets/fonts/Inkfree.ttf"),
    jaldiBold: require("../assets/fonts/Jaldi-Bold.ttf"),
    jaldiRegular: require("../assets/fonts/Jaldi-Regular.ttf"),
    SFPro: require("../assets/fonts/SF-Pro.ttf"),
    SFProDisplay: require("../assets/fonts/SF-Pro.ttf"),
    BadScript: require("../assets/fonts/BadScript-Regular.ttf"),
    SFPro1: require("../assets/fonts/SFPro1.ttf"),
    SFPro2: require("../assets/fonts/SFPro2.ttf"),
    SFPro3: require("../assets/fonts/SFPro3.ttf"),
    SFPro4: require("../assets/fonts/SFPro4.ttf"),
    SFPro5: require("../assets/fonts/SFPro5.ttf"),
    SFPro6: require("../assets/fonts/SFPro6.ttf"),
    SFPro7: require("../assets/fonts/SFPro7.ttf"),
    SFPro8: require("../assets/fonts/SFPro8.ttf"),
    SFPro9: require("../assets/fonts/SFPro9.ttf"),
    SFPro10: require("../assets/fonts/SFPro10.ttf"),
    SFPro11: require("../assets/fonts/SFPro11.ttf"),
    SFPro12: require("../assets/fonts/SFPro12.ttf"),
    SFPro13: require("../assets/fonts/SFPro13.ttf"),
    SFPro14: require("../assets/fonts/SFPro14.ttf"),
    SFPro15: require("../assets/fonts/SFPro15.ttf"),
    SFPro16: require("../assets/fonts/SFPro16.ttf"),
    SFPro17: require("../assets/fonts/SFPro17.ttf"),
    SFPro18: require("../assets/fonts/SFPro18.ttf"),
    Belleson: require("../assets/fonts/Belleson.otf"),
    DancingScriptBold: require("../assets/fonts/DancingScript-Bold.ttf"),
    DancingScriptMedium: require("../assets/fonts/DancingScript-Medium.ttf"),
    DancingScriptRegular: require("../assets/fonts/DancingScript-Regular.ttf"),
    DancingScriptSemiBold: require("../assets/fonts/DancingScript-SemiBold.ttf"),
  });

  const [onBoardingChecked, setOnBoardingChecked] = useState(false);
  const [initialRoute, setInitialRoute] = useState("/(onboard)/onboard");
  const router = useRouter();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const onBoardSeenData = await AsyncStorage.getItem("inkwellAppData");
        const parsedData =
          onBoardSeenData !== null ? JSON.parse(onBoardSeenData) : null;
        const onboardSeenStatus =
          parsedData !== null ? parsedData?.onboardSeen : null;
        const isPasswordEnabled = await AsyncStorage.getItem(
          "isPasswordEnabled"
        );
        const biometricEnabled = await AsyncStorage.getItem(
          "isBiometricEnabled"
        );

        // Fetch the theme from AsyncStorage
        const storedTheme = await AsyncStorage.getItem("theme");
        const initialTheme = storedTheme
          ? JSON.parse(storedTheme)
          : ThemesDataList[0];

        if (isPasswordEnabled !== null && isPasswordEnabled !== "false") {
          setInitialRoute("/(screens)/passwordScreen");
        } else if (biometricEnabled === "true") {
          const result = await LocalAuthentication.authenticateAsync();
          if (result.success) {
            setInitialRoute("/(app)/(tabs)/home");
          } else {
            setInitialRoute("/(onboard)/onboard");
          }
        } else if (!onboardSeenStatus) {
          setInitialRoute("/(onboard)/onboard");
        } else {
          setInitialRoute("/(app)/(tabs)/home");
        }
      } catch (error) {
        console.error("Failed to load onboarding status:", error);
      } finally {
        setOnBoardingChecked(true);
      }
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && onBoardingChecked) {
      router.replace(initialRoute);
      SplashScreen.hideAsync();
    }
  }, [loaded, onBoardingChecked, initialRoute]);

  if (!loaded || !onBoardingChecked) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  useEffect(() => {
    registerBackgroundFetchAsync();
    return () => {
      unregisterBackgroundFetchAsync();
    };
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync();
    registerBackgroundNotificationTask();
  }, []);

  return (
    <Providers>
      <ThemeInitializer>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboard)" options={{ headerShown: false }} />
        </Stack>
        <DiaryBackgroundSheet />
        <AddImageAndVideoSheet />
        <RequestMediaPermission />
        <StrokeWidthSheet />
        <FontStyleSheet />
        <StickersSheet />
        <AddHashTagSheet />
        <AddRecoveryPassword />
        <SetReminderModal />
        <SaveEntryModal />
        <VoiceRecordModal />
        <SaveEditModal />
        <AskPremiumModal />
      </PaperProvider>
      </ThemeInitializer>
    </Providers>
  );
}
