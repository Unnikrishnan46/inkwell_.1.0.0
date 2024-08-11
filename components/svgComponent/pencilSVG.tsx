import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PencilSVG = (props:any) => (
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
    className="lucide lucide-pencil"
    {...props}
  >
    <Path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <Path d="m15 5 4 4" />
  </Svg>
);
export default PencilSVG;
