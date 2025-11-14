//  const [departure, setDeparture] = useState("Ma position actuelle");
//   const [destination, setDestination] = useState("");
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [distance, setDistance] = useState(null);
//   const [price, setPrice] = useState(null);

import { create } from "zustand";
import { locations } from "../data/taxidata";
import { calculateDistance, calculatePrice } from "../utils/distance";

export const useTaxiStore = create((set, get) => ({
  // FORM STATES

   departure: "Ma position actuelle",
  destination: "",
  filteredLocations: [],
  showSuggestions: false,
  selectedDestination: null,
  distance: null,
  price: null,

  setDeparture: (value) => set({ departure: value }),

  setDestination: (value) => {
    const filtered = locations.filter((loc) =>
      loc.name.toLowerCase().includes(value.toLowerCase())
    );
    set({
      destination: value,
      filteredLocations: filtered,
      showSuggestions: filtered.length > 0,
    });
  },

  pickDestination: (loc) => {
    const userCoords = { latitude: 33.5902, longitude: -7.6200 }; 
    const dist = calculateDistance(userCoords, loc.coordinates);
    const pr = calculatePrice(dist);

    set({
      destination: loc.name,
      selectedDestination: loc,
      filteredLocations: [],
      showSuggestions: false,
      distance: dist,
      price: pr,
    });
  },

  computeDistanceAndPrice: () => {
    const { selectedDestination, userLocation } = get();
    if (!selectedDestination || !userLocation) return;

    const dist = calculateDistance(
      userLocation,
      selectedDestination.coordinates
    );
    const pr = calculatePrice(dist);

    set({ distance: dist, price: pr });
  },

  resetReservation: () =>
    set({
      departure: "Ma position actuelle",
      destination: "",
      filteredLocations: [],
      selectedDestination: null,
      showSuggestions: false,
      distance: null,
      price: null,
    }),

  // USER LOCATION (fake)

  userLocation: {
    latitude: 32.3372,
    longitude: 6.3608,
  },
}));
