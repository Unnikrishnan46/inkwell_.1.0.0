import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CanvasScreenHeader from "@/components/canvasScreenHeader";
import CanvasHeaderTab from "@/components/canvasHeaderTab";
import SkiaCanvas from "@/components/skiaCanvas";
import CanvasBottomPart from "@/components/canvasBottomPart";
import { useLocalSearchParams } from "expo-router";

const statusBarHeight = StatusBar.currentHeight;
type Props = {};

interface SkiaCanvasRef {
  handleUndo: () => void;
  handleRedo: () => void;
  handleSaveImage: ()=> void;
}

const CanvasScreen = (props: Props) => {
  const {previousRoute} = useLocalSearchParams();  
  const selectedTheme = useSelector(
    (state: any) => state.themeState
  ).selectedThemeData;

  const skiaCanvasRef = useRef<SkiaCanvasRef>(null);

  const callUndo = () => {
    skiaCanvasRef.current?.handleUndo();
  };

  const callRedo = () => {
    skiaCanvasRef.current?.handleRedo();
  };

  const callSaveFunction = ()=>{
    skiaCanvasRef.current?.handleSaveImage();
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: selectedTheme?.bodyBgColor },
      ]}
    >
      <View style={{}}>
        <CanvasScreenHeader callUndo={callUndo} callRedo={callRedo} previousRoute={previousRoute} callSaveFunction={callSaveFunction}/>
        <CanvasHeaderTab />
        <SkiaCanvas ref={skiaCanvasRef}/>
      </View>
      <CanvasBottomPart/>
    </SafeAreaView>
  );
};

export default CanvasScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: Platform.select({
      ios: 0,
      android: statusBarHeight,
    }),
    justifyContent:"space-between"
  },
});
