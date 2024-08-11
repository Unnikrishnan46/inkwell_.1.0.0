import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSetReminderModalOpen } from "@/redux/reminderState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

type Props = {};

const SetReminderModal = (props: Props) => {
  const dispatch = useDispatch();
  const isSetReminderModalOpen = useSelector(
    (state: any) => state.reminderState
  )?.isSetReminderModalOpen;
  
  const [time, setTime] = useState<any>(null);
  const [hours, setHours] = useState<string>("");
  const [minutes, setMinutes] = useState<string>("");
  const [amOrPm, setAmOrPm] = useState<string>("AM");

  const getTimeData = async () => {
    const timeData = await AsyncStorage.getItem("reminderTime") as any;
    if (timeData) {
      const parsedTime = JSON.parse(timeData);
      setHours(parsedTime.hours);
      setMinutes(parsedTime.minutes);
      setAmOrPm(parsedTime.amOrPm);
    }
  };

  useEffect(() => {
    getTimeData();
  }, []);


  const scheduleDailyNotification = async (hours: any, minutes: any, amOrPm: any) => {
    const hours24 = amOrPm === 'PM' && hours !== '12' ? parseInt(hours) + 12 : parseInt(hours);
    const trigger = new Date();
    trigger.setHours(hours24);
    trigger.setMinutes(parseInt(minutes));
    trigger.setSeconds(0);

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Reminder',
        body: "It's time for your scheduled reminder!",
      },
      trigger: {
        hour: trigger.getHours(),
        minute: trigger.getMinutes(),
        repeats: true,
      },
    });
  };

  const handleOkPress = async () => {
    const data = { hours, minutes, amOrPm };
    await AsyncStorage.setItem('reminderTime', JSON.stringify(data));
    await scheduleDailyNotification(hours, minutes, amOrPm);
    dispatch(setIsSetReminderModalOpen(false));
  };

  const handleHoursChange = (text: string) => {
    if (/^\d{0,2}$/.test(text)) {
      setHours(text);
    }
  };

  const handleMinutesChange = (text: string) => {
    if (/^\d{0,2}$/.test(text)) {
      setMinutes(text);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={isSetReminderModalOpen}
      transparent={true}
    >
      <TouchableWithoutFeedback
        onPress={() => dispatch(setIsSetReminderModalOpen(false))}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View>
              <Text>SELECT TIME</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextInput
                style={styles.input}
                value={hours}
                onChangeText={handleHoursChange}
                keyboardType="numeric"
                maxLength={2}
                placeholder="HH"
              />
              <Text>:</Text>
              <TextInput
                style={styles.input}
                value={minutes}
                onChangeText={handleMinutesChange}
                keyboardType="numeric"
                maxLength={2}
                placeholder="MM"
              />
              <View style={styles.amPmContainer}>
                <Pressable
                  style={[
                    styles.amPmButton,
                    amOrPm === "AM" && styles.selectedAmPmButton,
                  ]}
                  onPress={() => setAmOrPm("AM")}
                >
                  <Text>AM</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.amPmButton,
                    amOrPm === "PM" && styles.selectedAmPmButton,
                  ]}
                  onPress={() => setAmOrPm("PM")}
                >
                  <Text>PM</Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => dispatch(setIsSetReminderModalOpen(false))}>
                <Text>CANCEL</Text>
              </Pressable>
              <Pressable onPress={handleOkPress}>
                <Text>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SetReminderModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "90%",
  },
  input: {
    backgroundColor: "#f2d2c9",
    height: 100,
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 40,
  },
  amPmContainer: {
    height: 100,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  amPmButton: {
    height: "49%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
    borderRadius: 5,
  },
  selectedAmPmButton: {
    backgroundColor: "lightcoral",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
  },
});
