import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        <Stack.Screen
          name="enCours"
          options={{
            presentation: "fullScreenModal",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen name="historique" />
      </Stack>
    </GestureHandlerRootView>
  );
}
