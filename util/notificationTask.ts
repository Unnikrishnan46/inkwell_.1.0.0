import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data, error, executionInfo }) => {
  if (error) {
    console.error("Background notification task error:", error);
    return;
  }
  console.log("Notification received in the background!");
  console.log("Notification data:", data);
  console.log("Execution info:", executionInfo);
  // Handle the notification data as required
});

export const registerBackgroundNotificationTask = async () => {
  try {
    await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    console.log("Background notification task registered successfully!");
  } catch (error) {
    console.error("Failed to register background notification task:", error);
  }
};
