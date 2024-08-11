import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { allEmotionMoods } from "@/util/moodList";
import { useDispatch, useSelector } from "react-redux";
import { setEditDiaryData, setNewDiaryData } from "@/redux/curdDiaryState";

type Props = {
  isEmotionModalOpen: boolean;
  openEmotionModal: () => void;
  closeEmotionModal: () => void;
  mode: any;
};

const EmotionSelectModal = ({
  isEmotionModalOpen,
  closeEmotionModal,
  mode
}: Props) => {
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;

  const editDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.editDiaryData;

  const selectedMood = newDiaryData?.moodData;
  const dispatch = useDispatch();

  const handleMoodPress = (mood: any) => {
    if (mode === "add") {
      const updatedDiaryData = {
        ...newDiaryData,
        moodData: mood,
      };
      dispatch(setNewDiaryData(updatedDiaryData));
      closeEmotionModal();
    }else if(mode === "edit"){
      const updatedDiaryData = {
        ...editDiaryData,
        moodData: mood,
      };
      dispatch(setEditDiaryData(updatedDiaryData));
      closeEmotionModal();
    }
  };

  return (
    <Modal visible={isEmotionModalOpen} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={closeEmotionModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {allEmotionMoods.map((item, index) => (
              <View key={index} style={styles.moodCategory}>
                <Text>{item.title}</Text>
                <View style={styles.moodRow}>
                  {item?.moodData.map((mood: any, index: number) => {
                    const isSelectedMood =
                      selectedMood && selectedMood.name === mood.name;
                    return (
                      <Pressable
                        onPress={() => {
                          handleMoodPress(mood);
                        }}
                        key={index}
                        style={[
                          styles.pressable,
                          isSelectedMood && styles.selectedPressable,
                        ]}
                      >
                        <Image style={styles.image} source={mood.file} />
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EmotionSelectModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "96%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  moodCategory: {
    marginBottom: 20,
  },
  moodRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  selectedPressable: {
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 8,
  },
  image: {
    height: Dimensions.get("window").height * 0.06,
    width: Dimensions.get("window").height * 0.06,
  },
});
