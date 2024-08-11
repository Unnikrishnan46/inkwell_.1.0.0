import {
  BackHandler,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import EmotionSelectModal from "./emotionSelectModal";
import { useDispatch, useSelector } from "react-redux";
import { setIsSaveEditModalOpen, setIsSaveEntryModalOpen } from "@/redux/modalState";
import { setEditDiaryData, setNewDiaryData } from "@/redux/curdDiaryState";

type Props = {
  dayAndTimeDetails: any;
  saveDiaryToFile: any;
  mode: any;
};

const AddDiaryTop = ({ dayAndTimeDetails, saveDiaryToFile, mode }: Props) => {
  const router = useRouter();
  const [isEmotionModalOpen, setIsEmotionModalOpen] = useState<boolean>(false);
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;

  const editDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.editDiaryData;

  const dispatch = useDispatch();

  const openEmotionModal = () => {
    setIsEmotionModalOpen(true);
  };
  const closeEmotionModal = () => {
    setIsEmotionModalOpen(false);
  };

  const handleCloseBtnPress = () => {
    if (mode === "add") {
      if (
        newDiaryData.body.length > 1 ||
        newDiaryData.body[0].itemContent !== "" ||
        newDiaryData.title !== ""
      ) {
        console.log("condition worked");

        dispatch(setIsSaveEntryModalOpen(true));
      } else {
        dispatch(setNewDiaryData(null));
        router.navigate("(app)/(tabs)/home");
      }
    } else if (mode === "edit") {
      console.log("Edit condition worked");
      if (
        editDiaryData.body.length > 1 ||
        editDiaryData.body[0].itemContent !== "" ||
        editDiaryData.title !== ""
      ) {
        dispatch(setIsSaveEditModalOpen(true));
      } else {
        dispatch(setEditDiaryData(null));
        router.navigate("(app)/(tabs)/home");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        handleCloseBtnPress();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [newDiaryData])
  );

  return (
    <View>
      <View style={styles.topIconContainer}>
        <TouchableOpacity onPress={handleCloseBtnPress}>
          <EvilIcons name="close" size={Dimensions.get("window").height * 0.04} />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveDiaryToFile}>
          <Ionicons name="save-outline" size={Dimensions.get("window").height * 0.04} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 15,
        }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ fontFamily: "SFProDisplay", fontSize: Dimensions.get("window").height * 0.03 }}>
            {dayAndTimeDetails?.day} {dayAndTimeDetails?.monthName}{" "}
            {dayAndTimeDetails?.year}
          </Text>
          <Text style={{ fontFamily: "SFProDisplay", fontSize: Dimensions.get("window").height * 0.03 }}>
            {dayAndTimeDetails?.dayOfWeek} {dayAndTimeDetails?.hours}:
            {dayAndTimeDetails?.minutes} {dayAndTimeDetails?.ampm}
          </Text>
        </View>
        <Pressable onPress={openEmotionModal}>
          <Image
            style={{ height: Dimensions.get("window").height * 0.05, width: Dimensions.get("window").height * 0.05 }}
            source={newDiaryData?.moodData?.file}
          />
        </Pressable>
      </View>
      <View
        style={{
          marginTop: 20,
          height: 0.5,
          backgroundColor: "#BFA4F4",
          width: "80%",
          alignSelf: "center",
        }}
      />
      <EmotionSelectModal
        isEmotionModalOpen={isEmotionModalOpen}
        openEmotionModal={openEmotionModal}
        closeEmotionModal={closeEmotionModal}
        mode={mode}
      />
    </View>
  );
};

export default AddDiaryTop;

const styles = StyleSheet.create({
  topIconContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
