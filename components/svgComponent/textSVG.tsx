import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
const TextSVG = (props:any) => (
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
    className="lucide lucide-clipboard-type"
    {...props}
  >
    <Rect width={8} height={4} x={8} y={2} rx={1} ry={1} />
    <Path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <Path d="M9 12v-1h6v1" />
    <Path d="M11 17h2" />
    <Path d="M12 11v6" />
  </Svg>
);
export default TextSVG;
