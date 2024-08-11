import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentContentItemCount,
  setNewDiaryData,
} from "@/redux/curdDiaryState";
import * as FileSystem from "expo-file-system";

type Props = {
  source: any;
  itemCount: any;
  editMode: any;
};

const VoiceRecordingDisplay = ({ source, itemCount, editMode }: Props) => {
  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState<any>(0);
  const [audio, setAudio] = useState<Audio.Sound>();

  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;

  async function loadAndPlayAudio() {
    const { sound, status } = await Audio.Sound.createAsync(
      { uri: source },
      { isLooping: false },
      onPlaybackStatusUpdate // Set the playback status update callback
    );
    if (status.isLoaded) {
      setAudio(sound);
      setDuration(status.durationMillis);
    }
  }

  useEffect(() => {
    loadAndPlayAudio();

    return () => {
      audio?.unloadAsync(); // Cleanup the audio when the component unmounts
    };
  }, []);

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  async function play() {
    try {
      await audio?.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async function pause() {
    try {
      await audio?.pauseAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0) as any;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const deleteItem = async () => {
    const currentData = newDiaryData;
  
    // Find the item to delete
    const itemToDelete = currentData.body.find(
      (item: any) => item.itemCount === itemCount
    );
  
    // Delete the audio file if it exists
    if (itemToDelete?.itemFile) {
      try {
        await FileSystem.deleteAsync(itemToDelete.itemFile);
        console.log("Audio file deleted successfully.");
      } catch (error) {
        console.error("Failed to delete audio file:", error);
      }
    }
  
    // Update the diary data by removing the item
    const updatedBody = currentData.body
      .map((item: any) => {
        if (item.itemCount === itemCount) {
          if (item.itemContent === "") {
            return null; // Mark item for deletion
          } else {
            return { ...item, itemType: "text", itemFile: undefined }; // Change itemType to 'text' and remove 'itemFile'
          }
        }
        return item;
      })
      .filter((item: any) => item !== null) // Remove items marked for deletion
      .map((item: any, index: any) => ({ ...item, itemCount: index + 1 })); // Update itemCount for remaining items
  
    const updatedData = { ...currentData, body: updatedBody };
    dispatch(setNewDiaryData(updatedData));
    dispatch(setCurrentContentItemCount(updatedBody.length));
  };

  return (
    <View style={styles.container} key={itemCount}>
      <View>
        {!isPlaying && (
          <Pressable onPress={play}>
            <FontAwesome6 name="play" size={25} color={"brown"} />
          </Pressable>
        )}
        {isPlaying && (
          <Pressable onPress={pause}>
            <FontAwesome6 name="pause" size={25} color={"brown"} />
          </Pressable>
        )}
      </View>
      <View style={{ width: "90%", alignItems: "flex-end" }}>
        <Slider
          style={{ width: "100%" }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={async (value) => {
            if (audio) {
              await audio.setPositionAsync(value);
            }
          }}
          minimumTrackTintColor="#df0d0d"
          maximumTrackTintColor="#000000"
        />
        <Text style={{ fontSize: 10 }}>{formatTime(position)}</Text>
      </View>
      <Pressable
        onPress={deleteItem}
        style={[styles.deleteBtn, { display: editMode ? "flex" : "none" }]}
      >
        <AntDesign name="close" size={15} color={"white"} />
      </Pressable>
    </View>
  );
};

export default VoiceRecordingDisplay;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 1,
  },
  deleteBtn: {
    position: "absolute",
    height: 25,
    width: 25,
    backgroundColor: "red",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    right: -10,
    top: -10,
  },
});
