import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSaveMoodBoardModalOpen } from "@/redux/modalState";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

type Props = {
  shapes: any;
};

const SaveMoodBoardModal = ({ shapes }: Props) => {
  const isSaveMoodBoardModalOpen = useSelector(
    (state: any) => state.modalState
  )?.isSaveMoodBoardModalOpen;
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleCancel = () => {
    setName("");
    dispatch(setIsSaveMoodBoardModalOpen(false));
  };

  const saveFile = async () => {
    if (name) {
      const folderName = "moodBoards";
      const fileName = `${name}_${Date.now()}.json`;
      const folderPath = `${FileSystem.documentDirectory}${folderName}`;
      const filePath = `${folderPath}/${fileName}`;

      // Check if the folder exists
      const folderExists = await FileSystem.getInfoAsync(folderPath);

      // If the folder doesn't exist, create it
      if (!folderExists.exists) {
        await FileSystem.makeDirectoryAsync(folderPath, {
          intermediates: true,
        });
      }

      // Save the shapes to a file in the moodBoards folder
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(shapes));
      console.log("Mood board saved successfully!");
      setName("");
      dispatch(setIsSaveMoodBoardModalOpen(false));
      router.back();
    } else {
      ToastAndroid.show("Enter a file name", 3000);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={isSaveMoodBoardModalOpen}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={handleCancel}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={{ gap: 15 }}>
              <Text style={{ fontWeight: "900", fontSize: 20 }}>
                Save the File ?
              </Text>
              <Text style={{ fontWeight: "400" }}>
                Save Your MoodBoard. Enter your MoodBoard Name Below
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#efeff6",
                  padding: 15,
                  borderRadius: 10,
                }}
                value={name}
                onChangeText={(e) => {
                  setName(e);
                }}
                placeholder="Enter the filename"
              />
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginTop: 50,
              }}
            >
              <Pressable onPress={handleCancel}>
                <Text style={{ fontWeight: "900" }}>CANCEL</Text>
              </Pressable>
              <Pressable onPress={saveFile}>
                <Text style={{ fontWeight: "900" }}>SAVE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SaveMoodBoardModal;

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
});
