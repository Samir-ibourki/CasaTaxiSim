// import { useEffect, useState } from "react";
// import { StyleSheet, View } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { availableTaxis, region, region } from "../data/taxidata";

// export default function MainMapScreen() {
//   const [taxis, setTaxis] = useState(availableTaxis);
//   const [region,setRegion] = useState(region)

// const [userLocation, setUserLocation] = useState(null);
//   const mapRef = useRef(null);

// useEffect(() => {
//     const fakeUser = {
//       coords: { latitude: 33.5902, longitude: -7.6200 },
//     };
//     setUserLocation(fakeUser.coords);
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTaxis((prevTaxis) =>
//         prevTaxis.map((taxi) => ({
//           ...taxi,
//           coordinates: {
//             latitude: taxi.coordinates.latitude + (Math.random() - 0.5) * 0.0005,
//             longitude:
//               taxi.coordinates.longitude + (Math.random() - 0.5) * 0.0005,
//           },
//         }))
//       );
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

// const centerOnUser = () => {
//     if (userLocation && mapRef.current) {
//       mapRef.current.animateToRegion(
//         {
//           ...region,
//           latitude: userLocation.latitude,
//           longitude: userLocation.longitude,
//         },
//         1000
//       );
//     }
//   };
  
//   return (
//     <View style={styles.container}>
//       <MapView style={styles.map} initialRegion={region} zoomControlEnabled>
//         {userLocation && (
//           <Marker
//             coordinate={userLocation}
//             title="Vous êtes ici"
//             pinColor="blue"
//           />
//         )}
//         {locations.map((loc) => (
//           <Marker
//             key={loc.id}
//             coordinate={loc.coordinates}
//             title={loc.name}
//             pinColor="red"
//           />
//         ))}

//  {taxis.map((taxi) => (
//           <Marker
//             key={taxi.id}
//             coordinate={taxi.coordinates}
//             title={taxi.driver}
//             description={`Plaque: ${taxi.plate} ⭐${taxi.rating}`}
//             pinColor="gold"
//           />
//         ))}

//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
//   button: {
//     position: "absolute",
//     bottom: 40,
//     left: "20%",
//     right: "20%",
//     backgroundColor: "#111",
//     padding: 14,
//     borderRadius: 25,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontWeight: "bold" },
// });
import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { availableTaxis, locations } from "../data/taxidata";


export default function MapScreen() {
  const [taxis, setTaxis] = useState(availableTaxis);
  const [region, setRegion] = useState({
    latitude: 33.5895,
    longitude: -7.6039,
    latitudeDelta: 0.06,
    longitudeDelta: 0.06,
  });
  const [userLocation, setUserLocation] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fakeUser = {
      coords: { latitude: 33.5902, longitude: -7.6200 },
    };
    setUserLocation(fakeUser.coords);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaxis((prevTaxis) =>
        prevTaxis.map((taxi) => ({
          ...taxi,
          coordinates: {
            latitude: taxi.coordinates.latitude + (Math.random() - 0.5) * 0.0005,
            longitude:
              taxi.coordinates.longitude + (Math.random() - 0.5) * 0.0005,
          },
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const centerOnUser = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...region,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        1000
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={region}
      >
       
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Vous êtes ici"
            pinColor="blue"
          />
        )}

        
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={loc.coordinates}
            title={loc.name}
            pinColor="red"
          />
        ))}

       
        {taxis.map((taxi) => (
          <Marker
            key={taxi.id}
            coordinate={taxi.coordinates}
            title={taxi.driver}
            description={`Plaque: ${taxi.plate} ⭐${taxi.rating}`}
            pinColor="gold"
          />
        ))}
      </MapView>

      <TouchableOpacity style={styles.button} onPress={centerOnUser}>
        <Text style={styles.buttonText}>📍 Revenir à ma position</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  button: {
    position: "absolute",
    bottom: 40,
    left: "20%",
    right: "20%",
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
