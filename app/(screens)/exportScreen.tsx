import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { RadioButton } from "react-native-paper";
import SettingsTabWithSwitch from "@/components/settingsTabWithSwitch";
import { EvilIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as Sharing from 'expo-sharing';
import { useSelector } from "react-redux";

type Props = {};

const ExportScreen = (props: Props) => {
  const [selectedPeriodValue, setSelectedPeriodValue] = useState("allEntries");
  const [selectedFormat,setSelectedFormat] = useState("txt");
  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;
  const handleExport = async () => {
    try {
      const diaries = await loadAllDiaries();
      const filteredDiaries = filterDiaries(diaries, selectedPeriodValue);
      const formattedData = formatDiaries(filteredDiaries, selectedFormat) as any;
      await exportToFile(formattedData, selectedFormat);
    } catch (error) {
      console.error("Error exporting diaries:", error);
    }
  };

  const filterDiaries = (diaries:any, period:any) => {
    const now = new Date() as any;
    return diaries.filter((diary: { CurrentDayDetails: { year: any; month: any; day: any; hours: any; minutes: any; }; }) => {
      const diaryDate = new Date(
        `${diary.CurrentDayDetails.year}-${diary.CurrentDayDetails.month}-${diary.CurrentDayDetails.day}T${diary.CurrentDayDetails.hours}:${diary.CurrentDayDetails.minutes}`
      ) as any;

      switch (period) {
        case '7days':
          return (now - diaryDate) <= (7 * 24 * 60 * 60 * 1000);
        case '30days':
          return (now - diaryDate) <= (30 * 24 * 60 * 60 * 1000);
        case 'month':
          return diaryDate.getMonth() === now.getMonth() && diaryDate.getFullYear() === now.getFullYear();
        case 'allEntries':
        default:
          return true;
      }
    });
  };

  const formatDiaries = (diaries: any[], format: string) => {
    switch (format) {
      case 'txt':
        return diaries.map((diary: { title: any; CurrentDayDetails: any; body: any; moodData: any; tags: any[]; background: any; }) => {
          const { title, CurrentDayDetails, body, moodData, tags, background } = diary;
  
          // Format the CurrentDayDetails section
          const dateInfo = `Date: ${CurrentDayDetails.dayOfWeek}, ${CurrentDayDetails.monthName} ${CurrentDayDetails.day}, ${CurrentDayDetails.year} ${CurrentDayDetails.hours}:${CurrentDayDetails.minutes} ${CurrentDayDetails.ampm}`;
          
          // Format the mood information
          const moodInfo = `Mood: ${moodData ? moodData.name : "Not recorded"}`;
  
          // Format the tags information
          const tagsInfo = tags && tags.length ? `Tags: ${tags.join(", ")}` : "Tags: None";
  
          // Format the background information
          const backgroundInfo = `Background: ${background.backgroundColor}${background.backgroundImage ? " with image" : ""}`;
  
          // Format the body section with itemContents
          const bodyContent = body.map((section: { itemContent: any; itemContents: any[] }) => {
            console.log(section);
            
            const content = section.itemContent;
            const itemContents = section.itemContents ? section.itemContents.map(item => `- ${item}`).join("\n") : '';
            return `${content}\n${itemContents}`;
          }).join("\n\n");
  
          return `Title: ${title || "No Title"}\n${dateInfo}\n${moodInfo}\n${tagsInfo}\n${backgroundInfo}\n\n${bodyContent}`;
        }).join("\n\n--------------------\n\n");
        
      case 'pdf':
        // PDF formatting can be implemented later
        break;
        
      default:
        return '';
    }
  };
  

  const exportToFile = async (data: string, format: string) => {
    const fileUri = `${FileSystem.documentDirectory}diaries_export.${format}`;
    await FileSystem.writeAsStringAsync(fileUri, data, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(fileUri);
    } else {
      console.log("Sharing not available on this device.");
    }
  };

  const listAllDiaryFiles = async () => {
    try {
      const files = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory as string
      );
      const diaryFiles = files.filter((file) => file.endsWith(".json"));
      return diaryFiles;
    } catch (error) {
      console.error("Error listing diary files:", error);
      return [];
    }
  };

 const loadAllDiaries = async () => {
    try {
      const diaryFiles = await listAllDiaryFiles();
      const allDiaries = await Promise.all(
        diaryFiles.map(async (file) => {
          const fileUri = FileSystem.documentDirectory + file;
          const jsonString = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.UTF8,
          });
          return JSON.parse(jsonString);
        })
      );

      allDiaries.sort((a, b) => {
        const dateA = new Date(
          `${a.CurrentDayDetails.year}-${a.CurrentDayDetails.month}-${a.CurrentDayDetails.day}T${a.CurrentDayDetails.hours}:${a.CurrentDayDetails.minutes}`
        ) as any;
        const dateB = new Date(
          `${b.CurrentDayDetails.year}-${b.CurrentDayDetails.month}-${b.CurrentDayDetails.day}T${b.CurrentDayDetails.hours}:${b.CurrentDayDetails.minutes}`
        ) as any;
        return dateB - dateA;
      });
      return allDiaries;
    } catch (error) {
      console.error("Error loading all diaries:", error);
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
        <View style={styles.exportPeriodContainer}>
          <Text style={styles.sectionHeading}>Export Period</Text>
          <RadioButton.Group
            onValueChange={(value) => setSelectedPeriodValue(value)}
            value={selectedPeriodValue}
          >
            <View style={styles.radioContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="allEntries"
                  color="black"
                  // uncheckedColor="red"
                />
                <Text style={styles.optionText}>All entries</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="7days" color="black" />
                <Text style={styles.optionText}>Last 7 days</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="30days" color="black" />
                <Text style={styles.optionText}>Last 30 days</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="month" color="black" />
                <Text style={styles.optionText}>This month</Text>
              </View>
              {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton value="option5" color="black" />
                <Text style={styles.optionText}>Custom Selection</Text>
              </View> */}
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.exportPeriodContainer}>
          <Text style={styles.sectionHeading}>Export Format</Text>
          <RadioButton.Group
            onValueChange={(value) => setSelectedFormat(value)}
            value={selectedFormat}
          >
            <View style={styles.radioContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton
                  value="txt"
                  color="black"
                />
                <Text style={styles.optionText}>TXT</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RadioButton disabled value="pdf" color="black" />
                <Text style={styles.optionText}>PDF (coming soon)</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        <View style={styles.exportPeriodContainer}>
          <Text style={styles.sectionHeading}>Watermark</Text>
          <SettingsTabWithSwitch
            title="Remove Watermark"
            content=""
            icon={<EvilIcons name="trash" size={30} />}
            onSwitchChange={()=>{console.log("hello")}}
            switchValue={false}
          />
        </View>
        <View style={{width:"100%",marginBottom:20}}>
          <TouchableOpacity onPress={handleExport} style={[styles.btnStyle,{backgroundColor:selectedThemeData?.buttonBg}]}>
            <Text style={[{color:selectedThemeData?.buttonTextColor},styles.optionText]}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EDFD",
  },
  exportPeriodContainer: {
    backgroundColor: "white",
    width: "100%",
    justifyContent: "space-between",
    padding: 20,
    paddingLeft: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: Platform.select({
      ios: 0.2,
      android: 0.56,
    }),
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    gap: 20,
  },
  sectionHeading: {
    fontFamily: "SFPro3",
    fontSize: 20,
    marginLeft: 10,
  },
  optionText: {
    fontFamily: "SFPro9",
    fontSize: 15,
  },
  radioContainer: {
    gap: 10,
  },
  btnStyle:{
    backgroundColor:"#663EB4",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    borderRadius: 10,
    padding: 15,
  }
});
