import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { useSelector } from "react-redux";

type Props = {};

const InkeyChat = (props: Props) => {
  const [chatDataList, setChatDataList] = useState<any[]>([]);
  const [isBotFirstTime, setIsBotFirstTime] = useState<string>("yes");
  const [inputText, setInputText] = useState<string>("");
  const [introCompleted, setIntroCompleted] = useState(false);

  const selectedThemeData = useSelector((state: any) => state.themeState)?.selectedThemeData;


  const apiKey = "AIzaSyDktwDtyyyVHzhwHyGyl0EFfFpBi9FT00Y";
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  async function run() {
    try {
      // const parts = [{ text: `input: ${inputText}` }, { text: "output: " }];
      const parts = [
        {text: "You are Inky . Inky is a personal AI assistant here to support your mental and physical well-being. She can help you with any questions or concerns you might have. Whether you need advice, resources, or just someone to talk to, Inky is here for you. Always remember to give thanks."},
        {text: "input: You are Inky . Inky is a personal AI assistant here to support your mental and physical well-being. She can help you with any questions or concerns you might have. Whether you need advice, resources, or just someone to talk to, Inky is here for you. Always remember to give thanks."},
        // {text: "output: "},
        {text: `input: ${inputText}`},
        {text: "output: "},
      ];
    if (isBotFirstTime) {
      doneFirstTime();
    }
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    setChatDataList((prevChatDataList) => [
      ...prevChatDataList,
      { result: result.response.text(), prompt: inputText, isBot: true },
    ]);
    } catch (error) {
      console.log(error);
    }
    
  }

  useEffect(() => {
    const checkFirstTime = async () => {
      const value = await AsyncStorage.getItem("isBotFirstTime");
      if (value !== null) {
        setIsBotFirstTime("no");
      } else {
        setIsBotFirstTime("yes");
      }
    };
    checkFirstTime();
  }, []);

  const doneFirstTime = async () => {
    await AsyncStorage.setItem("isBotFirstTime", "no");
    setIsBotFirstTime("no");
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      setChatDataList((prevChatDataList) => [
        ...prevChatDataList,
        { prompt: inputText, isBot: false },
      ]);
      setInputText("");
      await run();
      if (!isBotFirstTime) {
        await doneFirstTime();
      }
    }
  };

  const renderItem = ({ item }: any) => {
    if (item.isBot) {
      return (
        <View style={styles.botMessageContainer}>
          <View style={styles.botChatContainer}>
            {/* Format the bot's response text and remove the '*' characters */}
            {item.result.split("\n").map((line:any, index:any) => {
              const trimmedLine = line.trim();
              const isBold = trimmedLine.startsWith("*");
              const formattedLine = isBold
                ? trimmedLine.replace(/^\*+/, "").trim()
                : trimmedLine;
  
              return (
                <Text key={index} style={isBold ? styles.boldText : styles.chatText}>
                  {formattedLine}
                </Text>
              );
            })}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.userMessageContainer}>
          <View style={styles.userChatContainer}>
            <Text style={styles.chatText}>{item.prompt}</Text>
          </View>
        </View>
      );
    }
  };
  
  

  const getSpeech = async () => {
    // const suii = await Speech.getAvailableVoicesAsync();
    const thingToSay =
      "Hi there! I'm Inky, your personal AI assistant. I'm here to support your mental and physical well-being.Whether you need advice,resources, or just someone to talk to, I'm here for you.";
    Speech.speak(thingToSay, {
      voice: "en-au-x-auc-network",
      onStart: () => {
        setIntroCompleted(true);
      },
    });
    // en-AU-language
    // en-au-x-auc-local
    // en-au-x-auc-network
  };

  useEffect(() => {
    if (introCompleted && chatDataList.length <= 0) {
      getSpeech();
    }
  }, [introCompleted]);

  return (
    <View style={[styles.container,{backgroundColor:selectedThemeData?.bodyBgColor}]}>
      {chatDataList.length <= 0 && (
        <View style={{ position: "absolute", bottom: "25%" }}>
          <LottieView
            resizeMode="center"
            source={require("../../assets/animations/inkyBot.json")}
            style={{
              width: 350,
              height: 350,
            }}
            autoPlay
            loop
          />
          <Text
            style={{
              fontFamily: "DancingScriptRegular",
              // padding: 20,
              paddingHorizontal:20,
              textAlign: "center",
              fontSize: Dimensions.get("window").height * 0.04,
            }}
          >
            Hi there! I'm Inky, your personal AI assistant. I'm here to support
            your mental and physical well-being.Whether you need advice,
            resources, or just someone to talk to, I'm here for you. 😊
          </Text>
        </View>
      )}

      {chatDataList.length > 0 && (
        <FlatList
          data={[...chatDataList].reverse()}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          inverted
          style={{ marginTop: 50 }}
        />
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Messsage Inky"
          multiline
          onChangeText={setInputText}
          value={inputText}
        />
        <Pressable onPress={handleSend} style={[styles.sendBtn,{backgroundColor:selectedThemeData?.buttonBg}]}>
          <FontAwesome name="send-o" size={20} color={selectedThemeData?.buttonTextColor}/>
        </Pressable>
      </View>
    </View>
  );
};

export default InkeyChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 5,
    paddingHorizontal: 15,
    gap: 4,
    marginBottom: Dimensions.get("window").height * 0.02,
  },
  inputStyle: {
    width: "85%",
    borderWidth: 0.5,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  sendBtn: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  botMessageContainer: {
    alignItems: "flex-start",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  userMessageContainer: {
    alignItems: "flex-end",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  botChatContainer: {
    borderRadius: 10,
    backgroundColor: "#BFA4F4",
    padding: 15,
    width: "80%",
  },
  userChatContainer: {
    borderRadius: 10,
    backgroundColor: "#dedbe3",
    padding: 15,
    width: "80%",
  },
  chatText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#000",
  },
  boldText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#000",
    fontWeight: "bold",
  },
});
