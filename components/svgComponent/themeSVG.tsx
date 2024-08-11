import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ThemeSVG = (props:any) => (
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
    className="lucide lucide-palette"
    {...props}
  >
    <Circle cx={13.5} cy={6.5} r={0.5} fill="#343434" />
    <Circle cx={17.5} cy={10.5} r={0.5} fill="#343434" />
    <Circle cx={8.5} cy={7.5} r={0.5} fill="#343434" />
    <Circle cx={6.5} cy={12.5} r={0.5} fill="#343434" />
    <Path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </Svg>
);
export default ThemeSVG;