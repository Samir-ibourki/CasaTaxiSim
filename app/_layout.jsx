
import { Stack } from 'expo-router';

export default function RootLayout() {


  return (
   
      <Stack screenOptions={{headerShown:false,}} >
        <Stack.Screen name="/"/>
       <Stack.Screen name="/onboarding"/>
       <Stack.Screen name="/cart"/>
      </Stack>
     
  );
}
