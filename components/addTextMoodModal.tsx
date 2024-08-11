import { Button, Modal, StyleSheet, TextInput, View, TouchableWithoutFeedback, Text } from "react-native";
import React from "react";

type Props = {
  isModalVisible: boolean;
  text: any;
  setText: any;
  handleAddText: any;
  setIsModalVisible: any;
};

const AddTextMoodModal = ({ isModalVisible, text, setText, handleAddText, setIsModalVisible }: Props) => {
  return (
    <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={{textAlign:"left",fontWeight:"400",fontSize:20,fontFamily:"SFPro11"}}>Enter your text below</Text>
            <TextInput
              style={styles.textInput}
              value={text}
              onChangeText={setText}
              placeholder="Enter text"
            />
            <Button title="Add Text" onPress={handleAddText} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddTextMoodModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: "90%",
    gap:14
  },
  textInput: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
    width: "100%",
    borderRadius: 10,
  },
});
