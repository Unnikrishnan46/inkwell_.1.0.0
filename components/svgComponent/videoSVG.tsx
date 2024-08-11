import { setSelectedImageOrVideoIcon } from "@/redux/iconState";
import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

const VideoSVG = (props:any) => {
  const selectedImageOrVideoIcon = useSelector((state:any)=>state.iconState)?.selectedImageOrVideoIcon;
  const dispatch = useDispatch();
  return (
  <Svg
    onPress={()=>{dispatch(setSelectedImageOrVideoIcon("video"))}}
    xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={34}
    viewBox="0 0 24 24"
    fill="none"
    stroke={selectedImageOrVideoIcon === "video" ? "#f5a1f6" : "#807f7f"}
    strokeWidth={selectedImageOrVideoIcon === "video" ? 1.7 : 1.4 }
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-file-video"
    {...props}
  >
    <Path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <Path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <Path d="m10 11 5 3-5 3v-6Z" />
  </Svg>
)};
export default VideoSVG;
