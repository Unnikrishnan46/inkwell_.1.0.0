import { ScrollView, Share, StyleSheet, Text, View } from "react-native";
import React from "react";
import SettingsTabWithSwitch from "@/components/settingsTabWithSwitch";
import { AntDesign, EvilIcons, Feather, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import SettingsTabWithoutSwitch from "@/components/settingsTabWithoutSwitch";
import ButtonWithIcon from "@/components/buttonWithIcon";
import { router } from "expo-router";
import * as StoreReview from 'expo-store-review';
import { useSelector } from "react-redux";

type Props = {};

const Settings = (props: Props) => {
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;
  const handleSharePress = async()=>{
    await Share.share({
      message:"https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
      url:"https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en",
      title:"App link"
    });
  }

  const promptForReview = async () => {
    console.log("dfgdfgdf");
    const isAvailable = await StoreReview.isAvailableAsync();
    console.log("dfgdfgdf",isAvailable);
    
    if (isAvailable) {
      try {
        await StoreReview.requestReview();
        console.log('Review prompt displayed');
      } catch (error) {
        console.error('Error displaying review prompt', error);
      }
    } else {
      console.log('Store review is not available');
    }
  };

  return (
    <ScrollView style={[styles.container,{backgroundColor:selectedThemeData?.bodyBgColor}]}>
        <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 15,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View style={{gap:10,width:"100%"}}>
            <Text style={styles.heading}>Settings</Text>
            <SettingsTabWithSwitch content="Show achivement dialog" title="Achivements" icon={<SimpleLineIcons name="trophy" size={25}/>} switchValue={false} onSwitchChange={()=>{console.log("Hello")}}/>
            {/* <ButtonWithIcon title="Editor Default" content="" icon={<MaterialCommunityIcons name="clipboard-edit-outline" size={25}/>} onPress={()=>{console.log("Hello")}}/> */}
            <SettingsTabWithoutSwitch title="Privacy" content="Set a diary lock to keep your diary private" icon={<SimpleLineIcons name="lock" size={25}/>} onPress={()=>{router.navigate("(screens)/privacyScreen")}}/>
            <ButtonWithIcon title="Reminder" content="" icon={<SimpleLineIcons name="bell" size={25}/>} onPress={()=>{router.navigate("(screens)/reminder")}}/>
            <ButtonWithIcon title="Tag Management" content="" icon={<Feather name="hash" size={25}/>} onPress={()=>{router.navigate("(screens)/tagManagement")}}/>
        </View>

        <View style={{gap:10,width:"100%",marginBottom:20}}>
            <Text style={[styles.heading,{marginTop:10}]}>About</Text>
            <ButtonWithIcon title="Contact a developer" content="" icon={<AntDesign name="instagram" size={25}/>} onPress={()=>{console.log("Hello")}}/>
            <ButtonWithIcon title="Recommend" content="" icon={<AntDesign name="sharealt" size={25}/>} onPress={handleSharePress}/>
            <ButtonWithIcon title="Rate" content="" icon={<EvilIcons name="star" size={25}/>} onPress={promptForReview}/>
            <ButtonWithIcon title="Feedback" content="" icon={<MaterialIcons name="chat-bubble-outline" size={25}/>} onPress={()=>{console.log("Hello")}}/>
        </View>
      
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EDFD",
  },
  heading:{
    fontFamily: "SFPro13",
    fontSize: 20,
    marginBottom:15
  }
});
