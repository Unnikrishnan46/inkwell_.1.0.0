import { setUserInfoData } from "@/redux/userState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AppEntry() {
  const dispatch = useDispatch();
  const getUserData = async()=>{
    const userInfo = await AsyncStorage.getItem("userInfo");
    dispatch(setUserInfoData(userInfo));
  }
  useEffect(()=>{
    getUserData();
  },[]);
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
