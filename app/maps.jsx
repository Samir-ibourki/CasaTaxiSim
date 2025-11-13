import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { availableTaxis, locations, region } from "../data/taxidata";

export default function MapScreen() {
  //const [state, setState] = useState(region);
  const [taxis, setTaxis] = useState(availableTaxis);
  const [location, setLocation] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaxis((prevTaxis) =>
        prevTaxis.map((taxi) => ({
          ...taxi,
          coordinates: {
            latitude:
              taxi.coordinates.latitude + (Math.random() - 0.5) * 0.0005,
            longitude:
              taxi.coordinates.longitude + (Math.random() - 0.5) * 0.0005,
          },
        }))
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Erreur", "Permission GPS refusée");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation.coords);
    })();
  }, []);

  const backToOrigin = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  };

  // if (!location) {
  //   return (
  //     <View
  //       style={[
  //         styles.container,
  //         { justifyContent: "center", alignItems: "center" },
  //       ]}
  //     >
  //       <ActivityIndicator size="large" color="#FFBE00" />
  //       <Text>Chargement de la carte...</Text>
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        followsUserLocation={true}
        zoomControlEnabled
      >
        {location && <Marker coordinate={location} pinColor="blue" />}

        {taxis.map((taxi) => (
          <Marker
            title={taxi.driver}
            key={taxi.id}
            coordinate={taxi.coordinates}
            pinColor="gold"
            description={`Plaque: ${taxi.plate} ⭐${taxi.rating}`}
          />
        ))}
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            pinColor="red"
            coordinate={loc.coordinates}
            title={loc.name}
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.locateButton} onPress={backToOrigin}>
        <Ionicons name="locate" size={28} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("reservation")}>
        <Text style={styles.button}>Réserver Taxi 🚕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  locateButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 50,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  button: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#070707ff",
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontWeight: "bold",
    color: "#eee",
    borderRadius: 30,
    letterSpacing: 3,
  },
});
