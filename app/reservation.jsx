import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTaxiStore } from "../store/useTaxiStore";

const PRIMARY = "#FFBE00";
const BLACK = "#1A1A1A";
const GRAY_LIGHT = "#F5F5F5";
const ORANGE_RED = "#FF6A00";

export default function ReservationScreen() {
  const {
    departure,
    destination,
    filteredLocations,
    showSuggestions,
    selectedDestination,
    distance,
    price,

    setDeparture,
    setDestination,
    pickDestination,
  } = useTaxiStore();

  return (
    <View style={styles.container}>
      {/* ---------------- HEADER ---------------- */}
      <Animated.View entering={FadeInDown.delay(100)} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Réserver un Taxi</Text>

        <View style={{ width: 40 }} />
      </Animated.View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ---------------- INPUTS ---------------- */}
        <Animated.View entering={FadeInDown.delay(200)}>
          {/* Départ Input */}
          <View style={styles.parentInput}>
            <View style={styles.icon}>
              <Ionicons name="location" size={22} color={PRIMARY} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Départ</Text>
              <Text style={styles.input}>{departure}</Text>
            </View>
          </View>

          {/* Destination Input */}
          <View style={styles.parentInput}>
            <View style={styles.icon}>
              <Ionicons name="flag" size={22} color={ORANGE_RED} />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Destination</Text>
              <TextInput
                value={destination}
                onChangeText={setDestination}
                style={styles.input}
                placeholder="Recherche un lieu…"
                placeholderTextColor="#777"
              />
            </View>
          </View>
        </Animated.View>

        {/* ---------------- SUGGESTIONS ---------------- */}
        {showSuggestions && filteredLocations.length > 0 && (
          <Animated.View entering={FadeInDown.delay(300)}>
            <Text style={styles.titre}>Suggestions</Text>

            <View style={styles.suggestions}>
              {filteredLocations.map((loc) => (
                <TouchableOpacity
                  key={loc.id}
                  style={styles.suggestion}
                  onPress={() => pickDestination(loc)}
                >
                  <Ionicons name="location-outline" size={20} color={PRIMARY} />
                  <Text style={styles.locName}>{loc.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}

        {/* ---------------- POPULAR DESTINATIONS (quand pas de suggestions) ---------------- */}
        {!showSuggestions && !selectedDestination && (
          <Animated.View entering={FadeInDown.delay(300)}>
            <Text style={styles.titre}>Destinations populaires</Text>

            <View style={styles.suggestions}>
              {useTaxiStore.getState().filteredLocations.length === 0 &&
                // Afficher toutes les locations comme populaires
                require("../data/taxidata").locations.slice(0, 6).map((loc) => (
                  <TouchableOpacity
                    key={loc.id}
                    style={styles.suggestion}
                    onPress={() => pickDestination(loc)}
                  >
                    <Ionicons name="location-outline" size={20} color={PRIMARY} />
                    <Text style={styles.locName}>{loc.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </Animated.View>
        )}

        {/* ---------------- TARIFS (seulement si distance & prix existent) ---------------- */}
        {distance && price && (
          <Animated.View entering={FadeInDown.delay(400)}>
            <View style={styles.parentTarifs}>
              <View style={styles.priceRow}>
                {/* Distance */}
                <View style={styles.priceItem}>
                  <Ionicons name="navigate" size={24} color={PRIMARY} />
                  <Text style={styles.priceLabel}>Distance</Text>
                  <Text style={styles.priceValue}>{distance.toFixed(2)} km</Text>
                </View>

                {/* Prix */}
                <View style={styles.priceItem}>
                  <Ionicons name="cash" size={24} color={PRIMARY} />
                  <Text style={styles.priceLabel}>Prix estimé</Text>
                  <Text style={styles.priceValue}>{price.toFixed(2)} DH</Text>
                </View>
              </View>

              {/* Breakdown */}
              <View style={styles.priceDetails}>
                <View style={styles.priceDetailRow}>
                  <Text style={styles.priceDetailLabel}>Prise en charge</Text>
                  <Text style={styles.priceDetailValue}>7.00 DH</Text>
                </View>

                <View style={styles.priceDetailRow}>
                  <Text style={styles.priceDetailLabel}>
                    Prix/km (×{distance.toFixed(2)})
                  </Text>
                  <Text style={styles.priceDetailValue}>
                    {(price - 7).toFixed(2)} DH
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
        )}

        {/* ---------------- INFO ---------------- */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.info}>
          <Ionicons name="information-circle" size={20} color={PRIMARY} />
          <Text style={styles.infoText}>
            Un taxi proche de votre position sera notifié instantanément
          </Text>
        </Animated.View>
      </ScrollView>

      {/* ---------------- CONFIRM BUTTON ---------------- */}
      <Animated.View entering={FadeInDown.delay(600)} style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (!selectedDestination) {
              alert("Veuillez sélectionner une destination");
              return;
            }
            router.push("enCours");
          }}
          style={[
            styles.confirmButton,
            !selectedDestination && styles.confirmButtonDisabled,
          ]}
          disabled={!selectedDestination}
        >
          <Text style={styles.confirmButtonText}>
            {selectedDestination
              ? `Confirmer • ${price?.toFixed(2)} DH`
              : "Choisissez une destination"}
          </Text>
          {selectedDestination && (
            <Ionicons name="checkmark-circle" size={24} color={BLACK} />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

/* ----------------------- STYLES ----------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: PRIMARY,
    shadowColor: "#000",
    elevation: 10,
  },

  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: BLACK,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: BLACK,
  },

  scrollContent: {
    paddingBottom: 100,
  },

  parentInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: GRAY_LIGHT,
    marginTop: 15,
    padding: 12,
    width: "92%",
    alignSelf: "center",
    borderRadius: 12,
    shadowColor: "#000",
    elevation: 4,
  },

  icon: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 50,
  },

  label: {
    fontWeight: "700",
    fontSize: 14,
    color: BLACK,
  },

  input: {
    fontSize: 16,
    color: BLACK,
    marginTop: 2,
  },

  titre: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginLeft: 18,
    color: BLACK,
  },

  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 15,
    width: "92%",
    alignSelf: "center",
  },

  suggestion: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: GRAY_LIGHT,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },

  locName: {
    fontSize: 15,
    fontWeight: "600",
    color: BLACK,
  },

  parentTarifs: {
    width: "92%",
    alignSelf: "center",
    padding: 18,
    backgroundColor: BLACK,
    borderRadius: 16,
    marginTop: 20,
    elevation: 6,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },

  priceItem: {
    gap: 5,
    alignItems: "center",
    flex: 1,
  },

  priceLabel: {
    fontSize: 12,
    color: "#ccc",
  },

  priceValue: {
    fontSize: 26,
    fontWeight: "bold",
    color: PRIMARY,
  },

  priceDetails: {
    backgroundColor: "#2A2A2A",
    borderRadius: 12,
    padding: 14,
  },

  priceDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  priceDetailLabel: {
    fontSize: 13,
    color: "#ddd",
  },

  priceDetailValue: {
    fontSize: 13,
    color: PRIMARY,
    fontWeight: "600",
  },

  info: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
    padding: 12,
    width: "92%",
    alignSelf: "center",
    backgroundColor: GRAY_LIGHT,
    borderRadius: 14,
    elevation: 3,
  },

  infoText: {
    fontSize: 13,
    fontWeight: "600",
    color: BLACK,
    flex: 1,
  },

  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  confirmButton: {
    backgroundColor: PRIMARY,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 16,
    borderRadius: 18,
    elevation: 6,
  },

  confirmButtonDisabled: {
    backgroundColor: "#ccc",
  },

  confirmButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: BLACK,
  },
});