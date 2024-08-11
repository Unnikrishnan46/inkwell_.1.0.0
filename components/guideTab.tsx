import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
    heading:string;
    content:string;
    bgColor:string;
    btnBgColor:string;
};

const GuideTab = (props: Props) => {
  return (
    <View style={[styles.container,{backgroundColor:props?.bgColor}]}>
      <Text style={styles.heading}>{props.heading}</Text>
      <Text style={styles.content}>{props.content}</Text>
      <TouchableOpacity style={[styles.btn,{backgroundColor:props.btnBgColor}]}>
        <Text style={styles.btnText}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuideTab;

const styles = StyleSheet.create({
  container: {
    padding:15,
    gap:10,
    borderRadius:10
  },
  heading: {
    fontFamily: "SFPro11",
    fontSize: 18,
  },
  content:{
    fontFamily: "SFPro11",
    color:"gray",
    fontSize: 14,
    width:"80%"
  },
  btn:{
    width:"70%",
    padding:5,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10,
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios:0.2,
      android:0.56
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
  },
  btnText:{
    fontFamily: "SFPro11",
    color:"black",
    fontSize: 16,
  }
});
