import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GDrive,ListQueryBuilder,MimeTypes } from '@robinbobin/react-native-google-drive-api-wrapper';
import * as FileSystem from 'expo-file-system';

const BACKGROUND_TASK_NAME = 'background-backup-task';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    const isAutoBackupEnabled = await AsyncStorage.getItem('isAutoBackupEnabled');
    if (isAutoBackupEnabled === 'true') {
      const userData = await AsyncStorage.getItem('userInfo');
      if (!userData) {
        console.log('No user data found, skipping backup.');
        return BackgroundFetch.BackgroundFetchResult.NoData;
      }

      const drive = new GDrive();
      drive.accessToken = (await GoogleSignin.getTokens()).accessToken;
      const folderId = await checkOrCreateFolder(drive, `Inkwell-${JSON.parse(userData).user?.email}`);

      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory as string);
      const jsonFiles = files.filter(file => file.endsWith('.json'));

      await Promise.all(jsonFiles.map(async (fileName) => {
        const fileUri = FileSystem.documentDirectory + fileName;
        await uploadFileToDrive(folderId, fileName, fileUri, drive);
      }));

      console.log('Background backup completed');
      return BackgroundFetch.BackgroundFetchResult.NewData;
    }
    console.log('Auto backup is disabled');
    return BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    console.error('Error during background backup:', error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

const registerBackgroundFetch = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 60 * 60 * 24, // 24 hours
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('Background fetch registered');
  } catch (err) {
    console.log('Background fetch registration failed:', err);
  }
};

const checkOrCreateFolder = async (drive:GDrive, folderName:any) => {
  const folder = await drive.files.createIfNotExists(
    {
      q: new ListQueryBuilder()
        .e('name', folderName)
        .and()
        .e('mimeType', MimeTypes.FOLDER)
        .and()
        .in('root', 'parents'),
    },
    drive.files.newMetadataOnlyUploader().setRequestBody({
      name: folderName,
      mimeType: MimeTypes.FOLDER,
      parents: ['root'],
    })
  );
  return (folder.result as any).id;
};

const uploadFileToDrive = async (folderId:any, fileName:any, fileUri:any, drive:any) => {
  const response = await FileSystem.readAsStringAsync(fileUri, {
    encoding: FileSystem.EncodingType.UTF8,
  });

  const existingFiles = await drive.files.list({
    q: new ListQueryBuilder()
      .e('name', fileName)
      .and()
      .in(folderId, 'parents'),
  });

  if (existingFiles.files.length > 0) {
    const fileId = existingFiles.files[0].id;
    await drive.files.delete(fileId);
  }

  const uploader = drive.files
    .newMultipartUploader()
    .setData(response, MimeTypes.JSON_UTF8)
    .setRequestBody({
      name: fileName,
      parents: [folderId],
    });
  await uploader.execute();
};

export { registerBackgroundFetch };
