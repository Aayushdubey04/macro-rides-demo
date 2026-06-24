export const routeOptions = [
  {
    id: "R1",
    name: "Central Delhi to East Delhi",
    points: [
      [28.6517, 77.1900], // Karol Bagh
      [28.6488, 77.1975],
      [28.6450, 77.2045],
      [28.6415, 77.2110], // Paharganj side
      [28.6378, 77.2172],
      [28.6337, 77.2225], // Connaught Place edge
      [28.6305, 77.2275],
      [28.6268, 77.2338], // Mandi House
      [28.6235, 77.2395],
      [28.6195, 77.2448], // ITO / Pragati Maidan side
      [28.6165, 77.2508],
      [28.6198, 77.2580],
      [28.6240, 77.2650],
      [28.6285, 77.2725],
      [28.6304, 77.2775], // Laxmi Nagar
    ],
  },
  {
    id: "R2",
    name: "Old Delhi to India Gate",
    points: [
      [28.6562, 77.2410], // Old Delhi
      [28.6520, 77.2385],
      [28.6472, 77.2355],
      [28.6425, 77.2328],
      [28.6375, 77.2300],
      [28.6328, 77.2275],
      [28.6280, 77.2255], // Mandi House / Barakhamba side
      [28.6235, 77.2250],
      [28.6190, 77.2258],
      [28.6155, 77.2276],
      [28.6129, 77.2295], // India Gate
      [28.6095, 77.2328],
      [28.6065, 77.2365],
    ],
  },
  {
    id: "R3",
    name: "Karol Bagh to Pragati Maidan",
    points: [
      [28.6510, 77.1900], // Karol Bagh
      [28.6480, 77.1970],
      [28.6450, 77.2040],
      [28.6418, 77.2105],
      [28.6385, 77.2165],
      [28.6345, 77.2220],
      [28.6300, 77.2260],
      [28.6265, 77.2310],
      [28.6230, 77.2365],
      [28.6190, 77.2430],
      [28.6160, 77.2480],
      [28.6140, 77.2520], // Pragati Maidan
    ],
  },
  {
    id: "R4",
    name: "Connaught Place to Akshardham",
    points: [
      [28.6325, 77.2190], // Connaught Place
      [28.6300, 77.2240],
      [28.6275, 77.2295],
      [28.6250, 77.2350],
      [28.6220, 77.2410],
      [28.6190, 77.2470],
      [28.6175, 77.2530],
      [28.6195, 77.2600],
      [28.6225, 77.2668],
      [28.6260, 77.2735],
      [28.6230, 77.2790],
      [28.6180, 77.2815],
      [28.6135, 77.2770], // Akshardham side
    ],
  },
];
export const pickupPoints = [
  { id: "P1", name: "Karol Bagh Pickup", lat: 28.6508, lng: 77.1920 },
  { id: "P2", name: "Paharganj Pickup", lat: 28.6430, lng: 77.2100 },
  { id: "P3", name: "Connaught Place Pickup", lat: 28.6325, lng: 77.2190 },
  { id: "P4", name: "Barakhamba Pickup", lat: 28.6280, lng: 77.2250 },
  { id: "P5", name: "Mandi House Pickup", lat: 28.6245, lng: 77.2340 },
  { id: "P6", name: "ITO Pickup", lat: 28.6287, lng: 77.2410 },
  { id: "P7", name: "Pragati Maidan Pickup", lat: 28.6148, lng: 77.2430 },
  { id: "P8", name: "Laxmi Nagar Pickup", lat: 28.6295, lng: 77.2760 },
  { id: "P9", name: "Akshardham Pickup", lat: 28.6135, lng: 77.2770 },
  { id: "P10", name: "Outer Pickup 1", lat: 28.6600, lng: 77.2200 },
  { id: "P11", name: "Outer Pickup 2", lat: 28.6450, lng: 77.2450 },
  { id: "P12", name: "Outer Pickup 3", lat: 28.6100, lng: 77.2150 },
  { id: "P13", name: "Outer Pickup 4", lat: 28.6000, lng: 77.2600 },
  { id: "P14", name: "Outer Pickup 5", lat: 28.6380, lng: 77.2950 },
  { id: "P15", name: "Outer Pickup 6", lat: 28.6050, lng: 77.2900 },
];

export const zones = [
  {
    id: "Z1",
    name: "Macro Central Zone",
    coordinates: [
      [28.6450, 77.1850],
      [28.6600, 77.1850],
      [28.6600, 77.2250],
      [28.6450, 77.2250],
    ],
  },
  {
    id: "Z2",
    name: "Macro Transit Zone",
    coordinates: [
      [28.6150, 77.2150],
      [28.6400, 77.2150],
      [28.6400, 77.2550],
      [28.6150, 77.2550],
    ],
  },
  {
    id: "Z3",
    name: "Macro East Zone",
    coordinates: [
      [28.6050, 77.2550],
      [28.6380, 77.2550],
      [28.6380, 77.3000],
      [28.6050, 77.3000],
    ],
  },
];