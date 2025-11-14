import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInRight,
  
  Layout,
  SlideInLeft,
  
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

// Mock data - initial trips
const INITIAL_TRIPS = [
  {
    id: "1",
    date: "2025-01-10",
    time: "14:30",
    from: "Boulevard Zerktouni",
    to: "Morocco Mall",
    distance: "8.5 km",
    duration: "18 min",
    price: "32.50 DH",
    driver: "Ahmed Benali",
    rating: 4.8,
  },
  {
    id: "2",
    date: "2025-01-09",
    time: "09:15",
    from: "Gare Casa-Voyageurs",
    to: "Twin Center",
    distance: "3.2 km",
    duration: "12 min",
    price: "16.60 DH",
    driver: "Youssef El Amrani",
    rating: 4.6,
  },
  {
    id: "3",
    date: "2025-01-08",
    time: "18:45",
    from: "Marina de Casablanca",
    to: "Mosquée Hassan II",
    distance: "1.8 km",
    duration: "8 min",
    price: "12.40 DH",
    driver: "Khalid Mansouri",
    rating: 4.9,
  },
  {
    id: "4",
    date: "2025-01-07",
    time: "11:20",
    from: "Boulevard Zerktouni",
    to: "Quartier des Habous",
    distance: "5.4 km",
    duration: "15 min",
    price: "23.20 DH",
    driver: "Hicham Rami",
    rating: 4.5,
  },
  {
    id: "5",
    date: "2025-01-06",
    time: "16:00",
    from: "Twin Center",
    to: "Ain Diab",
    distance: "7.2 km",
    duration: "20 min",
    price: "28.60 DH",
    driver: "Samir Laaroussi",
    rating: 4.7,
  },
  {
    id: "6",
    date: "2025-01-05",
    time: "13:30",
    from: "Morocco Mall",
    to: "Gare Casa-Voyageurs",
    distance: "6.8 km",
    duration: "17 min",
    price: "27.40 DH",
    driver: "Omar Zahraoui",
    rating: 4.9,
  },
];

