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
  import { router } from "expo-router";
  import * as FileSystem from "expo-file-system";
import { setIsSaveEditModalOpen } from "@/redux/modalState";
import { setEditDiaryData } from "@/redux/curdDiaryState";
  
  type Props = {};
  
  const SaveEditModal = (props: Props) => {
    const dispatch = useDispatch();
    const isSaveEditModalOpen = useSelector(
      (state: any) => state.modalState
    )?.isSaveEditModalOpen;
  
    const editDiaryData = useSelector(
      (state: any) => state.curdDiaryState
    )?.editDiaryData;
  
    const handleDiscard = () => {
      dispatch(setEditDiaryData(null));
      dispatch(setIsSaveEditModalOpen(false));
      router.navigate("(app)/(tabs)/home");
    };
  
    const saveDiaryToFile = async () => {
      try {
        const jsonString = JSON.stringify(editDiaryData);
        const fileUri =
          FileSystem.documentDirectory + `diary-${editDiaryData.id}.json`;
  
        await FileSystem.writeAsStringAsync(fileUri, jsonString, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        dispatch(setEditDiaryData(null));
        dispatch(setIsSaveEditModalOpen(false));
        router.navigate("(tabs)/home");
      } catch (error) {
        console.error("Error saving diary:", error);
      }
    };
  
    return (
      <Modal
        animationType="fade"
        visible={isSaveEditModalOpen}
        transparent={true}
      >
        <TouchableWithoutFeedback
          onPress={() => dispatch(setIsSaveEditModalOpen(false))}
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
  
  export default SaveEditModal;
  
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
  