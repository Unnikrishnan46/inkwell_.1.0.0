import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsAskPremiumModalOpen } from "@/redux/modalState";
import { router } from "expo-router";
import { setIsFontStyleSheetOpen, setIsStickersSheetOpen } from "@/redux/sheetState";

type Props = {};

const AskPremiumModal = (props: Props) => {
  const isAskPremiumModalOpen = useSelector(
    (state: any) => state.modalState
  )?.isAskPremiumModalOpen;
  const dispatch = useDispatch();
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  const stickersSheetRef = useSelector((state:any)=>state.sheetState)?.stickersSheetRef;

  return (
    <Modal
      animationType="fade"
      visible={isAskPremiumModalOpen}
      transparent={true}
    >
      <TouchableWithoutFeedback
        onPress={() => dispatch(setIsAskPremiumModalOpen(false))}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={[{ backgroundColor: "rgba(0,0,0,0.5)" }]}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                  gap: 20,
                }}
              >
                <Text
                  style={{
                    fontFamily: "SFPro",
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  Unlock Premium Features
                </Text>
                <Text
                  style={{ fontFamily: "SFPro", fontSize: 16, color: "gray" }}
                >
                  Gain exclusive access to advanced tools, personalized
                  experiences, and enhanced content. Elevate your app experience
                  with premium benefits designed just for you.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setIsAskPremiumModalOpen(false));
                    }}
                    style={{
                      borderRadius: 50,
                      padding: 10,
                      borderColor: selectedThemeData?.buttonBg,
                      borderWidth: 0.2,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={{ color: selectedThemeData?.buttonBg }}>
                      Not now
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setIsAskPremiumModalOpen(false));
                      dispatch(setIsFontStyleSheetOpen(false));
                      stickersSheetRef?.close();
                      router.navigate("(screens)/premium");
                    }}
                    style={{
                      borderRadius: 50,
                      padding: 10,
                      backgroundColor: selectedThemeData?.buttonBg,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={{ color: selectedThemeData?.buttonTextColor }}>
                      Upgrade now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AskPremiumModal;

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
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 10,
    }),
  },
});
