import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="maps" />
      <Stack.Screen
        name="reservation"
        // options={{
        //   presentation: "formSheet",
        //   sheetAllowedDetents: [0.7, 0.8],
        //   sheetGrabberVisible: true,
        //   sheetCornerRadius:30,
          

          
        // }}
      />
    </Stack>
  );
}
