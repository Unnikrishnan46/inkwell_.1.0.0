import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, {
  Circle,
  Rect,
  Path,
  Line,
  Image,
  G,
  Text as SvgText,
} from "react-native-svg";
import * as FileSystem from "expo-file-system";

const height = Dimensions.get("window").height;

const DisplayMoodBoard = () => {
  const data = useLocalSearchParams() as any;
  const [shapes, setShapes] = useState<any>([]);
  console.log(shapes);

  useEffect(() => {
    const readJsonFile = async () => {
      try {
        const fileUri = data.uri;
        const jsonString = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        const jsonData = JSON.parse(jsonString);
        setShapes(jsonData);
      } catch (error) {
        console.error("Error reading JSON file", error);
      }
    };

    readJsonFile();
  }, [data.uri]);

  return (
    <View style={styles.container}>
      <View style={styles.canvas}>
        <Svg style={{ flex: 1 }}>
          {shapes.map((shape: any, index: number) => {
            if (shape.type === "circle") {
              return (
                <Circle
                  key={index}
                  cx={shape.x}
                  cy={shape.y}
                  r={shape.r}
                  stroke={shape.strokeColor}
                  strokeWidth="2"
                  fill={shape.fillColor ? shape.fillColor : "none"}
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
                  stroke={shape.strokeColor}
                  strokeWidth="2"
                  fill={shape.fillColor ? shape.fillColor : "none"}
                />
              );
            } else if (shape.type === "pencil") {
              return (
                <Path
                  key={index}
                  d={shape.path}
                  stroke={shape.strokeColor}
                  strokeWidth="2"
                  fill="none"
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
                />
              );
            } else if (shape.type === "text") {
              return (
                <G key={index}>
                  <SvgText
                    x={shape.x}
                    y={shape.y}
                    fontSize={shape.fontSize}
                    fontFamily={
                      shape.fontFamily ? shape.fontFamily : "SpaceMono"
                    }
                    fill={shape.fillColor ? shape.fillColor : "black"}
                  >
                    {shape.text}
                  </SvgText>
                </G>
              );
            } else if (shape.type === "image") {
              return (
                <Image
                  key={index}
                  href={shape.uri}
                  width={100}
                  height={100}
                  x={shape.x}
                  y={shape.y}
                />
              );
            }
          })}
        </Svg>
      </View>
    </View>
  );
};

export default DisplayMoodBoard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2EDFD",
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
