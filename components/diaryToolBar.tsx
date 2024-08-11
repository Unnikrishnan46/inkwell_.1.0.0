import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ThemeSVG from "./svgComponent/themeSVG";
import ImageSVG from "./svgComponent/imageSVG";
import MicSVG from "./svgComponent/micSVG";
import HeadphoneSVG from "./svgComponent/headphoneSVG";
import TextSVG from "./svgComponent/textSVG";
import StickerSVG from "./svgComponent/stickerSVG";
import HashtagSVG from "./svgComponent/hashtagSVG";
import PencilSVG from "./svgComponent/pencilSVG";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAddHashTagSheetOpen,
  setIsDiaryAddImageAndVideoSheetOpen,
  setIsDiaryBackgroundSheetOpen,
  setIsFontStyleSheetOpen,
  setIsStickersSheetOpen,
  setIsText2SpeechTabOpen,
} from "@/redux/sheetState";
import * as MediaLibrary from "expo-media-library";
import { setIsVoiceRecordModal, setPhotoAndVideoPermissionModal } from "@/redux/modalState";
import { router, useNavigation } from "expo-router";
import SpeechToText from "./speechTotext";

type Props = {
  mode:any;
};

const DiaryToolBar = ({mode}: Props) => {
  const sheetState = useSelector((state: any) => state.sheetState);
  const isText2SpeechTabOpen = useSelector(
    (state: any) => state.sheetState
  ).isText2SpeechTabOpen;
  const selectedTool = useSelector(
    (state: any) => state.toolBarState
  ).selectedTool;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const toggleBackgroundSheet = () => {
    if (sheetState?.isDiaryBackgroundSheetOpen) {
      sheetState?.diaryBackgroundSheetRef?.close();
      dispatch(setIsDiaryBackgroundSheetOpen(false));
    } else {
      sheetState?.diaryBackgroundSheetRef?.open();
      dispatch(setIsDiaryBackgroundSheetOpen(true));
    }
  };

  const toggleFontStyleSheet = () => {
    if (sheetState?.isFontStyleSheetOpen) {
      sheetState?.fontStyleSheetOpenRef?.hide();
      dispatch(setIsFontStyleSheetOpen(false));
    } else {
      sheetState?.fontStyleSheetOpenRef?.show();
      dispatch(setIsFontStyleSheetOpen(true));
    }
  };

  const toggleStickersSheet = () => {
    if (sheetState?.isStickersSheetOpen) {
      sheetState?.stickersSheetRef?.close();
      dispatch(setIsStickersSheetOpen(false));
    } else {
      sheetState?.stickersSheetRef?.open();
      dispatch(setIsStickersSheetOpen(true));
    }
  };

  const isAlbumPermissionGranted = async () => {
    const { status, canAskAgain } = await MediaLibrary.getPermissionsAsync();
    if (status === "granted") {
      return true;
    } else if (status === "denied" && !canAskAgain) {
      dispatch(setPhotoAndVideoPermissionModal(true));
    } else {
      const response = await MediaLibrary.requestPermissionsAsync(true);
      if (response.status === "granted") {
        return true;
      } else {
        return false;
      }
    }
  };

  const toggleAddImageAndVideoSheet = async () => {
    const isGranted = await isAlbumPermissionGranted();
    if (isGranted) {
      if (sheetState?.isDiaryAddImageAndVideoSheetOpen) {
        sheetState?.addImageAndVideoSheetRef?.close();
        dispatch(setIsDiaryAddImageAndVideoSheetOpen(false));
      } else {
        sheetState?.addImageAndVideoSheetRef?.open();
        dispatch(setIsDiaryAddImageAndVideoSheetOpen(true));
      }
    }
  };

  const handleCanvasClick = () => {
    router.navigate({
      pathname: "(screens)/canvasScreen",
      params: { previousRoute: "(tabs)/add_diary" },
    });
  };

  const handleText2SpeechPress = () => {
    dispatch(setIsText2SpeechTabOpen(!isText2SpeechTabOpen));
  };

  const toggleAddHashTagSheet = ()=>{
    if(sheetState?.isAddHashTagSheetOpen){
      sheetState?.addHashTagSheetRef?.hide();
      dispatch(setIsAddHashTagSheetOpen(false));
    }else{
      sheetState?.addHashTagSheetRef?.show();
      dispatch(setIsAddHashTagSheetOpen(true));
    }
  }

  const handleVoiceRecordBtnPress = ()=>{
    dispatch(setIsVoiceRecordModal(true));
  }

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            display: selectedTool === "canvasScreen" ? "none" : "flex",
            borderTopLeftRadius: isText2SpeechTabOpen ? 0 : 9,
            borderTopRightRadius: isText2SpeechTabOpen ? 0 : 9,
          },
        ]}
      >
        <SpeechToText mode={mode}/>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingHorizontal: 15,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: 50,
          }}
        >
          <TouchableOpacity onPress={toggleBackgroundSheet}>
            <ThemeSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleAddImageAndVideoSheet}>
            <ImageSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleText2SpeechPress}>
            <MicSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVoiceRecordBtnPress}>
            <HeadphoneSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFontStyleSheet}>
            <TextSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleStickersSheet}>
            <StickerSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCanvasClick}>
            <PencilSVG />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleAddHashTagSheet}>
            <HashtagSVG />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DiaryToolBar;

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 50,
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.1,
      android: 0.2,
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: Platform.select({
      ios: 5,
      android: 10,
    }),
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 9,
    alignSelf: "center",
    marginBottom: 10,
    flexDirection: "column",
    gap: 20,
  },
  
});
