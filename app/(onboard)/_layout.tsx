import { Stack } from "expo-router";

export default function OnBoardLayout() {
  return (
    <Stack>
      <Stack.Screen name="onboard" options={{ headerShown: false }} />
    </Stack>
  );
}
