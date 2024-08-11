import * as React from "react";
import Svg, { Line } from "react-native-svg";
const HashtagSVG = (props:any) => (
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
    className="lucide lucide-hash"
    {...props}
  >
    <Line x1={4} x2={20} y1={9} y2={9} />
    <Line x1={4} x2={20} y1={15} y2={15} />
    <Line x1={10} x2={8} y1={3} y2={21} />
    <Line x1={16} x2={14} y1={3} y2={21} />
  </Svg>
);
export default HashtagSVG;