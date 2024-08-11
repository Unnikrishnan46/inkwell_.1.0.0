import {
  Dimensions,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStrokeWidthSheetRef } from "@/redux/sheetState";
import Slider from "@react-native-community/slider";
import { Canvas, Circle, Path } from "@shopify/react-native-skia";
import { setStrokeWidth } from "@/redux/drawingToolsState";
import RBSheet from "react-native-raw-bottom-sheet";

type Props = {};

const StrokeWidthSheet = (props: Props) => {
  const strokeWidth = useSelector(
    (state: any) => state.drawingToolState
  ).strokeWidth;
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const refRBSheet = useRef(null) as any;

  React.useEffect(() => {
    dispatch(setStrokeWidthSheetRef(refRBSheet.current));
  }, [dispatch, refRBSheet]);

  const slideChange = (value: any) => {
    dispatch(setStrokeWidth(value));
  };

  const r = 30; // Radius of the circle
  const cx = width / 2; // Center x-coordinate of the circle

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
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Canvas
            style={{
              width: "100%",
              borderWidth: 1,
              height: 100,
              borderColor: "red",
              backgroundColor: "#F9F6EE",
            }}
          >
            <Circle
              style={"stroke"}
              strokeWidth={strokeWidth}
              cx={cx}
              cy={50}
              r={r}
              color="#e74c3c"
            />
          </Canvas>
        </View>
        <Slider
          style={{ width: "80%", height: 40, marginTop: 20 }}
          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          value={strokeWidth}
          onValueChange={(value) => {
            slideChange(value);
          }}
        />
      </View>
    </RBSheet>
  );
};

export default StrokeWidthSheet;

const styles = StyleSheet.create({});