// Swipeable Trip Card Component
const SwipeableTripCard = ({ trip, onDelete }) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(120);
  const opacity = useSharedValue(1);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      if (e.translationX < -100) {
        // Delete threshold
        translateX.value = withTiming(-400, { duration: 300 });
        itemHeight.value = withTiming(0, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 }, () => {
          onDelete(trip.id);
        });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    height: itemHeight.value,
    opacity: opacity.value,
  }));

  const deleteButtonStyle = useAnimatedStyle(() => ({
    opacity: translateX.value < -50 ? 1 : 0,
  }));

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
    if (date.toDateString() === yesterday.toDateString()) return "Hier";

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <View style={styles.swipeContainer}>
      {/* Delete Background */}
      <Animated.View style={[styles.deleteBackground, deleteButtonStyle]}>
        <Ionicons name="trash" size={24} color="#fff" />
        <Text style={styles.deleteText}>Supprimer</Text>
      </Animated.View>

      {/* Card */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.tripCard, animatedStyle]}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>{formatDate(trip.date)}</Text>
              <Text style={styles.time}>{trip.time}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{trip.price}</Text>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={12} color="#FFBE00" />
                <Text style={styles.ratingText}>{trip.rating}</Text>
              </View>
            </View>
          </View>

          {/* Route */}
          <View style={styles.routeContainer}>
            <View style={styles.routeLine}>
              <View style={styles.routeDotStart} />
              <View style={styles.routeDash} />
              <View style={styles.routeDotEnd} />
            </View>
            <View style={styles.routeDetails}>
              <Text style={styles.routeText} numberOfLines={1}>
                {trip.from}
              </Text>
              <Text style={styles.routeText} numberOfLines={1}>
                {trip.to}
              </Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.cardFooter}>
            <View style={styles.statChip}>
              <Ionicons name="navigate-outline" size={14} color="#888" />
              <Text style={styles.statText}>{trip.distance}</Text>
            </View>
            <View style={styles.statChip}>
              <Ionicons name="time-outline" size={14} color="#888" />
              <Text style={styles.statText}>{trip.duration}</Text>
            </View>
            <View style={styles.statChip}>
              <Ionicons name="person-outline" size={14} color="#888" />
              <Text style={styles.statText}>{trip.driver.split(" ")[0]}</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default function HistoryScreen() {
  const [trips, setTrips] = useState(INITIAL_TRIPS);
  const [filter, setFilter] = useState("all"); // all, today, week, month

  // Delete trip
  const deleteTrip = (id) => {
    setTrips((prev) => prev.filter((trip) => trip.id !== id));
  };

  // Calculate stats
  const totalTrips = trips.length;
  const totalSpent = trips.reduce(
    (sum, trip) => sum + parseFloat(trip.price.replace(" DH", "")),
    0
  );
  const avgPrice = totalTrips > 0 ? totalSpent / totalTrips : 0;

  // Filter trips
  const getFilteredTrips = () => {
    const today = new Date().toISOString().split("T")[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    switch (filter) {
      case "today":
        return trips.filter((trip) => trip.date === today);
      case "week":
        return trips.filter((trip) => trip.date >= weekAgo);
      case "month":
        return trips.filter(
          (trip) => trip.date.slice(0, 7) === today.slice(0, 7)
        );
      default:
        return trips;
    }
  };

  const filteredTrips = getFilteredTrips();

  // Empty state
  const EmptyState = () => (
    <Animated.View
      entering={FadeInRight.delay(300)}
      style={styles.emptyContainer}
    >
      <View style={styles.emptyIcon}>
        <Ionicons name="receipt-outline" size={64} color="#444" />
      </View>
      <Text style={styles.emptyTitle}>Aucune course</Text>
      <Text style={styles.emptyText}>
        Vos courses apparaîtront ici
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => router.push("maps")}
      >
        <Text style={styles.emptyButtonText}>Réserver un taxi</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View entering={SlideInLeft.delay(100)} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Historique</Text>
          <TouchableOpacity style={styles.backBtn}>
            <Ionicons name="filter" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        {totalTrips > 0 && (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="car-sport-outline" size={24} color="#FFBE00" />
              <Text style={styles.statValue}>{totalTrips}</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="cash-outline" size={24} color="#4CAF50" />
              <Text style={styles.statValue}>{totalSpent.toFixed(0)} DH</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="trending-up-outline" size={24} color="#2196F3" />
              <Text style={styles.statValue}>{avgPrice.toFixed(0)} DH</Text>
              <Text style={styles.statLabel}>Moyenne</Text>
            </View>
          </View>
        )}
      </Animated.View>

      {/* Filter Chips */}
      {totalTrips > 0 && (
        <Animated.View
          entering={FadeInRight.delay(200)}
          style={styles.filterContainer}
        >
          {["all", "today", "week", "month"].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filter === f && styles.filterChipTextActive,
                ]}
              >
                {f === "all"
                  ? "Tout"
                  : f === "today"
                  ? "Aujourd'hui"
                  : f === "week"
                  ? "Semaine"
                  : "Mois"}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}

      {/* Trips List */}
      {filteredTrips.length > 0 ? (
        <FlatList
          data={filteredTrips}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInRight.delay(100 + index * 50)}
              layout={Layout.springify()}
            >
              <SwipeableTripCard trip={item} onDelete={deleteTrip} />
            </Animated.View>
          )}
        />
      ) : (
        <EmptyState />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  filterChipActive: {
    backgroundColor: "#FFBE00",
    borderColor: "#FFBE00",
  },
  filterChipText: {
    fontSize: 13,
    color: "#888",
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#000",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  swipeContainer: {
    marginBottom: 12,
    position: "relative",
  },
  deleteBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 100,
    backgroundColor: "#FF5722",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  deleteText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
  tripCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  dateContainer: {
    gap: 2,
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  priceContainer: {
    alignItems: "flex-end",
    gap: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFBE00",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "600",
  },
  routeContainer: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  routeLine: {
    width: 20,
    alignItems: "center",
    paddingVertical: 4,
  },
  routeDotStart: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#4CAF50",
  },
  routeDash: {
    flex: 1,
    width: 2,
    backgroundColor: "#2a2a2a",
    marginVertical: 4,
  },
  routeDotEnd: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF5722",
  },
  routeDetails: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  routeText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    gap: 8,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statText: {
    fontSize: 11,
    color: "#888",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#2a2a2a",
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: "#888",
    textAlign: "center",
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: "#FFBE00",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  emptyButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
  },
});