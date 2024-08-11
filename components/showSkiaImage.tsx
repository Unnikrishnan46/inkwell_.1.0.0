import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Canvas, Image, Skia } from "@shopify/react-native-skia";
import { EvilIcons } from "@expo/vector-icons";

type Props = {
  source:any;
  itemCount:any;
  editMode:any;
};

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const ShowSkiaImage = ({source,itemCount,editMode}: Props) => {
  console.log(source);
  
  const data = source ? Skia.Data.fromBase64(source) : null;
  const image = data ? Skia.Image.MakeImageFromEncoded(data) : null;
  console.log(image);
  
  return (
    <View key={itemCount} style={styles.container}>
      <Pressable style={styles.searchBtn}>
        <EvilIcons name="search" size={20} color={"white"}/>
      </Pressable>
      <Canvas style={styles.canvas}>
        <Image image={image} fit="cover" x={0} y={0} width={256} height={256} />
      </Canvas>
    </View>
  );
};

export default ShowSkiaImage;

const styles = StyleSheet.create({
  container: {
    height: height / 3,
    width: width / 2,
    backgroundColor: "white",
    borderRadius:10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 3,
  },
  canvas: {
    backgroundColor: "white",
    height: "100%",
    width: "92%",
    alignSelf: "center",
  },
  searchBtn:{
    height:25,
    width:25,
    position:"absolute",
    backgroundColor:"red",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50,
    top:1,
    right:5,
    zIndex:1
  },
});
