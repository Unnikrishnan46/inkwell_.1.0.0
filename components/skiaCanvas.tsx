import React, { Children, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  Canvas,
  ImageFormat,
  Path,
  SkPath,
  Skia,
  useCanvasRef,
  useTouchHandler,
} from "@shopify/react-native-skia";
import {  useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { setCurrentContentItemCount, setNewDiaryData } from "@/redux/curdDiaryState";


type Props = {};

const height = Dimensions.get("window").height;

const SkiaCanvas = forwardRef((props: Props, ref) => {
  const canvasRef = useCanvasRef();
  const selectedDrawingColor = useSelector((state:any)=>state.drawingToolState).selectedDrawingColor;
  const strokeWidth = useSelector((state:any)=>state.drawingToolState).strokeWidth;
  const selectedDrawingTool = useSelector(
    (state: any) => state.drawingToolState
  ).selectedDrawingTool;
  const currentPath = useRef<SkPath>();
  const [paths, setPaths] = useState<Array<{ path: SkPath; color: string ; strokeWidth:number }>>([]);
  const [undonePaths, setUndonePaths] = useState<Array<{ path: SkPath; color: string; strokeWidth:number }>>([]);
  const selectedColor = useRef<string>(selectedDrawingColor);
  const selectedStrokeWidth = useRef<number>(strokeWidth);
  const dispatch = useDispatch();

  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;
  const currentContentItemCount = useSelector(
    (state: any) => state.curdDiaryState
  )?.currentContentItemCount;

  useEffect(() => {
    selectedColor.current = selectedDrawingColor;
  }, [selectedDrawingColor]);

  useEffect(()=>{
    selectedStrokeWidth.current = strokeWidth;
  },[strokeWidth]);
  
  const handleTouch = useTouchHandler({
    onStart: ({ x, y }) => {
      const newPath = Skia.Path.Make();
      newPath.moveTo(x, y);
      setPaths((prevPaths:any) => prevPaths.concat({ path: newPath, color: selectedColor.current ,strokeWidth:selectedStrokeWidth.current}));
      setUndonePaths([]);
    },
    onActive: ({ x, y }) => {
      setPaths((prevPaths) => {
        const paths = [...prevPaths];
        const currentPath = paths.pop()!;
        currentPath.path.lineTo(x, y);
        return paths.concat(currentPath);
      });
    },
  });

  const handleUndo = () => {
    setPaths((prevPaths) => {
      if (prevPaths.length === 0) return prevPaths;
      const newPaths = [...prevPaths];
      const undonePath = newPaths.pop()!;
      setUndonePaths((prevUndonePaths) => prevUndonePaths.concat(undonePath));
      return newPaths;
    });
  };

  const handleRedo = () => {
    setUndonePaths((prevUndonePaths) => {
      if (prevUndonePaths.length === 0) return prevUndonePaths;
      const newUndonePaths = [...prevUndonePaths];
      const redonePath = newUndonePaths.pop()!;
      setPaths((prevPaths) => prevPaths.concat(redonePath));
      return newUndonePaths;
    });
  };

  const handleSaveImage = ()=>{
    const image = canvasRef.current?.makeImageSnapshot();
      if (image) {
        const base64 = image.encodeToBase64(ImageFormat.PNG, 30);
        if (base64) {
          const currentData = newDiaryData;
          const newItem = {
            itemCount: currentContentItemCount + 1,
            itemType: "skiaImage",
            itemFile: base64,
            itemContent:""
          };
          const updatedData = {
            ...currentData,
            body: [...currentData.body, newItem],
          };
          dispatch(setNewDiaryData(updatedData));
          dispatch(setCurrentContentItemCount(currentContentItemCount + 1));
          router.back();
        }
      }
  }

  useImperativeHandle(ref, () => ({
    handleUndo,
    handleRedo,
    handleSaveImage,
  }));

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas} onTouch={handleTouch} ref={canvasRef}>
        {Children.toArray(
          paths.map(({ path, color ,strokeWidth }, index) => (
            <Path key={index} path={path} strokeWidth={strokeWidth} color={color} style="stroke" />
          ))
        )}
      </Canvas>
    </View>
  );
});

export default SkiaCanvas;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: height,
    zIndex:-10,
    paddingBottom:100
  },
  canvas: {
    backgroundColor: "white",
    height: height / 3,
    width: "90%",
    borderRadius: 16,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 3,
    alignSelf:"center"
  },
});


