// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useState } from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import { locations } from "../data/taxidata";
// export default function Reservation() {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null);
//   const [items, setItems] = useState(
//     locations.map((loc) => ({ label: loc.name, value: loc.name }))
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back("maps")}>
//           <Ionicons name="arrow-back" size={26} color="#111" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Détails du Taxi</Text>
//       </View>
//       <DropDownPicker
//         open={open}
//         value={value}
//         items={items}
//         setOpen={setOpen}
//         setValue={setValue}
//         setItems={setItems}
//         placeholder="Choisir une destination"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     paddingTop: 50,
//     paddingHorizontal: 24,
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginLeft: 10,
//   },
// });
import React, { useState } from "react";
import {Text,StyleSheet, ScrollView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
//import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";

//import { calculateDistance, calculatePrice } from "../utils/distance";
import { locations } from "../data/taxidata";

export default function ReservationScreen() {
  // Dropdown states
  const [openDepart, setOpenDepart] =useState(false);
  const [depart, setDepart] =useState(null);
  const [itemsDepart, setItemsDepart] =useState(
    locations.map((loc) => ({ label: loc.name, value: loc }))
  );

  const [openDest, setOpenDest] = React.useState(false);
  const [destination, setDestination] = React.useState(null);
  const [itemsDest, setItemsDest] = React.useState(
    locations.map((loc) => ({ label: loc.name, value: loc }))
  );

  
  //const distanceKm = depart && destination ? calculateDistance(depart.coordinates, destination.coordinates) : 0;
  //const price = distanceKm ? calculatePrice(distanceKm) : 0;

  // const handleConfirm = () => {
  //   alert(`Réservation confirmée!\nDistance: ${distanceKm} km\nPrix: ${price} DH`);
  // };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Réservation Taxi</Text>

      <Text style={styles.label}>Départ</Text>
      <DropDownPicker
        open={openDepart}
        value={depart}
        items={itemsDepart}
        setOpen={setOpenDepart}
        setValue={setDepart}
        setItems={setItemsDepart}
        placeholder="Choisir départ"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={3000}
      />

      
      <Text style={styles.label}>Destination</Text>
      <DropDownPicker
        open={openDest}
        value={destination}
        items={itemsDest}
        setOpen={setOpenDest}
        setValue={setDestination}
        setItems={setItemsDest}
        placeholder="Choisir destination"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        zIndex={2000}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff8f0",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fd6e4b",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: 15,
    color: "#333",
  },
  dropdown: {
    borderColor: "#fd6e4b",
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderColor: "#fd6e4b",
  },
  resultBox: {
    marginTop: 30,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  confirmButton: {
    marginTop: 30,
    borderRadius: 25,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
  },
  confirmGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 25,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
