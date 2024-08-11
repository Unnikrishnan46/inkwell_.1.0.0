import {
  Dimensions,
  Linking,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsVoiceRecordModal } from "@/redux/modalState";
import {
  AntDesign,
  EvilIcons,
  FontAwesome6,
  MaterialIcons,
} from "@expo/vector-icons";
import { Audio } from "expo-av";
import { setCurrentContentItemCount, setNewDiaryData } from "@/redux/curdDiaryState";
import * as FileSystem from "expo-file-system";

type Props = {};

const height = Dimensions.get("window").height;

const VoiceRecordModal = (props: Props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
  const isVoiceRecordModal = useSelector(
    (state: any) => state.modalState
  ).isVoiceRecordModal;
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setIsVoiceRecordModal(false));
    // router.back();
  };

  const [recording, setRecording] = useState<any>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;
  const currentContentItemCount = useSelector(
    (state: any) => state.curdDiaryState
  )?.currentContentItemCount;

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings();
    }
  };

  const getAudioPermission = async () => {
    try {
      if (permissionResponse?.status !== "granted") {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
    } catch (error) {
      ToastAndroid.show("Something went wrong", 3000);
    }
  };

  async function startRecording() {
    try {
      if (permissionResponse?.status === "granted") {
        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
        setIsRecording(true);
        setRecording(recording);
        const id = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
        setIntervalId(id);
      } else if (permissionResponse?.canAskAgain == false) {
        openAppSettings();
      } else {
        await getAudioPermission();
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log("Recording stopped and stored at", uri);
  
    // Create audio folder if it doesn't exist
    const audioFolder = `${FileSystem.documentDirectory}audio`;
    const folderInfo = await FileSystem.getInfoAsync(audioFolder);
    if (!folderInfo.exists) {
      await FileSystem.makeDirectoryAsync(audioFolder, { intermediates: true });
    }
  
    // Move the recording to the audio folder
    const fileName = `recording_${Date.now()}.m4a`;
    const newUri = `${audioFolder}/${fileName}`;
    await FileSystem.moveAsync({
      from: uri,
      to: newUri,
    });
  
    setIsRecording(false);
    if (intervalId) {
      clearInterval(intervalId as any);
      setIntervalId(null);
    }
    setTimer(0);
    
    handleAddFile(newUri); // Pass the new URI
    handleCloseModal();
  }

  const handleAddFile = (uri:any) => {
    if (uri) {
      const currentData = newDiaryData;
      const newItem = {
        itemCount: currentContentItemCount + 1,
        itemType: "voiceRecording",
        itemFile: uri,
        itemContent:""
      };
      const updatedData = {
        ...currentData,
        body: [...currentData.body, newItem],
      };
      dispatch(setNewDiaryData(updatedData));
      dispatch(setCurrentContentItemCount(currentContentItemCount + 1));
    }
  };

  const pauseRecording = async () => {
    if (recording && !isPaused) {
      await recording.pauseAsync();
      setIsPaused(true);
      if (intervalId) {
        clearInterval(intervalId as any);
        setIntervalId(null);
      }
    }
  };

  const resumeRecording = async () => {
    if (recording && isPaused) {
      await recording.startAsync();
      setIsPaused(false);
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const deleteRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      setRecording(undefined);
      setIsRecording(false);
      setIsPaused(false);
      handleCloseModal()
      if (intervalId) {
        clearInterval(intervalId as any);
        setIntervalId(null);
      }
      setTimer(0);
      
    }
  };

  useEffect(() => {
    getAudioPermission();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Modal
      visible={isVoiceRecordModal}
      style={styles.container}
      onRequestClose={handleCloseModal}
    >
      <View
        style={{
          backgroundColor: "gray",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!isRecording && (
          <View style={styles.startRecordContainer}>
            <Text style={styles.startRecordText}>Tap to start recording</Text>
            <Pressable onPress={startRecording} style={styles.recordBtn}>
              <MaterialIcons name="keyboard-voice" size={35} color={"white"} />
            </Pressable>
          </View>
        )}

        {isRecording && (
          <View style={styles.recordTime}>
            <Text style={styles.timeText}>Recording Time</Text>
            <Text style={styles.timer}>{formatTime(timer)}</Text>
          </View>
        )}
        {isRecording && (
          <View style={styles.startedRocordContainer}>
            <Pressable onPress={deleteRecording}>
              <EvilIcons name="trash" size={35} color={"white"} />
            </Pressable>
            {isPaused && (
              <Pressable onPress={resumeRecording} style={styles.recordBtn}>
              <FontAwesome6 name="play" size={35} color={"white"} />
            </Pressable>
            )}
            {!isPaused && (
              <Pressable onPress={pauseRecording} style={styles.recordBtn}>
              <FontAwesome6 name="pause" size={35} color={"white"} />
            </Pressable>
            )}
            <Pressable onPress={stopRecording}>
              <AntDesign name="check" size={35} color={"white"} />
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default VoiceRecordModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvas: {
    backgroundColor: "white",
    height: height / 3,
    width: "90%",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 3,
    alignSelf: "center",
  },
  recordBtn: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    height: Dimensions.get("window").height * 0.12,
    width: Dimensions.get("window").height * 0.12,
  },
  startRecordText: {
    fontFamily: "SFPro11",
    color: "white",
    fontSize: 18,
  },
  startRecordContainer: {
    position: "absolute",
    alignItems: "center",
    gap: 10,
    bottom: 50,
  },
  recordTime: {
    alignItems: "center",
    textAlign: "center",
    position: "absolute",
    top: 80,
  },
  startedRocordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    paddingHorizontal: 50,
  },
  timeText: {
    fontFamily: "SFPro11",
    color: "white",
    fontSize: 18,
  },
  timer: {
    fontFamily: "SFPro11",
    color: "white",
    fontSize: 38,
  },
});
