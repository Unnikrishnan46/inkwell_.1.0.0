import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsSaveEntryModalOpen } from "@/redux/modalState";
import { setNewDiaryData } from "@/redux/curdDiaryState";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";

type Props = {};

const SaveEntryModal = (props: Props) => {
  const dispatch = useDispatch();
  const isSaveEntryModalOpen = useSelector(
    (state: any) => state.modalState
  )?.isSaveEntryModalOpen;

  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;

  const handleDiscard = () => {
    dispatch(setNewDiaryData(null));
    dispatch(setIsSaveEntryModalOpen(false));
    router.navigate("(app)/(tabs)/home");
  };

  const saveDiaryToFile = async () => {
    try {
      const jsonString = JSON.stringify(newDiaryData);
      const fileUri =
        FileSystem.documentDirectory + `diary-${newDiaryData.id}.json`;

      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      dispatch(setNewDiaryData(null));
      dispatch(setIsSaveEntryModalOpen(false));
      router.navigate("(tabs)/home");
    } catch (error) {
      console.error("Error saving diary:", error);
    }
  };

  return (
    <Modal
      animationType="fade"
      visible={isSaveEntryModalOpen}
      transparent={true}
    >
      <TouchableWithoutFeedback
        onPress={() => dispatch(setIsSaveEntryModalOpen(false))}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={{}}>
              <Text style={{ fontWeight: "900" }}>Save the Entry ?</Text>
              <Text style={{ fontWeight: "400" }}>
                Your entry is not saved . Do you want to save changes?
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "flex-end",
                flexDirection: "row",
                alignItems: "center",
                gap:10
              }}
            >
              <Pressable onPress={handleDiscard}>
                <Text style={{ fontWeight: "900" }}>DISCARD CHANGES</Text>
              </Pressable>
              <Pressable onPress={saveDiaryToFile}>
                <Text style={{ fontWeight: "900" }}>SAVE</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SaveEntryModal;

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
