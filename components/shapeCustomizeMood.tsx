import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import ColorPickerMood from "./colorPickerMood";
import { EvilIcons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import MoodFontSheet from "./moodFontSheet";

type Props = {
  selectedShapeIndex: any;
  selectedShapeData: any;
  handleSelectedCircleSize: any;
  changeStrokeColor: any;
  changeFillColor: any;
  handleSelectedRectangleSize: any;
  changeFontFamily:any;
  handleTextSize:any;
  handleDeleteShape:any;
  setSelectedShapeIndex:any;
  setSelectedShapeData:any;
};

const ShapeCustomizeMood = ({
  selectedShapeIndex,
  selectedShapeData,
  handleSelectedCircleSize,
  changeStrokeColor,
  changeFillColor,
  handleSelectedRectangleSize,
  changeFontFamily,
  handleTextSize,
  handleDeleteShape,
  setSelectedShapeIndex,
  setSelectedShapeData
}: Props) => {
  const [sliderValue, setSliderValue] = useState<any>(0);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#FFFFFF");
  const [fillOrStroke, setFillOrStroke] = useState("");
  const  moodFontSheetRef = useSelector((state:any)=>state.sheetState)?.moodFontSheetRef;

  const handleSliderChange = (value: number) => {
    if (selectedShapeData.type === "circle") {
      setSliderValue(value);
      handleSelectedCircleSize(selectedShapeIndex, value); // Pass the current value instead of sliderValue
    }
    if (selectedShapeData.type === "rectangle") {
      setSliderValue(value);
      handleSelectedRectangleSize(selectedShapeIndex, value);
    }
    if (selectedShapeData.type === "text"){
      setSliderValue(value);
      handleTextSize(selectedShapeIndex, value);
    }
  };

  const onSelectStrokeColor = ({ hex }: any) => {
    changeStrokeColor(selectedShapeIndex, hex);
  };

  const onSelectFillColor = ({ hex }: any) => {
    changeFillColor(selectedShapeIndex, hex);
  };

  useEffect(() => {
    if (selectedShapeData.type === "circle") {
      setSliderValue(selectedShapeData.r);
    }
  }, [selectedShapeData]);

  const handleStrokePress = () => {
    setFillOrStroke("stroke");
    setIsColorPickerOpen(true);
  };

  const handleFillPress = () => {
    setFillOrStroke("fill");
    setIsColorPickerOpen(true);
  };

  const handleFontSheet = ()=>{
    moodFontSheetRef?.show();
  }

  const DeleteShape = ()=>{
    setSelectedShapeIndex(null);
    setSelectedShapeData(null);
    handleDeleteShape(selectedShapeIndex);
  }

  const renderMenu = () => {
    if (selectedShapeData.type === "circle") {
      return (
        <View style={styles.container}>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={200}
            value={sliderValue}
            minimumTrackTintColor="#efa6a6"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => {
              handleSliderChange(value);
            }}
          />
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Pressable
              onPress={handleStrokePress}
              style={[
                styles.stroke,
                { backgroundColor: selectedShapeData?.strokeColor },
              ]}
            />
            <Pressable
              onPress={handleFillPress}
              style={[
                styles.fill,
                {
                  backgroundColor:
                    selectedShapeData?.fillColor !== "none"
                      ? selectedShapeData?.fillColor
                      : "#ffffff",
                },
              ]}
            />
            <Pressable onPress={DeleteShape} style={styles.fill}>
              <EvilIcons name="trash" size={30}/>
            </Pressable>
          </View>
        </View>
      );
    } else if (selectedShapeData.type === "rectangle") {
      return (
        <View style={styles.container}>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={200}
            value={sliderValue}
            minimumTrackTintColor="#efa6a6"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => {
              handleSliderChange(value);
            }}
          />
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Pressable
              onPress={handleStrokePress}
              style={[
                styles.stroke,
                { backgroundColor: selectedShapeData?.strokeColor },
              ]}
            />
            <Pressable
              onPress={handleFillPress}
              style={[
                styles.fill,
                {
                  backgroundColor:
                    selectedShapeData?.fillColor !== "none"
                      ? selectedShapeData?.fillColor
                      : "#ffffff",
                },
              ]}
            />
            <Pressable onPress={DeleteShape} style={styles.fill}>
              <EvilIcons name="trash" size={30}/>
            </Pressable>
          </View>
        </View>
      );
    } else if (selectedShapeData.type === "text") {
      return (
        <View style={{flexDirection:"row",gap:20}}>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={200}
            value={sliderValue}
            minimumTrackTintColor="#efa6a6"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => {
              handleSliderChange(value);
            }}
          />
          <Pressable onPress={handleFontSheet}>
            <FontAwesome name="font" size={25} />
          </Pressable>
          <Pressable onPress={handleFillPress}>
            <MaterialIcons name="format-color-text" size={25} color={selectedShapeData?.fillColor}/>
          </Pressable>
          <Pressable onPress={DeleteShape} style={styles.fill}>
              <EvilIcons name="trash" size={30}/>
            </Pressable>
        </View>
      );
    }else if (selectedShapeData.type === "pencil") {
      return (
        <View style={{flexDirection:"row",gap:10}}>
          <Pressable
              onPress={handleStrokePress}
              style={[
                styles.fill,
                {
                  backgroundColor:
                    selectedShapeData?.strokeColor !== "none"
                      ? selectedShapeData?.strokeColor
                      : "#000000",
                },
              ]}
            />
          <Pressable onPress={DeleteShape} style={styles.fill}>
              <EvilIcons name="trash" size={30}/>
            </Pressable>
        </View>
      );
    }

  };

  return (
    <View style={styles.container}>
      {renderMenu()}
      <ColorPickerMood
        isColorPickerOpen={isColorPickerOpen}
        setIsColorPickerOpen={setIsColorPickerOpen}
        setStrokeColor={setStrokeColor}
        setFillColor={setFillColor}
        onSelectStrokeColor={onSelectStrokeColor}
        onSelectFillColor={onSelectFillColor}
        isStrokeOrFill={fillOrStroke}
      />
      <MoodFontSheet selectedShapeIndex={selectedShapeIndex} changeFontFamily={changeFontFamily}/>
    </View>
  );
};

export default ShapeCustomizeMood;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: "10%",
    gap: Dimensions.get("window").height * 0.04,
  },
  stroke: {
    height: 25,
    width: 25,
    borderRadius: 5,
  },
  fill: {
    height: 25,
    width: 25,
    borderRadius: 5,
  },
});
