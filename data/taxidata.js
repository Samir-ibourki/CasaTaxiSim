export const locations = [
  {
    id: "1",
    name: "Boulevard Zerktouni",
    coordinates: { latitude: 33.5861, longitude: -7.6242 },
  },
  {
    id: "2",
    name: "Gare Casa-Voyageurs",
    coordinates: { latitude: 33.5895, longitude: -7.6039 },
  },
  {
    id: "3",
    name: "Morocco Mall",
    coordinates: { latitude: 33.5722, longitude: -7.6925 },
  },
  {
    id: "4",
    name: "Twin Center",
    coordinates: { latitude: 33.5869, longitude: -7.6324 },
  },
  {
    id: "5",
    name: "Mosquée Hassan II",
    coordinates: { latitude: 33.6083, longitude: -7.6325 },
  },
  {
    id: "6",
    name: "Marina de Casablanca",
    coordinates: { latitude: 33.6087, longitude: -7.6316 },
  },
  {
    id: "7",
    name: "Quartier des Habous",
    coordinates: { latitude: 33.5788, longitude: -7.6124 },
  },
  // {
  //   id: '8',
  //   name: 'Ain Diab',
  //   coordinates: { latitude: 33.5889, longitude: -7.6920 },
  // },
  // {
  //   id: '9',
  //   name: 'Boulevard Zerktouni',
  //   coordinates: { latitude: 33.5861, longitude: -7.6242 },
  // },
  // {
  //   id: '10',
  //   name: 'Marché Central',
  //   coordinates: { latitude: 33.5965, longitude: -7.6149 },
  // },
];

export const region = {
  latitude: 33.5861,
  longitude: -7.6242,
  latitudeDelta: 0.05,
  longitudeDelta: 0.06,
};

export const availableTaxis = [
  {
    id: "taxi1",
    driver: "Ahmed Benali",
    plate: "A-12345-CASA",
    rating: 4.8,
    coordinates: { latitude: 33.5895, longitude: -7.6039 }, // Gare Casa-Voyageurs
  },
  {
    id: "taxi2",
    driver: "Youssef El Amrani",
    plate: "B-67890-CASA",
    rating: 4.6,
    coordinates: { latitude: 33.5869, longitude: -7.6324 }, // Twin Center
  },
  {
    id: "taxi3",
    driver: "Khalid Mansouri",
    plate: "C-11223-CASA",
    rating: 4.9,
    coordinates: { latitude: 33.6083, longitude: -7.6325 }, // Mosquée Hassan II
  },
  {
    id: "taxi4",
    driver: "Hicham Rami",
    plate: "D-44556-CASA",
    rating: 4.5,
    coordinates: { latitude: 33.5788, longitude: -7.6124 }, // Quartier des Habous
  },
  {
    id: "taxi5",
    driver: "Samir Laaroussi",
    plate: "E-77889-CASA",
    rating: 4.7,
    coordinates: { latitude: 33.5889, longitude: -7.692 }, // Ain Diab
  },
  {
    id: "taxi6",
    driver: "Omar Zahraoui",
    plate: "F-99001-CASA",
    rating: 4.9,
    coordinates: { latitude: 33.5722, longitude: -7.6925 }, // Morocco Mall
  },
];
