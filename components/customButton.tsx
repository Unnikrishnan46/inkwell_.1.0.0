import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Animated, {
  AnimatedRef,
  SharedValue,
  interpolateColor,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { OnboardingData } from "@/util/onBoardData";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  dataLength: number;
  flatlistIndex: SharedValue<number>;
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
  storeBoardScreenData:any;
};

const CustomButton = ({ dataLength, flatlistIndex, flatlistRef, x ,storeBoardScreenData}: Props) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(()=>{
    return {
        width:flatlistIndex.value === dataLength - 1 ?
        withSpring(140) : withSpring(60),
        height:60,
    }
  });


  const arrowAnimationStyle = useAnimatedStyle(()=>{
    return {
        width:30,
        height:30,
        opacity:flatlistIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
        transform:[
            {
                translateX:flatlistIndex.value === dataLength - 1 ?
                withTiming(100) : withTiming(0),
            }
        ]
    }
  });


  const textAnimationStyle = useAnimatedStyle(()=>{
    return {
        opacity:flatlistIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
        transform:[{
            translateX:flatlistIndex.value === dataLength - 1 ?
            withTiming(0) : withTiming(-100),
        }]
    }
  })

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      x.value,
      [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
      ["#005b4f", "#1e2169", "#f15937"]
    );
    return {
      backgroundColor: backgroundColor,
    };
  });
  return (
    <TouchableOpacity
      onPress={() => {
        if (flatlistIndex.value < dataLength - 1) {
          flatlistRef.current?.scrollToIndex({
            index: flatlistIndex.value + 1,
          });
        } else {
          storeBoardScreenData();
        }
      }}
    >
      <Animated.View style={[styles.container, animatedColor,buttonAnimationStyle]}>
        <Animated.Text style={[styles.textButton,textAnimationStyle]}>Get Started</Animated.Text>
        <Animated.Image
          style={[styles.arrow,arrowAnimationStyle]}
          source={{uri:"https://firebasestorage.googleapis.com/v0/b/chat-app-chatify.appspot.com/o/ArrowIcon.png?alt=media&token=a4e0bfc9-38b8-43c8-914e-63ed794806ea"}}
        />

      </Animated.View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: 60,
    height: 60,
  },
  arrow: {
    position: "absolute",
    width: 30,
    height: 30,
  },
  textButton:{
    color:"white",
    fontSize:16,
    position:'absolute',

  }
});
