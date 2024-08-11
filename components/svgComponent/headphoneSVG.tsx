import * as React from "react";
import Svg, { Path } from "react-native-svg";

const HeadphoneSVG = (props:any) => (
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
    className="lucide lucide-headphones"
    {...props}
  >
    <Path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
  </Svg>
);
export default HeadphoneSVG;
