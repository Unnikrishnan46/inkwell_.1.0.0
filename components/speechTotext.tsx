// import { StyleSheet, Text, View } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import Voice from "@react-native-voice/voice";

// type Props = {};

// const SpeechToText = (props: Props) => {
//   const [results, setResults] = useState<any>([]);

//   const isText2SpeechTabOpen = useSelector(
//     (state: any) => state.sheetState
//   ).isText2SpeechTabOpen;

//   const newDiaryData = useSelector(
//     (state: any) => state.curdDiaryState
//   )?.newDiaryData;

//   const focusedInput = useSelector(
//     (state: any) => state.curdDiaryState
//   )?.focusedInput;

//   console.log(newDiaryData);
//   console.log(focusedInput);

//   useEffect(() => {
//     Voice.onSpeechStart = onSpeechStartHandler;
//     Voice.onSpeechEnd = onSpeechEndHandler;
//     Voice.onSpeechResults = onSpeechResultsHandler;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const onSpeechStartHandler = (e: any) => {
//     try {
//       console.log(e?.value);
//     } catch (error) {
//       console.log("onSpeechStartHandler error  :  ", error);
//     }
//   };

//   const onSpeechEndHandler = (e: any) => {
//     // console.log(e);
//   };

//   const onSpeechResultsHandler = (e: any) => {
//     try {
//       console.log(e);
//       setResults(e?.value);
//     } catch (error) {
//       console.log("onSpeechResultsHandler error  :  ", error);
//     }
//   };

//   const startRecognizing = async () => {
//     try {
//       await Voice.start("en-US");
//     } catch (error) {
//       console.log(" suii", error);
//     }
//   };

//   const stopRecognizing = async () => {};

//   useEffect(() => {
//     if (isText2SpeechTabOpen) {
//       startRecognizing();
//     }
//   }, [isText2SpeechTabOpen]);

//   return (
//     <View
//       style={[
//         styles.text2SpeechContainer,
//         { display: !isText2SpeechTabOpen ? "none" : "flex" },
//       ]}
//     >
//       <Text style={{ color: "gray" }}>Say something ...</Text>
//       <Text>.......</Text>
//     </View>
//   );
// };

// export default SpeechToText;

// const styles = StyleSheet.create({
//   text2SpeechContainer: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     position: "absolute",
//     height: 60,
//     width: "100%",
//     zIndex: 1,
//     bottom: 50,
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     borderTopLeftRadius: 9,
//     borderTopRightRadius: 9,
//   },
// });

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Voice from "@react-native-voice/voice";
import { setIsText2SpeechTabOpen } from "@/redux/sheetState";
import { setEditDiaryData, setNewDiaryData } from "@/redux/curdDiaryState";

type Props = {
  mode: any;
};

const SpeechToText = ({ mode }: Props) => {
  const [results, setResults] = useState<any>([]);
  const dispatch = useDispatch();

  const isText2SpeechTabOpen = useSelector(
    (state: any) => state.sheetState
  ).isText2SpeechTabOpen;

  const newDiaryData = useSelector(
    (state: any) => state.curdDiaryState
  )?.newDiaryData;

  const editDiaryData = useSelector((state:any)=>state.curdDiaryState)?.editDiaryData

  const focusedInput = useSelector(
    (state: any) => state.curdDiaryState
  )?.focusedInput;

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e: any) => {
    try {
      console.log(e?.value);
    } catch (error) {
      console.log("onSpeechStartHandler error  :  ", error);
    }
  };

  const onSpeechEndHandler = (e: any) => {
    dispatch(setIsText2SpeechTabOpen(!isText2SpeechTabOpen));
  };

  const onSpeechResultsHandler = (e: any) => {
    try {
      console.log(e.value);
      setResults(e?.value);
      updateFocusedInputContent(e?.value);
    } catch (error) {
      console.log("onSpeechResultsHandler error  :  ", error);
    }
  };

  const startRecognizing = async () => {
    try {
      await Voice.start("en-US");
    } catch (error) {
      console.log(" suii", error);
    }
  };

  const stopRecognizing = async () => {};

  useEffect(() => {
    if (isText2SpeechTabOpen) {
      startRecognizing();
    }
  }, [isText2SpeechTabOpen]);

  const updateFocusedInputContent = (speechResult: string[]) => {
    if (mode === "add") {
      const updatedBody = newDiaryData.body.map((item: any) => {
        console.log(item , focusedInput);
        
        if (item.itemCount === focusedInput.itemCount) {
          console.log("Appending speech result to existing content");
          const updatedContent = item.itemContent
            ? `${item.itemContent} ${speechResult.join(" ")}`
            : speechResult.join(" ");
          return { ...item, itemContent: updatedContent };
        }
        return item;
      });
  
      const updatedDiaryData = {
        ...newDiaryData,
        body: updatedBody,
      };
      console.log(updatedDiaryData);
      
      dispatch(setNewDiaryData(updatedDiaryData));
      dispatch(setIsText2SpeechTabOpen(!isText2SpeechTabOpen));
    }else if (mode === "edit"){
      const updatedBody = editDiaryData.body.map((item: any) => {
        if (item.itemCount === focusedInput.itemCount) {
          console.log("Appending speech result to existing content");
          const updatedContent = item.itemContent
            ? `${item.itemContent} ${speechResult.join(" ")}`
            : speechResult.join(" ");
          return { ...item, itemContent: updatedContent };
        }
        return item;
      });
  
      const updatedDiaryData = {
        ...editDiaryData,
        body: updatedBody,
      };
      
      dispatch(setEditDiaryData(updatedDiaryData));
      dispatch(setIsText2SpeechTabOpen(!isText2SpeechTabOpen));
    }
  };
  

  return (
    <View
      style={[
        styles.text2SpeechContainer,
        { display: !isText2SpeechTabOpen ? "none" : "flex" },
      ]}
    >
      <Text style={{ color: "gray" }}>Say something ...</Text>
      <Text>.......</Text>
    </View>
  );
};

export default SpeechToText;

const styles = StyleSheet.create({
  text2SpeechContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    position: "absolute",
    height: 60,
    width: "100%",
    zIndex: 1,
    bottom: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
});
