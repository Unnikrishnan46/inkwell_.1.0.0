import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View, PanResponder, Pressable, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Svg, {
  Circle,
  Rect,
  Path,
  Line,
  Image,
  G,
  Text as SvgText,
} from "react-native-svg";
import MoodBoardToolBar from "@/components/moodBoardToolBar";
import AddTextMoodModal from "@/components/addTextMoodModal";
import ShapeCustomizeMood from "@/components/shapeCustomizeMood";
import * as ImagePicker from "expo-image-picker";
import { Fontisto } from "@expo/vector-icons";
import SaveMoodBoardModal from "@/components/saveMoodBoardModal";
import { setIsSaveMoodBoardModalOpen } from "@/redux/modalState";

const height = Dimensions.get("window").height;

const AddMoodBoardScreen = () => {
  const selectedTool = useSelector(
    (state: any) => state.moodBoardState
  )?.selectedMoodToolData;
  const [shapes, setShapes] = useState<any[]>([]);
  const [currentShape, setCurrentShape] = useState<any>(null);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(
    null
  );
  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;

  const [text, setText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedShapeData, setSelectedShapeData] = useState<any>(null);
  const dispatch = useDispatch();

  const [initialTouch, setInitialTouch] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const textRef = useRef<any>(null);

  // Undo and redo stacks
  const [undoStack, setUndoStack] = useState<any[][]>([]);
  const [redoStack, setRedoStack] = useState<any[][]>([]);

  // Helper function to save the current state to the undo stack
  const saveToUndoStack = () => {
    setUndoStack([...undoStack, shapes]);
    setRedoStack([]); // Clear the redo stack whenever a new action is made
  };

  const handleStart = (evt: any) => {
    saveToUndoStack();

    const { locationX, locationY } = evt.nativeEvent;

    if (selectedTool === "circle") {
      setCurrentShape({
        type: "circle",
        x: locationX,
        y: locationY,
        r: 0,
        strokeColor: "#000000",
        fillColor: "none",
      });
    } else if (selectedTool === "rectangle") {
      setCurrentShape({
        type: "rectangle",
        x: locationX,
        y: locationY,
        width: 0,
        height: 0,
        strokeColor: "#000000",
        fillColor: "none",
      });
    } else if (selectedTool === "pencil") {
      setCurrentShape({
        type: "pencil",
        path: `M ${locationX} ${locationY}`,
        strokeColor: "#000000",
        fillColor: "none",
      });
    } else if (selectedTool === "line") {
      setCurrentShape({
        type: "line",
        x1: locationX,
        y1: locationY,
        x2: locationX,
        y2: locationY,
        strokeColor: "#000000",
        fillColor: "none",
      });
    }
  };

  const handleMove = (evt: any) => {
    const { locationX, locationY } = evt.nativeEvent;
    if (dragging && selectedShapeIndex !== null) {
      const dx = locationX - initialTouch.x;
      const dy = locationY - initialTouch.y;
      setShapes((prevShapes) =>
        prevShapes.map((shape, index) =>
          index === selectedShapeIndex
            ? shape.type === "line"
              ? {
                  ...shape,
                  x1: shape.x1 + dx,
                  y1: shape.y1 + dy,
                  x2: shape.x2 + dx,
                  y2: shape.y2 + dy,
                }
              : shape.type === "text"
              ? { ...shape, x: shape.x + dx, y: shape.y + dy }
              : { ...shape, x: shape.x + dx, y: shape.y + dy }
            : shape
        )
      );
      setInitialTouch({ x: locationX, y: locationY });
    } else if (currentShape) {
      if (currentShape.type === "circle") {
        const dx = locationX - currentShape.x;
        const dy = locationY - currentShape.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        setCurrentShape({ ...currentShape, r: radius });
      } else if (currentShape.type === "rectangle") {
        const width = locationX - currentShape.x;
        const height = locationY - currentShape.y;
        setCurrentShape({ ...currentShape, width, height });
      } else if (currentShape.type === "pencil") {
        setCurrentShape({
          ...currentShape,
          path: `${currentShape.path} L ${locationX} ${locationY}`,
        });
      } else if (currentShape.type === "line") {
        setCurrentShape({ ...currentShape, x2: locationX, y2: locationY });
      }
    }
  };

  const handleEnd = () => {
    if (currentShape && currentShape.type !== "text") {
      setShapes([...shapes, currentShape]);
      setCurrentShape(null);
    }
    setDragging(false);
  };

  const handlePressIn = (evt: any, index: any, shape: any) => {
    setSelectedShapeIndex(index);
    setInitialTouch({
      x: evt.nativeEvent.locationX,
      y: evt.nativeEvent.locationY,
    });
    setSelectedShapeData(shape);
    setDragging(true);
  };

  const handleSelectTextTool = () => {
    saveToUndoStack();
    setCurrentShape({
      type: "text",
      x: 144.72727966308594,
      y: 190.18182373046875,
      text: "",
      fontSize: "26",
    });
    setIsModalVisible(true);
  };

  const handleAddText = () => {
    saveToUndoStack();
    if (currentShape) {
      setShapes([...shapes, { ...currentShape, text }]);
      setText("");
      setIsModalVisible(false);
      setCurrentShape(null);
    }
  };

  const handleSelectedCircleSize = (
    selectedShapeIndex: any,
    newRadius: any
  ) => {
    saveToUndoStack();
    setShapes((prevShapes) =>
      prevShapes.map((shape, index) =>
        index === selectedShapeIndex && shape.type === "circle"
          ? { ...shape, r: newRadius }
          : shape
      )
    );
  };

  const handleSelectedRectangleSize = (
    selectedShapeIndex: any,
    newValue: any
  ) => {
    saveToUndoStack();
    setShapes((prevShapes) =>
      prevShapes.map((shape, index) =>
        index === selectedShapeIndex && shape.type === "rectangle"
          ? { ...shape, width: newValue, height: newValue }
          : shape
      )
    );
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const previousState = undoStack.pop();
      setRedoStack([...redoStack, shapes]);
      setShapes(previousState || []);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      setUndoStack([...undoStack, shapes]);
      setShapes(nextState || []);
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handleStart,
    onPanResponderMove: handleMove,
    onPanResponderRelease: handleEnd,
  });

  const pickImage = async () => {
    saveToUndoStack();
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setShapes([
        ...shapes,
        {
          type: "image",
          uri: result.assets[0].uri,
          x: 144.72727966308594,
          y: 190.18182373046875,
        },
      ]);
    }
  };

  const changeStrokeColor = (selectedIndex: any, hex: any) => {
    saveToUndoStack();
    setShapes((prevShapes) =>
      prevShapes.map((shape, index) =>
        index === selectedIndex ? { ...shape, strokeColor: hex } : shape
      )
    );
  };

  const changeFillColor = (selectedIndex: any, hex: any) => {
    saveToUndoStack();
    setShapes((prevShapes) =>
      prevShapes.map((shape, index) =>
        index === selectedIndex ? { ...shape, fillColor: hex } : shape
      )
    );
  };

  const changeFontFamily = (selectedIndex: any, fontFamily: any) => {
    saveToUndoStack();
    setShapes((prevShapes) =>
      prevShapes.map((shape, index) =>
        index === selectedIndex ? { ...shape, fontFamily: fontFamily } : shape
      )
    );
  };

  const handleTextSize = (selectedIndex: any, newValue: any) => {
    saveToUndoStack();
    setShapes((prevShapes) =>
      prevShapes.map((shape, index) =>
        index === selectedIndex && shape.type === "text"
          ? { ...shape, width: newValue, fontSize: newValue }
          : shape
      )
    );
  };

  const handleDeleteShape = (selectedIndex: number) => {
    saveToUndoStack();
    setShapes((prevShapes) =>
      prevShapes.filter((_, index) => index !== selectedIndex)
    );
  };

  return (
    <View style={[styles.container,{backgroundColor:selectedThemeData?.bodyBgColor}]}>
      <View style={styles.canvas}>
        <Svg style={{ flex: 1 }} {...panResponder.panHandlers}>
          {shapes.map((shape, index) => {
            if (shape.type === "circle") {
              return (
                <Circle
                  key={index}
                  cx={shape.x}
                  cy={shape.y}
                  r={shape.r}
                  stroke={
                    index === selectedShapeIndex ? "blue" : shape.strokeColor
                  }
                  strokeWidth="2"
                  fill={shape.fillColor ? shape.fillColor : "none"}
                  onPressIn={(evt) => handlePressIn(evt, index, shape)}
                />
              );
            } else if (shape.type === "rectangle") {
              return (
                <Rect
                  key={index}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  stroke={
                    index === selectedShapeIndex ? "blue" : shape.strokeColor
                  }
                  strokeWidth="2"
                  fill={shape.fillColor ? shape.fillColor : "none"}
                  onPressIn={(evt) => handlePressIn(evt, index, shape)}
                />
              );
            } else if (shape.type === "pencil") {
              return (
                <Path
                  key={index}
                  d={shape.path}
                  stroke={
                    index === selectedShapeIndex ? "blue" : shape.strokeColor
                  }
                  strokeWidth="2"
                  fill="none"
                  onPressIn={(evt) => handlePressIn(evt, index, shape)}
                />
              );
            } else if (shape.type === "line") {
              return (
                <Line
                  key={index}
                  x1={shape.x1}
                  y1={shape.y1}
                  x2={shape.x2}
                  y2={shape.y2}
                  stroke={shape.strokeColor}
                  strokeWidth="2"
                  fill="none"
                  onPressIn={(evt) => handlePressIn(evt, index, shape)}
                />
              );
            } else if (shape.type === "text") {
              return (
                <G key={index}>
                  <Rect
                    x={shape.x - shape.text.toString().length / 2}
                    y={shape.y - shape.fontSize}
                    width={(shape.fontSize * shape.text.toString().length) / 2}
                    height={shape.fontSize}
                    stroke={index === selectedShapeIndex ? "blue" : "none"}
                    strokeWidth="2"
                    fill="none"
                    onPressIn={(evt) => handlePressIn(evt, index, shape)}
                  />
                  <SvgText
                    ref={textRef}
                    key={index}
                    x={shape.x}
                    y={shape.y}
                    fontSize={shape.fontSize}
                    fontFamily={
                      shape.fontFamily ? shape.fontFamily : "SpaceMono"
                    }
                    fill={shape.fillColor ? shape.fillColor : "black"}
                    onPressIn={(evt) => handlePressIn(evt, index, shape)}
                  >
                    {shape.text}
                  </SvgText>
                </G>
              );
            } else if (shape.type === "image") {
              return (
                <G key={index}>
                  <Rect
                    x={shape.x}
                    y={shape.y}
                    width={100}
                    height={100}
                    stroke={index === selectedShapeIndex ? "blue" : "none"}
                    strokeWidth="2"
                    fill="none"
                  />
                  <Image
                    href={shape.uri}
                    width={100}
                    height={100}
                    x={shape.x}
                    y={shape.y}
                    onPressIn={(evt) => handlePressIn(evt, index, shape)}
                  />
                </G>
              );
            }
          })}
          {currentShape && currentShape.type === "circle" && (
            <Circle
              cx={currentShape.x}
              cy={currentShape.y}
              r={currentShape.r}
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          )}
          {currentShape && currentShape.type === "rectangle" && (
            <Rect
              x={currentShape.x}
              y={currentShape.y}
              width={currentShape.width}
              height={currentShape.height}
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          )}
          {currentShape && currentShape.type === "pencil" && (
            <Path
              d={currentShape.path}
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          )}
          {currentShape && currentShape.type === "line" && (
            <Line
              x1={currentShape.x1}
              y1={currentShape.y1}
              x2={currentShape.x2}
              y2={currentShape.y2}
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
          )}
        </Svg>
      </View>
      <MoodBoardToolBar
        handleSelectTextTool={handleSelectTextTool}
        pickImage={pickImage}
        setSelectedShapeIndex={setSelectedShapeIndex}
        setSelectedShapeData={setSelectedShapeData}
      />
      <View style={{flexDirection:"row",gap:20,position:"absolute",bottom:100}}>
        <Pressable onPress={undo}>
          <Fontisto name="undo" size={25}/>
        </Pressable>
        <Pressable onPress={redo}>
          <Fontisto name="redo" size={25}/>
        </Pressable>
        <Pressable onPress={()=>{dispatch(setIsSaveMoodBoardModalOpen(true))}}>
          <Fontisto name="save" size={25}/>
        </Pressable>
      </View>
      <AddTextMoodModal
        isModalVisible={isModalVisible}
        text={text}
        setText={setText}
        handleAddText={handleAddText}
        setIsModalVisible={setIsModalVisible}
      />

      {selectedShapeIndex !== null && selectedShapeData !== null && (
        <ShapeCustomizeMood
          selectedShapeIndex={selectedShapeIndex}
          selectedShapeData={selectedShapeData}
          handleSelectedCircleSize={handleSelectedCircleSize}
          changeStrokeColor={changeStrokeColor}
          changeFillColor={changeFillColor}
          handleSelectedRectangleSize={handleSelectedRectangleSize}
          changeFontFamily={changeFontFamily}
          handleTextSize={handleTextSize}
          handleDeleteShape={handleDeleteShape}
          setSelectedShapeIndex={setSelectedShapeIndex}
          setSelectedShapeData={setSelectedShapeData}
        />
      )}
      <SaveMoodBoardModal shapes={shapes}/>
    </View>
  );
};

export default AddMoodBoardScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  canvas: {
    height: height / 2,
    backgroundColor: "#FFFFFF",
    position: "absolute",
    top: "25%",
    left: "5%",
    right: "5%",
    alignSelf: "center",
    zIndex: -10,
    width: "90%",
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
});
