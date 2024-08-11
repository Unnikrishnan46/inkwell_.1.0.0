import * as React from "react";
import Svg, { Rect, Circle, Path } from "react-native-svg";
const ImageSVG = (props:any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    viewBox="0 0 24 24"
    fill="none"
    stroke="#343434"
    strokeWidth={1.4}
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
export default ImageSVG;
