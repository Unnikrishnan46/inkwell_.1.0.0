import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setDiaryBackgroundSheetRef,
  setIsDiaryBackgroundSheetOpen,
} from "@/redux/sheetState";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from 'expo-image-picker';
import { setDiaryBackgroundImage } from "@/redux/toolBarState";
import { setNewDiaryData } from "@/redux/curdDiaryState";

type Props = {};

const DiaryBackgroundSheet = (props: Props) => {
  const selectedTheme = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;
  const sheetState = useSelector((state: any) => state.sheetState);
  const refRBSheet = useRef(null) as any;
  const dispatch = useDispatch();
  const [image, setImage] = useState<any>(null);
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;

  React.useEffect(() => {
    dispatch(setDiaryBackgroundSheetRef(refRBSheet.current));
  }, [dispatch, refRBSheet]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // dispatch(setDiaryBackgroundImage(result.assets[0].uri));
      changeBackground(result.assets[0].uri);
      sheetState?.diaryBackgroundSheetRef?.close();
      dispatch(setIsDiaryBackgroundSheetOpen(false));
    }
  };

  const changeBackground = (file: any) => {
    const currentData = newDiaryData;
    const updatedData = {
      ...currentData,
      background: {
        ...currentData.background,
        backgroundImage: true,
        backgroundFile: file,
      },
    };
    dispatch(setNewDiaryData(updatedData));
  };

  return (
    <RBSheet
      ref={refRBSheet}
      height={Dimensions.get("window").height / 2}
      customStyles={{
        container: {
          backgroundColor: "#fff",
        },
        wrapper: {
          backgroundColor: "#00000036",
        },
        draggableIcon: {
          backgroundColor: "#000",
        },
      }}
      customModalProps={{
        animationType: "none",
        statusBarTranslucent: true,
        
      }}
      customAvoidingViewProps={{
        enabled: false,
      }}
      draggable={true}
      onClose={()=>{dispatch(setIsDiaryBackgroundSheetOpen(false))}}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 50,
        }}
      >
        <TouchableOpacity
        onPress={pickImage}
          style={[styles.btn, { backgroundColor: selectedTheme?.buttonBg }]}
        >
          <Text style={{ fontFamily: "SFProDisplay", fontSize:Dimensions.get("window").height * 0.03 }}>
            Image from gallery
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default DiaryBackgroundSheet;

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 50,
    paddingVertical: Dimensions.get("window").height * 0.03,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});
