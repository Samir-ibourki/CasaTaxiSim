// //import { View, Text } from 'react-native'
// import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import { SafeAreaView } from "react-native-safe-area-context";

// //let key = 'AIzaSyBCB2E3yrXD4XqX6CJH_3lh0BZEzVYl5Mo'
// const casablancaRegion = {
//   latitude: 33.5731,
//   longitude: -7.5898,
//   latitudeDelta: 0.05,
//   longitudeDelta: 0.05,
// };
// export default function Maps() {
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <MapView
//         style={{ width: "100%", height: "100%" }}
//         provider={PROVIDER_GOOGLE}
//         initialRegion={casablancaRegion}
//         showsUserLocation
//         showsMyLocationButton
//       />
//     </SafeAreaView>
//   );
// }

// import { View, Text } from 'react-native'
import { Image, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { AVAILABLE_TAXIS, CASA_CENTER, USER_POSITION } from "../data/taxidata";

export default function home() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={CASA_CENTER}>
        <Marker
          coordinate={USER_POSITION}
          pinColor="blue"
          title="You are here"
        />
        {AVAILABLE_TAXIS.map((taxi) => (
          <Marker
            key={taxi.id}
            coordinate={{
              latitude: taxi.latitude,
              longitude: taxi.longitude,
            }}
          >
            <Image
              source={require("../assets/icon.jpg")}

            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});