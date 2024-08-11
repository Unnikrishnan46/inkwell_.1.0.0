import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

type Props = {
  isColorPickerOpen: any;
  setIsColorPickerOpen: any;
  setStrokeColor: any;
  setFillColor: any;
  onSelectStrokeColor:any;
  onSelectFillColor:any;
  isStrokeOrFill:any;
};

const ColorPickerMood = ({
  isColorPickerOpen,
  setIsColorPickerOpen,
  setStrokeColor,
  setFillColor,
  onSelectStrokeColor,
  onSelectFillColor,
  isStrokeOrFill
}: Props) => {
  const handleComplete = (color:any)=>{
    if(isStrokeOrFill === "stroke"){
      onSelectStrokeColor(color);
    }else if(isStrokeOrFill === "fill"){
      onSelectFillColor(color);
    }
  }
  return (
    <Modal visible={isColorPickerOpen} transparent={true} animationType="slide">
      <TouchableWithoutFeedback onPress={() => setIsColorPickerOpen(false)}>
        <View style={styles.modalOverlay}>
          <ColorPicker
            style={{ width: "90%" }}
            value="red"
            onComplete={(color)=>{handleComplete(color)}}
          >
            <Preview />
            <Panel1 />
            <HueSlider />
            <OpacitySlider />
            <Swatches />
          </ColorPicker>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ColorPickerMood;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
