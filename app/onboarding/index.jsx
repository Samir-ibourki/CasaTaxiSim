import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { onboardingData } from "../../data/data";

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentSlide, setCurrentSlide] = useState([]);

  const opacity = useSharedValue(1);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    opacity.value = 1;
    translateX.value = 20;

    opacity.value = withTiming(1, { duration: 600 });
    translateX.value = withSpring(0, {
      duration: 2000,
      damping: 20,
      stiffness: 100,
    });
  }, [currentIndex]);

  const nextSlide = () => {
    if (onboardingData && currentIndex < (onboardingData?.length ?? 0) - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("maps");
    }
  };
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (onboardingData) {
      setCurrentSlide(onboardingData[currentIndex]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, onboardingData]);

  return (
    <SafeAreaView style={styles.safe}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <Image
          source={currentSlide?.image}
          resizeMode="contain"
          style={styles.image}
        />
        <Text style={styles.title}>{currentSlide?.title}</Text>
        <Text style={styles.subtitle}>{currentSlide?.description}</Text>

        <View style={styles.btns}>
          {currentIndex > 0 && (
            <TouchableOpacity onPress={prevSlide}>
              <Text style={styles.prev}>Prev</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={nextSlide}>
            <Text style={styles.next}>
              {currentIndex === onboardingData?.length - 1
                ? "Get Started"
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#22272B" },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#ebe8e8ff",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  btns: {
    flexDirection: "row",
    gap: 20,
  },
  next: {
    backgroundColor: "#FFBE00",
    color: "#22272B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    fontWeight: "bold",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFBE00",
    fontSize: 18,
    letterSpacing: 2,
  },
  prev: {
    color: "#fff",
    borderWidth: 2,
    borderColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    overflow: "hidden",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 2,
  },
});
