import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import GuideTab from "@/components/guideTab";

type Props = {};

const GuideScreen = (props: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={{gap: 10}}>
        <GuideTab
          heading="Quick guide"
          content="Try quick guide to write your memories"
          bgColor="#D2BFF7"
          btnBgColor="#DED0F9"
        />
        <GuideTab
          heading="Travel guide"
          content="Use travel guide to write your vacation"
          bgColor="#F9EEAD"
          btnBgColor="#FCF8DD"
        />
        <GuideTab
          heading="School guide"
          content="Try school guide write down what's going on at school"
          bgColor="#CAECEE"
          btnBgColor="#DFF3F5"
        />
        <GuideTab
          heading="Good day guide"
          content="Save your happiness using good day guide if you had a good day"
          bgColor="#FEDEB5"
          btnBgColor="#FEEAD0"
        />
        <GuideTab
          heading="Bad day guide"
          content="Try this guide to record your experiences if you had unfortunate day"
          bgColor="#EFC6F0"
          btnBgColor="#F4D9F5"
        />
        <View style={{marginBottom:30}}/>
      </View>
    </ScrollView>
  );
};

export default GuideScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
});
