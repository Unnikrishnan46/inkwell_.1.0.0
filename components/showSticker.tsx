import { setEditDiaryData, setNewDiaryData } from "@/redux/curdDiaryState";
import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { View, Animated, PanResponder, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  source: any;
  itemCount: any;
  editMode: any;
  id: any;
  position: any;
  scaleProp: any;
  mode: any;
};

const ShowSticker = ({
  source,
  itemCount,
  editMode,
  id,
  position,
  scaleProp,
  mode,
}: Props) => {
  const dispatch = useDispatch();

  // const newDiaryData = useSelector(
  //   (state: any) => state.curdDiaryState
  // )?.newDiaryData;
  const editDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.editDiaryData;

  const pan = useRef<any>(new Animated.ValueXY()).current;
  const scale = useRef<any>(new Animated.Value(1)).current;
  const lastScale = useRef(1);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => mode === "edit",
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        updateStickerData();
      },
    })
  ).current;

  const scaleResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => mode === "edit",
      onPanResponderMove: (e, gestureState) => {
        let scaleFactor =
          lastScale.current + gestureState.dy / 200 - gestureState.dx / 200;
        if (scaleFactor < 0.1) scaleFactor = 0.1; // Minimum scale
        scale.setValue(scaleFactor);
      },
      onPanResponderRelease: () => {
        scale.flattenOffset();
        lastScale.current = scale.__getValue(); // Save the last scale value
        updateStickerData();
      },
    })
  ).current;

  const updateStickerData = () => {
    const position = { x: pan.x._value, y: pan.y._value };
    const currentScale = scale.__getValue();
    const updatedBody = editDiaryData.body.map((item: any) =>
      item.itemId === id
        ? { ...item, type: "sticker", position, scale: currentScale }
        : item
    );
    dispatch(setEditDiaryData({ ...editDiaryData, body: updatedBody }));
    console.log("Sticker updated:", editDiaryData);
  };

  useEffect(() => {
    if (mode === "edit") {
      pan.setValue(position);
      scale.setValue(scaleProp);
    }
    if (mode !== "edit") {
      pan.setValue(position);
      scale.setValue(scaleProp);
    }
  }, [position, scaleProp]);

  return (
    <Animated.View
      style={[
        { position: "absolute" },
        styles.container,
        {borderWidth: mode !== "edit" ? 0 : 0.2},
        {borderWidth: mode !== "add" ? 0 : 0.2},
        pan.getLayout(),
        { transform: [{ scale: mode !== "edit" ? scaleProp : scale }] },
      ]}
    >
      <Animated.View {...(mode === "edit" ? panResponder.panHandlers : {})} style={[]}>
        <Image source={{ uri: source }} style={{ width: 100, height: 100 }} />
      </Animated.View>
      {editMode && (
        <View style={styles.altBtn}>
          <Animated.View {...(mode === "edit" ? scaleResponder.panHandlers : {})}>
            <AntDesign name="arrowsalt" size={15} />
          </Animated.View>
        </View>
      )}
    </Animated.View>
  );
};

export default ShowSticker;

const styles = StyleSheet.create({
  container: {  },
  altBtn: { position: "absolute", top: -8, right: -8, zIndex: 500000 },
});
