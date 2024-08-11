import { Dimensions, StyleSheet, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import SettingsTabWithSwitch from "@/components/settingsTabWithSwitch";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import SettingsTabWithoutSwitch from "@/components/settingsTabWithoutSwitch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddRecoveryPasswordOpen,
  setHasPassword,
  setIsBioMetricEnabled,
  setIsPasswordEnabled,
} from "@/redux/passwordState";
import * as LocalAuthentication from "expo-local-authentication";

type Props = {};

const PrivacyScreen = (props: Props) => {
  const { state } = useLocalSearchParams();
  const isPasswordEnabled = useSelector(
    (state: any) => state?.passwordState
  )?.isPasswordEnabled;
  const isBioMetricEnabled = useSelector(
    (state: any) => state?.passwordState
  )?.isBioMetricEnabled;
  const hasPassword = useSelector(
    (state: any) => state.passwordState
  )?.hasPassword;
  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPasswordStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("isPasswordEnabled");
        const password = await AsyncStorage.getItem("password");
        const biometricEnabled = await AsyncStorage.getItem(
          "isBiometricEnabled"
        );
        console.log(value, password, biometricEnabled);

        if (value !== null) {
          dispatch(setIsPasswordEnabled(JSON.parse(value)));
        }
        if (password !== null) {
          dispatch(setHasPassword(true));
        }
        if (biometricEnabled !== null) {
          dispatch(setIsBioMetricEnabled(JSON.parse(biometricEnabled)));
        }
      } catch (error) {
        console.error(
          "Error fetching password status from AsyncStorage",
          error
        );
      }
    };

    fetchPasswordStatus();
  }, [state]);

  const onEnablePasswordSwitchChange = async () => {
    try {
      if (!isPasswordEnabled && hasPassword) {
        await AsyncStorage.setItem(
          "isPasswordEnabled",
          JSON.stringify(!isPasswordEnabled)
        );
        dispatch(setIsPasswordEnabled(true));
      } else if (!isPasswordEnabled && !hasPassword) {
        router.navigate({ pathname: "(screens)/setPassword" });
      }else if(isPasswordEnabled && hasPassword){
        await AsyncStorage.setItem(
          "isPasswordEnabled",
          JSON.stringify(!isPasswordEnabled)
        );
        dispatch(setIsPasswordEnabled(false));
      }
    } catch (error) {
      console.error("Error saving password status to AsyncStorage", error);
    }
  };

  const handleChangePassword = () => {
    if(hasPassword){
      router.navigate({ pathname: "(screens)/changePassword" });
    }else{
      ToastAndroid.show("Enable password",3000);
    }
  };

  const handleRecoveryPasswordPress = () => {
    dispatch(setAddRecoveryPasswordOpen(true));
  };

  const handleBioMetricSwitch = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  
      if (hasHardware && isEnrolled) {
        await AsyncStorage.setItem(
          "isBiometricEnabled",
          JSON.stringify(!isBioMetricEnabled)
        );
        await AsyncStorage.setItem(
          "isPasswordEnabled",
          "false"
        );
        dispatch(setIsPasswordEnabled(false));
        dispatch(setIsBioMetricEnabled(!isBioMetricEnabled));
      } else {
        console.log("Biometric authentication is not available or not enrolled");
      }
    } catch (error) {
      console.error("Error handling biometric switch", error);
    }
  };
  

  return (
    <View style={[styles.container,{backgroundColor:selectedThemeData?.bodyBgColor}]}>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <SettingsTabWithSwitch
          title="Enable Password"
          content="Set your passcode"
          icon={<Ionicons name="key-outline" size={Dimensions.get("window").height * 0.04} />}
          onSwitchChange={onEnablePasswordSwitchChange}
          switchValue={isPasswordEnabled}
        />
        <SettingsTabWithoutSwitch
          title="Change Password"
          content="Change your password"
          icon={<SimpleLineIcons name="lock" size={Dimensions.get("window").height * 0.04} />}
          onPress={handleChangePassword}
        />
        <SettingsTabWithoutSwitch
          title="Set Recovery Question"
          content="Set your recovery question"
          icon={
            <MaterialCommunityIcons name="shield-check-outline" size={Dimensions.get("window").height * 0.04} />
          }
          onPress={handleRecoveryPasswordPress}
        />
        <SettingsTabWithSwitch
          title="Biometric Authentication"
          content="Use your biometric info to unlock diary"
          icon={<Ionicons name="finger-print" size={Dimensions.get("window").height * 0.04} />}
          onSwitchChange={handleBioMetricSwitch}
          switchValue={isBioMetricEnabled}
        />
      </View>
    </View>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
