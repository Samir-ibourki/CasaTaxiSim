// import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { useLocalSearchParams, router } from "expo-router";
// import { Ionicons } from "@expo/vector-icons";

// export default function TaxiDetails() {
//   const { driver, plate, rating, distance, price } = useLocalSearchParams();

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={26} color="#111" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Détails du Taxi</Text>
//       </View>

//       {/* Card */}
//       <View style={styles.card}>
//         <Image
//           source={{
//             uri: "https://cdn-icons-png.flaticon.com/512/3097/3097144.png",
//           }}
//           style={styles.taxiImage}
//         />

//         <Text style={styles.driverName}>{driver}</Text>
//         <Text style={styles.plate}>🚘 Plaque: {plate}</Text>

//         <View style={styles.infoRow}>
//           <Ionicons name="star" size={20} color="gold" />
//           <Text style={styles.rating}>{rating} / 5</Text>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.row}>
//           <Ionicons name="navigate" size={20} color="#111" />
//           <Text style={styles.text}>Distance: {distance} km</Text>
//         </View>

//         <View style={styles.row}>
//           <Ionicons name="cash" size={20} color="#111" />
//           <Text style={styles.text}>Prix estimé: {price} DH</Text>
//         </View>
//       </View>

//       {/* Button */}
//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => alert("✅ Taxi réservé avec succès !")}
//       >
//         <Ionicons name="checkmark-circle" size={22} color="#fff" />
//         <Text style={styles.buttonText}>Confirmer la réservation</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     paddingTop: 50,
//     alignItems: "center",
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
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 20,
//     padding: 25,
//     width: "90%",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   taxiImage: {
//     width: 80,
//     height: 80,
//     marginBottom: 15,
//   },
//   driverName: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#111",
//   },
//   plate: {
//     fontSize: 15,
//     marginVertical: 4,
//     color: "#444",
//   },
//   infoRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 6,
//   },
//   rating: {
//     marginLeft: 4,
//     fontSize: 16,
//     color: "#333",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#ddd",
//     width: "80%",
//     marginVertical: 15,
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 4,
//   },
//   text: {
//     fontSize: 16,
//     marginLeft: 8,
//     color: "#333",
//   },
//   button: {
//     position: "absolute",
//     bottom: 40,
//     backgroundColor: "#111",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 30,
//     paddingVertical: 14,
//     borderRadius: 30,
//     gap: 10,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });








import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function reservation() {
  return (
    <SafeAreaView style={{flex:1 , justifyContent: 'center' , alignItems: 'center'}}>
      <Text>reservation</Text>
    </SafeAreaView>
  )
}









