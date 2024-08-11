import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhotoAndVideoPermissionModal } from "@/redux/modalState";
import * as MediaLibrary from "expo-media-library";

type Props = {};

const RequestMediaPermission = (props: Props) => {
  
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: any) => state.modalState
  ).photoAndVideoPermissionModal;

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const goToAppPermissions = async() => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status === "denied") {
      openAppSettings();
    }else if(status === "granted"){
      dispatch(setPhotoAndVideoPermissionModal(!isModalOpen));
    }
    
  };

  return (
    <Modal visible={isModalOpen} animationType="fade" transparent={true} >
      <View style={[styles.container,{backgroundColor: 'rgba(0,0,0,0.5)'}]}>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            gap: 20,
          }}
        >
          <Text
            style={{ fontFamily: "SFPro", fontSize: 30, fontWeight: "bold" }}
          >
            Want to add pictures and videos
          </Text>
          <Text style={{ fontFamily: "SFPro", fontSize: 16, color: "gray" }}>
            Turn on Media Access for the Starbucks app to add photo and video
            uploads, personalized content, and quicker sharing options.
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
                dispatch(setPhotoAndVideoPermissionModal(!isModalOpen));
              }}
              style={{
                borderRadius: 50,
                padding: 10,
                borderColor: "#663EB4",
                borderWidth: 0.2,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ color: "#663EB4" }}>Not now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToAppPermissions}
              style={{
                borderRadius: 50,
                padding: 10,
                backgroundColor: "#663EB4",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 20,
              }}
            >
              <Text style={{ color: "white" }}>Turn on</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestMediaPermission;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Platform.select({
      ios: 20,
      android: 10,
    }),
  },
});
