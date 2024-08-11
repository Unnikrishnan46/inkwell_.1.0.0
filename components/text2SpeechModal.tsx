import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Text2SpeechModal = (props: Props) => {
  const isText2SpeechModalOpen = useSelector(
    (state: any) => state.modalState
  ).isText2SpeechModalOpen;
  return (
    <Modal
      animationType="slide"
      visible={isText2SpeechModalOpen}
      transparent={true}
    >
      <View style={{flex:1,backgroundColor:"gray",justifyContent:"flex-end"}}>
        <View style={{backgroundColor:"white"}}>
            <Text>Text2SpeechModal</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Text2SpeechModal;

const styles = StyleSheet.create({});
