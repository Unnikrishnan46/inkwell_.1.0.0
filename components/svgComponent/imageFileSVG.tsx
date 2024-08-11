import { setSelectedImageOrVideoIcon } from "@/redux/iconState";
import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

const ImageSVG = (props: any) => {
    const selectedImageOrVideoIcon = useSelector((state:any)=>state.iconState)?.selectedImageOrVideoIcon;
    const dispatch = useDispatch();
    return (
    <Svg
    onPress={()=>{dispatch(setSelectedImageOrVideoIcon("image"))}}
      xmlns="http://www.w3.org/2000/svg"
      width={selectedImageOrVideoIcon === "image" ? 34 : 34 }
      height={selectedImageOrVideoIcon === "image" ? 34 : 34 }
      viewBox="0 0 24 24"
      fill="none"
      stroke={selectedImageOrVideoIcon === "image" ? "#f5a1f6" : "#807f7f"}
      strokeWidth={selectedImageOrVideoIcon === "image" ? 1.7 : 1.4 }
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-image"
      {...props}
    >
      <Rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
      <Circle cx={9} cy={9} r={2} />
      <Path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </Svg>
  );
};
export default ImageSVG;
