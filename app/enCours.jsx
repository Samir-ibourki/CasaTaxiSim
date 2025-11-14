import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { availableTaxis } from "../data/taxidata";
import { calculateDistance, calculatePrice } from "../utils/distance";

export default function RideTrackingScreen() {
  // Trip data (from route params in real app)
  const destination = {
    name: "Morocco Mall",
    coordinates: { latitude: 33.5722, longitude: -7.6925 },
  };

  const userPosition = { latitude: 33.5861, longitude: -7.6242 }; // Depart
  const selectedTaxi = availableTaxis[0];

  // States
  const [taxiPosition, setTaxiPosition] = useState({
    latitude: 33.588,
    longitude: -7.615,
  });
  const [rideStatus, setRideStatus] = useState("arriving"); // arriving, in_progress, completed
  const [timer, setTimer] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(7); // Prix de base
  const [distance, setDistance] = useState(0);

  const mapRef = useRef(null);

  // Animations
  const pulseScale = useSharedValue(1);
  const priceScale = useSharedValue(1);
  const driverCardY = useSharedValue(100);

  // Pulse animation for taxi marker
  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.ease }),
        withTiming(1, { duration: 1000, easing: Easing.ease })
      ),
      -1,
      false
    );
  }, []);

  // Slide up driver card
  useEffect(() => {
    driverCardY.value = withSpring(0, { damping: 15 });
  }, []);

  // Simulate taxi movement towards user
  useEffect(() => {
    if (rideStatus === "arriving") {
      const interval = setInterval(() => {
        setTaxiPosition((prev) => {
          const latDiff = userPosition.latitude - prev.latitude;
          const lonDiff = userPosition.longitude - prev.longitude;
          const step = 0.0003;

          const newLat = prev.latitude + latDiff * step;
          const newLon = prev.longitude + lonDiff * step;

          // Check if taxi arrived at user
          const distToUser = calculateDistance(
            { latitude: newLat, longitude: newLon },
            userPosition
          );

          if (distToUser < 0.05) {
            // Arrived!
            setRideStatus("in_progress");
            Alert.alert(
              "🚕 Taxi Arrivé!",
              "Votre chauffeur est là. Bon voyage!"
            );
          }

          return { latitude: newLat, longitude: newLon };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [rideStatus]);

  // Simulate trip in progress (taxi + user going to destination)
  useEffect(() => {
    if (rideStatus === "in_progress") {
      const interval = setInterval(() => {
        setTaxiPosition((prev) => {
          const latDiff = destination.coordinates.latitude - prev.latitude;
          const lonDiff = destination.coordinates.longitude - prev.longitude;
          const step = 0.0005;

          const newLat = prev.latitude + latDiff * step;
          const newLon = prev.longitude + lonDiff * step;

          // Check if arrived at destination
          const distToDest = calculateDistance(
            { latitude: newLat, longitude: newLon },
            destination.coordinates
          );

          if (distToDest < 0.1) {
            setRideStatus("completed");
            Alert.alert(
              "✅ Course Terminée!",
              `Destination atteinte!\nPrix total: ${currentPrice.toFixed(
                2
              )} DH`,
              [{ text: "OK", onPress: () => router.replace("maps") }]
            );
          }

          return { latitude: newLat, longitude: newLon };
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [rideStatus, currentPrice]);

  // Timer and price increment
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);

      if (rideStatus === "in_progress") {
        // Distance parcourue
        const dist = calculateDistance(userPosition, taxiPosition);
        setDistance(dist);

        // Prix qui augmente (3 DH/km)
        const newPrice = calculatePrice(dist);
        setCurrentPrice(newPrice);

        // Animate price change
        priceScale.value = withSequence(withSpring(1.1), withSpring(1));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [rideStatus, taxiPosition]);

  // Center map on taxi
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...taxiPosition,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        },
        1000
      );
    }
  }, [taxiPosition]);

  // Cancel ride
  const cancelRide = () => {
    Alert.alert("Annuler la course ?", "Êtes-vous sûr de vouloir annuler ?", [
      { text: "Non", style: "cancel" },
      {
        text: "Oui, annuler",
        style: "destructive",
        onPress: () => router.replace("maps"),
      },
    ]);
  };

  // Format timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Animated styles
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const priceStyle = useAnimatedStyle(() => ({
    transform: [{ scale: priceScale.value }],
  }));

  const driverCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: driverCardY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...taxiPosition,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={false}
      >
        {/* User Position */}
        <Marker coordinate={userPosition} title="Vous" pinColor="blue" />

        {/* Destination */}
        <Marker
          coordinate={destination.coordinates}
          title={destination.name}
          pinColor="red"
        />

        {/* Taxi Position with pulse */}
        <Marker coordinate={taxiPosition} anchor={{ x: 0.5, y: 0.5 }}>
          <Animated.View style={[styles.taxiMarker, pulseStyle]}>
            <Ionicons name="car-sport" size={28} color="#000" />
          </Animated.View>
        </Marker>

        {/* Route Line */}
        {rideStatus === "in_progress" && (
          <Polyline
            coordinates={[userPosition, taxiPosition, destination.coordinates]}
            strokeColor="#FFBE00"
            strokeWidth={4}
            lineDashPattern={[10, 5]}
          />
        )}
      </MapView>

      {/* Status Badge */}
      <Animated.View
        entering={FadeInDown.delay(200)}
        style={styles.statusBadge}
      >
        <View
          style={[
            styles.statusDot,
            rideStatus === "arriving" && styles.statusDotOrange,
          ]}
        />
        <Text style={styles.statusText}>
          {rideStatus === "arriving" ? "Taxi en route..." : "Course en cours"}
        </Text>
      </Animated.View>

      {/* Timer & Price Card */}
      <Animated.View entering={FadeIn.delay(300)} style={styles.statsCard}>
        <View style={styles.statItem}>
          <Ionicons name="time-outline" size={24} color="#4CAF50" />
          <View>
            <Text style={styles.statLabel}>Durée</Text>
            <Text style={styles.statValue}>{formatTime(timer)}</Text>
          </View>
        </View>

        <View style={styles.statDivider} />

        <Animated.View style={[styles.statItem, priceStyle]}>
          <Ionicons name="cash-outline" size={24} color="#FFBE00" />
          <View>
            <Text style={styles.statLabel}>Prix</Text>
            <Text style={styles.statValue}>{currentPrice.toFixed(2)} DH</Text>
          </View>
        </Animated.View>

        {rideStatus === "in_progress" && (
          <>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="navigate-outline" size={24} color="#2196F3" />
              <View>
                <Text style={styles.statLabel}>Distance</Text>
                <Text style={styles.statValue}>{distance.toFixed(2)} km</Text>
              </View>
            </View>
          </>
        )}
      </Animated.View>

      {/* Driver Info Card */}
      <Animated.View style={[styles.driverCard, driverCardStyle]}>
        <View style={styles.driverHeader}>
          <View style={styles.driverInfo}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={32} color="#FFBE00" />
              </View>
              <View style={styles.onlineDot} />
            </View>
            <View style={styles.driverDetails}>
              <Text style={styles.driverName}>{selectedTaxi.driver}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFBE00" />
                <Text style={styles.rating}>{selectedTaxi.rating}</Text>
                <Text style={styles.plate}>• {selectedTaxi.plate}</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Trip Info */}
        <View style={styles.tripInfo}>
          <View style={styles.tripRow}>
            <View style={styles.tripDot} />
            <Text style={styles.tripText} numberOfLines={1}>
              {rideStatus === "arriving"
                ? "Vient vous chercher..."
                : destination.name}
            </Text>
          </View>
        </View>

        {/* Cancel Button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={cancelRide}
          activeOpacity={0.7}
        >
          <Ionicons name="close-circle-outline" size={20} color="#FF5722" />
          <Text style={styles.cancelText}>Annuler la course</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Back Button */}
      <Animated.View entering={FadeInUp.delay(100)} style={styles.backButton}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  map: {
    flex: 1,
  },
  taxiMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFBE00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  statusBadge: {
    position: "absolute",
    top: 60,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1aee",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  statusDotOrange: {
    backgroundColor: "#FF9800",
  },
  statusText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  statsCard: {
    position: "absolute",
    top: 110,
    left: 20,
    right: 20,
    flexDirection: "row",
    backgroundColor: "#1a1a1aee",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#2a2a2a",
    marginHorizontal: 12,
  },
  driverCard: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: "#2a2a2a",
  },
  driverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0a0a0a",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFBE00",
  },
  onlineDot: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#1a1a1a",
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
  },
  plate: {
    fontSize: 13,
    color: "#888",
  },
  callButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#4CAF50",
    alignItems: "center",
    justifyContent: "center",
  },
  tripInfo: {
    backgroundColor: "#0a0a0a",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  tripRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  tripDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFBE00",
  },
  tripText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    flex: 1,
  },
  cancelButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2a2a2a",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  cancelText: {
    fontSize: 15,
    color: "#FF5722",
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1a1a1aee",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
});
