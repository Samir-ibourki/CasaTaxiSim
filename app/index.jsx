import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export default function Index() {
  const progress = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: translateY.value }],
  }));
  useEffect(() => {
    progress.value = withTiming(1, { duration: 1500 });
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
    setTimeout(() => {
      router.replace("onboarding");
    }, 2800);
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.center, animatedStyle]}>
        <Image
          resizeMode="contain"
          source={require("../assets/bgSplash.png")}
        />

        <Text style={styles.subtitle}>
          Book. Simulate. Explore Casablanca like never before.
        </Text>
      </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFBE00",
  },
  center: {
    alignItems: "center",
    gap: 10,
  },

  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#1a1919ff",
  },
  subtitle: {
    position: "absolute",
    top: "75%",
    fontSize: 18,
    textAlign: "center",
    color: "#302e2eff",
    width: 350,
    lineHeight: 25,
    fontWeight: 700,
  },
});
