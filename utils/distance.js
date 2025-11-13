export const calculateDistance = (coord1, coord2) => {
  const R = 6371;
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.latitude)) *
      Math.cos(toRad(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; 
};

const toRad = (value) => (value * Math.PI) / 180;

export const calculatePrice = (distanceKm) => {
  const PRISE_EN_CHARGE = 7; 
  const PRIX_PAR_KM = 3; 

  const total = PRISE_EN_CHARGE + distanceKm * PRIX_PAR_KM;
  return Math.round(total * 100) / 100;
};