import { Dimensions, StyleSheet, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import GoogleSignInButton from "@/components/googleSignInButton";
import ButtonWithIcon from "@/components/buttonWithIcon";
import {
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import SettingsTabWithSwitch from "@/components/settingsTabWithSwitch";
import * as WebBrowser from "expo-web-browser";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfoData } from "@/redux/userState";
import {
  GDrive,
  MimeTypes,
  ListQueryBuilder,
} from "@robinbobin/react-native-google-drive-api-wrapper";
import * as FileSystem from "expo-file-system";
import ResumableUploader from "@robinbobin/react-native-google-drive-api-wrapper/api/aux/uploaders/ResumableUploader";
import { setIsAutoBackupEnabled } from "@/redux/backupState";
import { registerBackgroundFetch } from "@/util/BackgroundTask";

WebBrowser.maybeCompleteAuthSession();

type Props = {};

const BackUpAndRestoreScreen = (props: Props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userState)?.userInfoData;
  const isAutoBackupEnabled = useSelector(
    (state: any) => state.backupState
  )?.isAutoBackupEnabled;

  const selectedThemeData = useSelector(
    (state: any) => state.themeState
  )?.selectedThemeData;

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/drive.appdata",
        "https://www.googleapis.com/auth/drive.appfolder",
        "https://www.googleapis.com/auth/drive",
      ],
      iosClientId:
        "1073665258073-76qm3l5totn2pgtt5p2s25cdlf7cnhfu.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    });
  };
  const handleGoogleLogin = async () => {
    try {
      if (!userData) {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        dispatch(setUserInfoData(JSON.stringify(userInfo)));
      } else if (userData) {
        console.log("condition worked");
        await GoogleSignin.signOut();
        await AsyncStorage.removeItem("userInfo");
        dispatch(setUserInfoData(null));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkOrCreateFolder = async (drive: GDrive, folderName: any) => {
    const folder = await drive.files.createIfNotExists(
      {
        q: new ListQueryBuilder()
          .e("name", `Inkwell-${JSON.parse(userData).user?.email}`)
          .and()
          .e("mimeType", MimeTypes.FOLDER)
          .and()
          .in("root", "parents"),
      },
      drive.files.newMetadataOnlyUploader().setRequestBody({
        name: `Inkwell-${JSON.parse(userData).user?.email}`,
        mimeType: MimeTypes.FOLDER,
        parents: ["root"],
      })
    );
    return (folder.result as any).id;
  };

  const uploadFileToDrive = async (
    folderId: any,
    fileName: any,
    fileUri: any,
    drive: GDrive
  ) => {
    try {
      const response = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      const existingFiles = await drive.files.list({
        q: new ListQueryBuilder()
          .e("name", fileName)
          .and()
          .in(folderId, "parents"),
      });

      if (existingFiles?.files?.length > 0) {
        const fileId = existingFiles.files[0].id;
        await drive.files.delete(fileId);
      }

      const uploader = drive.files
        .newMultipartUploader()
        .setData(response, MimeTypes.JSON_UTF8)
        .setRequestBody({
          name: `${fileName}`,
          parents: [folderId],
        }) as ResumableUploader;
      await uploader.execute().then((result) => {
        console.log("File uploaded successfully ", result);
      });
      return uploader;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  // const backupToDrive = async () => {
  //   try {
  //     if(userData){
  //     const drive = new GDrive();
  //     drive.accessToken = (await GoogleSignin.getTokens()).accessToken;
  //     const folderId = await checkOrCreateFolder(drive, "Inkwell");
  //     const files = await FileSystem.readDirectoryAsync(
  //       FileSystem.documentDirectory as string
  //     );
  //     const jsonFiles = files.filter((file) => file.endsWith(".json"));
  //     for (const fileName of jsonFiles) {
  //       const fileUri = FileSystem.documentDirectory + fileName;
  //       try {
  //         await uploadFileToDrive(folderId, fileName, fileUri, drive);
  //       } catch (error) {
  //         console.error(`Error uploading file ${fileName}:`, error);
  //       }
  //     }
  //     ToastAndroid.show("Backup completed successfully", 3000);
  //   }else{
  //     ToastAndroid.show("Signin and continue",3000);
  //   }
  //   } catch (error) {
  //     console.error("Error during backup:", error);
  //   }
  // };

  const backupToDrive = async () => {
    try {
      if (userData) {
        const drive = new GDrive();
        drive.accessToken = (await GoogleSignin.getTokens()).accessToken;
        const folderId = await checkOrCreateFolder(drive, "Inkwell");
  
        const files = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory as string
        );
        console.log("All files:", files);
  
        const jsonFiles = files.filter((file) => file.endsWith(".json"));
        console.log("JSON files to backup:", jsonFiles);
  
        // Upload JSON files
        for (const fileName of jsonFiles) {
          console.log("Processing file:", fileName);
          const fileUri = FileSystem.documentDirectory + fileName;
          try {
            await uploadFileToDrive(folderId, fileName, fileUri, drive);
          } catch (error) {
            console.error(`Error uploading file ${fileName}:`, error);
          }
        }
  
        // Create a subfolder for audio files in Google Drive
        const audioFolderId = await drive.files.createIfNotExists(
          {
            q: new ListQueryBuilder()
              .e("name", "audiofiles")
              .and()
              .e("mimeType", MimeTypes.FOLDER)
              .and()
              .in(folderId, "parents"),
          },
          drive.files.newMetadataOnlyUploader().setRequestBody({
            name: "audiofiles",
            mimeType: MimeTypes.FOLDER,
            parents: [folderId],
          })
        ).then((folder) => (folder.result as any).id);
  
        const audioFiles = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory + 'audio/'
        );
        console.log("Audio files to backup:", audioFiles);
  
        // Upload audio files
        for (const audioFileName of audioFiles) {
          console.log("Processing audio file:", audioFileName);
          const audioFileUri = FileSystem.documentDirectory + 'audio/' + audioFileName;
          try {
            await uploadFileToDrive(audioFolderId, audioFileName, audioFileUri, drive);
          } catch (error) {
            console.error(`Error uploading audio file ${audioFileName}:`, error);
          }
        }
  
        ToastAndroid.show("Backup completed successfully", 3000);
      } else {
        ToastAndroid.show("Signin and continue", 3000);
      }
    } catch (error) {
      console.error("Error during backup:", error);
    }
  };

  const restoreFromDrive = async () => {
    try {
      if (userData) {
        const drive = new GDrive();
        drive.accessToken = (await GoogleSignin.getTokens()).accessToken;
  
        // Get the folder ID for the user's backup folder
        const folderId = await checkOrCreateFolder(
          drive,
          `Inkwell-${JSON.parse(userData).user?.email}`
        );
  
        // Restore JSON files
        const listJsonFilesResponse = await drive.files.list({
          q: new ListQueryBuilder()
            .in(folderId, "parents")
            .and()
            .e("mimeType", "application/json"),
        });
  
        const driveJsonFiles = listJsonFilesResponse.files;
        console.log("JSON files in Google Drive:", driveJsonFiles.length);
  
        const deviceFiles = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory as string
        );
        console.log("Files in device:", deviceFiles);
  
        const jsonDeviceFiles = deviceFiles.filter((file) =>
          file.endsWith(".json")
        );
        console.log("JSON files in device:", jsonDeviceFiles);
  
        await Promise.all(
          driveJsonFiles.map(async (file: any) => {
            const fileName = file.name;
            if (!jsonDeviceFiles.includes(fileName)) {
              const fileUri = FileSystem.documentDirectory + fileName;
              const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
              const headers = { Authorization: `Bearer ${drive.accessToken}` };
  
              const downloadResponse = await FileSystem.downloadAsync(
                downloadUrl,
                fileUri,
                { headers }
              );
  
              console.log(`File restored: ${fileName}`, downloadResponse);
            } else {
              console.log(`File already exists, skipping: ${fileName}`);
            }
          })
        );
  
        // Restore Audio files
        const audioFolderId = await drive.files.createIfNotExists(
          {
            q: new ListQueryBuilder()
              .e("name", "audiofiles")
              .and()
              .e("mimeType", MimeTypes.FOLDER)
              .and()
              .in(folderId, "parents"),
          },
          drive.files.newMetadataOnlyUploader().setRequestBody({
            name: "audiofiles",
            mimeType: MimeTypes.FOLDER,
            parents: [folderId],
          })
        ).then((folder) => (folder.result as any).id);
  
        const listAudioFilesResponse = await drive.files.list({
          q: new ListQueryBuilder()
            .in(audioFolderId, "parents")
            .and()
            // List common audio MIME types
            .e("mimeType", "audio/mpeg")
            .or()
            .e("mimeType", "audio/wav")
            .or()
            .e("mimeType", "audio/x-wav")
            .or()
            .e("mimeType", "audio/mp4"),
        });
  
        const driveAudioFiles = listAudioFilesResponse.files;
        console.log("Audio files in Google Drive:", driveAudioFiles.length);
  
        const audioDeviceFiles = await FileSystem.readDirectoryAsync(
          FileSystem.documentDirectory + 'audio/'
        );
        console.log("Audio files in device:", audioDeviceFiles);
  
        await Promise.all(
          driveAudioFiles.map(async (file: any) => {
            const fileName = file.name;
            if (!audioDeviceFiles.includes(fileName)) {
              const fileUri = FileSystem.documentDirectory + 'audio/' + fileName;
              const downloadUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`;
              const headers = { Authorization: `Bearer ${drive.accessToken}` };
  
              const downloadResponse = await FileSystem.downloadAsync(
                downloadUrl,
                fileUri,
                { headers }
              );
  
              console.log(`Audio file restored: ${fileName}`, downloadResponse);
            } else {
              console.log(`Audio file already exists, skipping: ${fileName}`);
            }
          })
        );
  
        console.log("Restore completed");
      } else {
        ToastAndroid.show("Signin and continue", 3000);
      }
    } catch (error) {
      console.error("Error during restore:", error);
    }
  };
  

  const handleAutoBackupSwitch = async (value: boolean) => {
    await AsyncStorage.setItem("isAutoBackupEnabled", JSON.stringify(value));
    dispatch(setIsAutoBackupEnabled(value));
  };

  const checkAutoBackup = async () => {
    const isEnabled = await AsyncStorage.getItem("isAutoBackupEnabled");
    dispatch(setIsAutoBackupEnabled(isEnabled));
  };

  useEffect(() => {
    checkAutoBackup();
    configureGoogleSignIn();
    registerBackgroundFetch();
  }, []);

  return (
    <View style={[styles.container,{backgroundColor:selectedThemeData?.bodyBgColor}]}>
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
        }}
      >
        <GoogleSignInButton onPress={handleGoogleLogin} userData={userData} />
        <ButtonWithIcon
          title="Backup"
          content=""
          icon={<Fontisto name="cloud-up" size={Dimensions.get("window").height * 0.04} />}
          onPress={backupToDrive}
        />
        <SettingsTabWithSwitch
          title="Auto Backup"
          content=""
          icon={<MaterialIcons name="restore" size={Dimensions.get("window").height * 0.04} />}
          onSwitchChange={handleAutoBackupSwitch}
          switchValue={isAutoBackupEnabled}
        />
        <ButtonWithIcon
          title="Restore"
          content=""
          icon={<MaterialCommunityIcons name="rotate-3d-variant" size={Dimensions.get("window").height * 0.04} />}
          onPress={restoreFromDrive}
        />
      </View>
    </View>
  );
};

export default BackUpAndRestoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2EDFD",
  },
});
