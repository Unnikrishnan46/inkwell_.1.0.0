import { StyleSheet, View, FlatList, ViewToken } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import data, { OnboardingData } from "@/util/onBoardData";
import OnboardComponent from "@/components/onboardComponent";
import Pagination from "@/components/pagination";
import CustomButton from "@/components/customButton";
import { useDispatch, useSelector } from "react-redux";
import { setOnBoardScreenCompleted } from "@/redux/onBoardState";
import {
  router,
} from "expo-router";

const OnboardScreen = () => {
  const dispatch = useDispatch();
  const onBoardScreenCompleted = useSelector(
    (state: any) => state.onBoardState
  ).onBoardScreenCompleted;

  const storeBoardScreenData = async () => {
    try {
      const data = {
        onboardSeen: true,
      };
      await AsyncStorage.setItem("inkwellAppData", JSON.stringify(data));
      const reminderData = {
        hours:"10",
        minutes:"00",
        amOrPm:"PM"
    }
    await AsyncStorage.setItem("reminderTime",JSON.stringify(reminderData));
      dispatch(setOnBoardScreenCompleted(true));
      console.log("Data stored successfully");
    } catch (e) {
      console.error("Failed to save data", e);
    }
  };

  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);

  const flatlistIndex = useSharedValue(0);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  };

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const checkOnboardCompleted = async () => {
    try {
      const onBoardSeenData = await AsyncStorage.getItem("inkwellAppData");
      const parsedData =
        onBoardSeenData !== null ? JSON.parse(onBoardSeenData) : null;
      const onboardSeenStatus =
        parsedData !== null ? parsedData?.onboardSeen : null;
      if (onboardSeenStatus) {
        router.replace("/(app)/(tabs)/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (onBoardScreenCompleted) {
      checkOnboardCompleted();
    }
  }, [onBoardScreenCompleted]);

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlistRef}
        onScroll={onScroll}
        data={data}
        renderItem={({ item, index }) => {
          return <OnboardComponent item={item} index={index} x={x} />;
        }}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={data} x={x} />
        <CustomButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLength={data.length}
          x={x}
          storeBoardScreenData={storeBoardScreenData}
        />
      </View>
    </View>
  );
};

export default OnboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
