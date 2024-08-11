import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import SettingsTabWithSwitch from "@/components/settingsTabWithSwitch";
import {
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import SettingsTabWithoutSwitch from "@/components/settingsTabWithoutSwitch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setIsReminderEnabled, setIsSetReminderModalOpen } from "@/redux/reminderState";

type Props = {};

const Reminder = (props: Props) => {
  const dispatch = useDispatch();
  const isReminderEnabled = useSelector(
    (state: any) => state.reminderState
  )?.isReminderEnabled;

  const getReminderData = async () => {
    const asyncRiminderData = (await AsyncStorage.getItem(
      "isReminderEnabled"
    )) as any;
    dispatch(setIsReminderEnabled(JSON.parse(asyncRiminderData)));
  };

  const handleEnableSwitchChange = async (value: any) => {
    await AsyncStorage.setItem("isReminderEnabled", JSON.stringify(value));
    dispatch(setIsReminderEnabled(JSON.parse(value)));
  };

  const handleSetReminderPress = () => {
    dispatch(setIsSetReminderModalOpen(true));
  };

  useEffect(() => {
    getReminderData();
  }, []);
  return (
    <View style={styles.container}>
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
          title="Enable Reminder"
          content="Recieve a notification in your desired time"
          icon={<SimpleLineIcons name="bell" size={25} />}
          onSwitchChange={handleEnableSwitchChange}
          switchValue={isReminderEnabled}
        />

        <SettingsTabWithoutSwitch
          title="Set Reminder Time"
          content="Set a diary lock to keep your diary private"
          icon={<Ionicons name="alarm-outline" size={30} />}
          onPress={handleSetReminderPress}
        />
      </View>
    </View>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EDFD",
  },
});
