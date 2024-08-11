import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddImageAndVideoSheetRef,
  setIsDiaryAddImageAndVideoSheetOpen,
} from "@/redux/sheetState";
import ImageSVG from "./svgComponent/imageFileSVG";
import VideoSVG from "./svgComponent/videoSVG";
import { Ionicons } from "@expo/vector-icons";
import ImageGrid from "./ImageGrid";
import * as MediaLibrary from "expo-media-library";
import RBSheet from "react-native-raw-bottom-sheet";
import { setImageState } from "@/redux/toolBarState";
import { setCurrentContentItemCount, setNewDiaryData } from "@/redux/curdDiaryState";

type Props = {};

const AddImageAndVideoSheet = (props: Props) => {
  const selectedTheme = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;
  const sheetState = useSelector((state: any) => state.sheetState);
  const isDiaryAddImageAndVideoSheetOpen = useSelector(
    (state: any) => state.sheetState
  ).isDiaryAddImageAndVideoSheetOpen;
  const [images, setImages] = useState<any>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const dispatch = useDispatch();
  const refRBSheet = useRef(null) as any;
  const currentContentItemCount = useSelector(
    (state: any) => state.curdDiaryState
  )?.currentContentItemCount;
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;
  const selectedImageOrVideoIcon = useSelector((state:any)=>state.iconState)?.selectedImageOrVideoIcon;

  const handleSetSelectedFile = (file: any) => {
    setSelectedFile(file);
  };

  async function getAllImageFiles() {
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }
    const { assets } = await MediaLibrary.getAssetsAsync({
      mediaType: selectedImageOrVideoIcon === "image" ? "photo" : "video",
      first:50
    });
    setImages(assets);
  }

  const handleAddFile = () => {
    if (selectedFile) {
      const currentData = newDiaryData;
      const newItem = {
        itemCount: currentContentItemCount + 1,
        itemType: "image",
        itemFile: selectedFile.uri,
        itemContent:""
      };
      const updatedData = {
        ...currentData,
        body: [...currentData.body, newItem],
      };
      dispatch(setNewDiaryData(updatedData));
      dispatch(setImageState(selectedFile));
      dispatch(setCurrentContentItemCount(currentContentItemCount + 1));
      sheetState?.addImageAndVideoSheetRef?.close();
      dispatch(setIsDiaryAddImageAndVideoSheetOpen(false));
    }
  };

  useEffect(() => {
    if (isDiaryAddImageAndVideoSheetOpen) {
      getAllImageFiles();
    }
  }, [isDiaryAddImageAndVideoSheetOpen,selectedImageOrVideoIcon]);

  React.useEffect(() => {
    dispatch(setAddImageAndVideoSheetRef(refRBSheet.current));
  }, [dispatch, refRBSheet]);

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
      onClose={() => {
        dispatch(setIsDiaryAddImageAndVideoSheetOpen(false));
      }}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", gap: 15 }}>
            <ImageSVG />
            <VideoSVG />
          </View>
          <TouchableOpacity onPress={handleAddFile} style={styles.addBtn}>
            <Ionicons name="add" size={25} color={"#36454F"} />
          </TouchableOpacity>
        </View>
        <View style={styles.seperator} />
        <ImageGrid
          images={images}
          handleSetSelectedFile={handleSetSelectedFile}
          selectedFile={selectedFile}
          isVideo={selectedImageOrVideoIcon === "video"}
        />
        
      </View>
    </RBSheet>
  );
};

export default AddImageAndVideoSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  addBtn: {
    backgroundColor: "#f5a1f6",
    borderRadius: 50,
    padding: 5,
  },
  seperator: {
    backgroundColor: "#f5a1f6",
    height: 0.5,
    marginTop: 20,
  },
});
