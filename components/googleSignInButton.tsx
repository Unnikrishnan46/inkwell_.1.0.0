import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  onPress: any;
  userData: any;
};

const GoogleSignInButton = ({ onPress, userData }: Props) => {
  // console.log(JSON.parse(userData).user?.email);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: "white",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding:Dimensions.get("window").height * 0.015,
          borderRadius: 10,
        },
        styles.constainer,
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 10,paddingHorizontal:20 }}>
        <View style={{ justifyContent: "center",alignItems:"center" }}>
          <Image
            style={{ height: Dimensions.get("window").height * 0.05, width: Dimensions.get("window").height * 0.05 }}
            source={require("../assets/images/icons/googleLogo.png")}
          />
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View>
            {userData ? (
              <Text style={{ fontFamily: "SFPro9", fontSize: Dimensions.get("window").height * 0.025 }}>Logout</Text>
            ) : (
              <Text style={{ fontFamily: "SFPro9", fontSize: Dimensions.get("window").height * 0.025 }}>
                Sign-in with Google
              </Text>
            )}
            {userData !== null && (<Text>{JSON.parse(userData)?.user?.email}</Text>)}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  constainer: {
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.2,
      android: 0.56,
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    paddingLeft: 15,
  },
});
