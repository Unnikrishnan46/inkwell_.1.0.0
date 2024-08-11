import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type Props = {
  callUndo: any;
  callRedo: any;
  previousRoute: string | any;
  callSaveFunction: any;
};

const CanvasScreenHeader = ({ callUndo, callRedo, previousRoute ,callSaveFunction}: Props) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          router.navigate(previousRoute);
        }}
        style={{
          borderRadius: 15,
          backgroundColor: "#60527A",
          height: 30,
          width: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="close" size={20} color={"white"} />
      </TouchableOpacity>
      <View style={styles.rightIconContainer}>
        <View style={styles.undoReduContainer}>
          <TouchableOpacity
            onPress={() => {
              callUndo();
            }}
          >
            <EvilIcons name="undo" size={40} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              callRedo();
            }}
          >
            <EvilIcons name="redo" size={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={callSaveFunction}>
          <Feather name="save" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CanvasScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  undoReduContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rightIconContainer: {
    flexDirection: "row",
    gap: 20,
  },
});
