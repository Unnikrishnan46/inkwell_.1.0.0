import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

type Props = {};

const height = Dimensions.get("window").height;

const PasswordScreen = (props: Props) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const router = useRouter();

  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  const handleChange = (value: any, index: any) => {
    const newPin = [...pin];
    if (value.length === 1) {
      newPin[index] = value;
      setPin(newPin);
      if (index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length === 0 && index > 0) {
      newPin[index] = "";
      setPin(newPin);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: any) => {
    if (e.nativeEvent.key === "Backspace") {
      const newPin = [...pin];
      if (index > 0 && newPin[index] === "") {
        newPin[index - 1] = "";
        setPin(newPin);
        inputRefs.current[index - 1]?.focus();
      } else {
        newPin[index] = "";
        setPin(newPin);
      }
    }
  };

  const handleNumberPress = (num: number) => {
    const newPin = [...pin];
    const emptyIndex = newPin.findIndex((digit) => digit === "");
    if (emptyIndex !== -1) {
      handleChange(num.toString(), emptyIndex);
    }
  };

  const handleBackspacePress = () => {
    const newPin = [...pin];
    const lastIndex =
      newPin.findIndex((digit, index) => digit === "" && index > 0) - 1;
    const targetIndex = lastIndex >= 0 ? lastIndex : newPin.length - 1;
    if (newPin[targetIndex] !== "") {
      newPin[targetIndex] = "";
      setPin(newPin);
    }
  };

  const handleContinue = async () => {
    const enteredPin = pin.join("");
    const storedPin = await AsyncStorage.getItem("password");

    if (enteredPin === storedPin) {
      router.replace("/(app)/(tabs)/home");
    } else {
      setPin(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <View style={{ marginBottom: 50,marginTop:100 }}>
            <Text style={styles.heading}>Enter your pin</Text>
          </View>
          <View style={styles.pinInputContainer}>
            {pin.map((p, index) => (
              <TextInput
                readOnly
                key={index}
                style={styles.pinInput}
                value={p}
                onChangeText={(value) => handleChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                ref={(ref) => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          <View style={styles.numContainer}>
            {numArray?.map((num, index) => (
              <TouchableOpacity
                onPress={() => handleNumberPress(num)}
                style={styles.numBtn}
                key={index}
              >
                <Text style={styles.numText}>{num}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => {
                router.back();
              }}
              style={styles.numBtn}
            >
              <Text style={[styles.numText, { fontSize: 15 }]}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNumberPress(0)}
              style={styles.numBtn}
            >
              <Text style={[styles.numText]}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleBackspacePress}
              style={styles.numBtn}
            >
              <Ionicons
                style={styles.numText}
                name="backspace-outline"
                color={"#663EB4"}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Pressable
          style={{
            width: "90%",
            backgroundColor: selectedThemeData?.buttonBg,
            padding: 15,
            borderRadius: 10,
            // height: 40,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
          }}
          onPress={handleContinue}
        >
          <Text
            style={{ fontSize: 15, color: selectedThemeData?.buttonTextColor }}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default PasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EDFD",
    justifyContent: "center",
    alignItems: "center",
    height:height
  },
  pinInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  pinInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#663EB4",
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "#E5DBFB",
    borderRadius: 50,
  },
  heading: {
    fontFamily: "SFPro9",
    fontSize: 28,
    textAlign: "center",
  },
  numBtn: {
    width: Dimensions.get("window").width / 3,
  },
  numContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 50,
    marginTop: 50,
  },
  numText: {
    fontFamily: "SFPro9",
    fontSize: 28,
    textAlign: "center",
    color: "#663EB4",
  },
});
