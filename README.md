# Macro Rides - Zone Boundary + Dynamic Route Corridor Visualization Tool

A working web-based geospatial demo built for the Macro Rides technical evaluation assignment.

This project visualizes a simulated driver route in Delhi NCR, generates a 350-meter dynamic pickup corridor around the route, applies H3-based spatial indexing, and highlights pickup points that are eligible within the route corridor.

The focus of this demo is on the 350m buffer corridor logic, H3 spatial indexing, and map-based visualization rather than real-time GPS data streaming.

---

## Live Demo

**Live Demo:** https://macro-rides-demo.vercel.app/

---

## GitHub Repository

**Repository:** https://github.com/Aayushdubey04/macro-rides-demo

---

## Project Objective

The objective of this project is to build a functional visualization tool that can:

* Display a simulated driver's route on an interactive map
* Generate a 350-meter corridor around the active driver route
* Convert the corridor into H3 hexagonal cells
* Display predefined zone boundaries
* Classify pickup points as eligible or non-eligible
* Dynamically update the route, corridor, H3 cells, and pickup eligibility
* Present the result through a clean and intuitive map-based interface

This type of system can help a hyperlocal EV mobility platform identify pickup points that are close enough to a driver's current route.

---

## Key Features

### 1. Simulated Delhi NCR Driver Routes

The demo uses hardcoded latitude-longitude coordinates to simulate driver movement across multiple Delhi NCR routes.

The route data is intentionally simulated because the main focus is on demonstrating corridor generation, H3 logic, and pickup eligibility rather than live GPS streaming.

---

### 2. 350-Meter Dynamic Route Corridor

A 350-meter buffer corridor is generated around the active driver route.

This corridor represents the pickup eligibility area. Pickup points inside this corridor are considered eligible.

---

### 3. H3 Spatial Indexing

The generated route corridor is converted into H3 hexagonal cells.

Each pickup point is also mapped to an H3 cell. This allows the application to use cell-based spatial lookup before final eligibility validation.

---

### 4. Pickup Eligibility Classification

Each pickup point is classified as:

* **Eligible** if it falls inside the 350m route corridor
* **Not eligible** if it lies outside the active corridor

The popup for each pickup point shows:

* Pickup ID
* Eligibility status
* Whether the point is inside the 350m corridor
* Whether it matches the H3 corridor logic
* H3 cell ID

---

### 5. Interactive Map Visualization

The map displays:

* Driver route
* Active route segment
* 350m corridor
* H3 hexagonal cells
* Zone boundaries
* Eligible and non-eligible pickup points
* Start and end route markers
* Moving EV driver marker
* Direction arrows along the route

---

### 6. Dynamic Route Simulation

The EV marker moves along the route step by step.

As the driver moves, the application recalculates:

* Active route segment
* 350m corridor
* H3 cells
* Eligible pickup points
* Dashboard counts

The driver reaches the route end before switching to the next simulated route.

---

### 7. Route Selector

A route selector dropdown allows the user to manually switch between available simulated routes.

When a route is selected, the EV marker, corridor, H3 cells, and pickup eligibility are recalculated.

---

### 8. Dashboard Panel

The dashboard shows:

* Current route name
* Route selector
* Buffer radius
* H3 resolution
* Total pickup points
* Eligible pickup count
* Non-eligible pickup count
* Current route segment
* Simulation controls

---

## Tech Stack

| Technology    | Purpose                                             |
| ------------- | --------------------------------------------------- |
| React.js      | Frontend application                                |
| Vite          | Build tool and development server                   |
| Leaflet       | Interactive map rendering                           |
| React Leaflet | React bindings for Leaflet                          |
| Turf.js       | Geospatial buffer and point-in-polygon calculations |
| H3-js         | Hexagonal spatial indexing                          |
| OpenStreetMap | Map tile layer                                      |
| Vercel        | Deployment                                          |

---

## How It Works

### Step 1: Route Data

Each driver route is represented as an array of latitude-longitude coordinates.

Example:

```js
[
  [28.6517, 77.1900],
  [28.6488, 77.1975],
  [28.6450, 77.2045]
]
```

Leaflet uses coordinates in the format:

```js
[latitude, longitude]
```

GeoJSON and Turf.js use coordinates in the format:

```js
[longitude, latitude]
```

So route coordinates are converted before geospatial processing.

---

### Step 2: Route Buffer Generation

The active driver route is converted into a GeoJSON LineString.

A 350-meter corridor is generated around this route using Turf.js.

```js
turf.buffer(routeLine, 0.35, { units: "kilometers" });
```

This creates a polygon representing the pickup eligibility corridor.

---

### Step 3: H3 Corridor Cells

The buffer polygon is converted into H3 cells at resolution 10.

H3 cells are displayed on the map to show the spatial indexing layer used for corridor matching.

---

### Step 4: Pickup Point Classification

For each pickup point:

1. The pickup coordinate is converted into an H3 cell.
2. Nearby H3 cells are compared with the corridor H3 cells.
3. The point is validated using exact point-in-polygon checking.
4. The point is marked eligible only if it satisfies the corridor condition.

The eligibility logic combines H3-based filtering with exact geometric validation.

---

### Step 5: Dynamic Simulation

The EV marker moves along the selected route using a time-based simulation.

At each step, the application updates:

* Driver marker position
* Active route segment
* Corridor polygon
* H3 cells
* Pickup eligibility status
* Dashboard metrics

---

## Project Structure

```text
macro-rides-demo/
│
├── public/
│
├── src/
│   ├── data/
│   │   └── mapData.js
│   │
│   ├── utils/
│   │   └── geoUtils.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Important Files

### `src/data/mapData.js`

Contains simulated data for:

* Driver routes
* Pickup points
* Zone boundaries

---

### `src/utils/geoUtils.js`

Contains geospatial utility functions for:

* Creating route LineString
* Creating 350m route buffer
* Generating H3 cells
* Classifying pickup points
* Getting H3 cell boundaries

---

### `src/App.jsx`

Main application file.

Handles:

* Map rendering
* Route simulation
* Route selector
* EV marker movement
* Corridor rendering
* H3 cell rendering
* Pickup point rendering
* Dashboard metrics

---

### `src/App.css`

Contains styling for:

* Dashboard panel
* Route selector
* Map layout
* EV marker
* Start/end markers
* Direction arrows
* Pickup markers
* Legend

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Aayushdubey04/macro-rides-demo.git
```

### 2. Move into the project folder

```bash
cd macro-rides-demo
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local development URL:

```text
http://localhost:5173/
```

---

## Build for Production

```bash
npm run build
```

The production build is generated inside the `dist` folder.

---

## Preview Production Build

```bash
npm run preview
```

---

## Assignment Requirements Covered

| Requirement                        | Status    |
| ---------------------------------- | --------- |
| Driver route display               | Completed |
| 350-meter route corridor           | Completed |
| Zone boundary visualization        | Completed |
| Eligible pickup point highlighting | Completed |
| H3 spatial indexing                | Completed |
| Leaflet map visualization          | Completed |
| Simulated route updates            | Completed |
| Working web-based demo             | Completed |
| Source code repository             | Completed |
| Deployment link                    | Completed |
| Brief documentation                | Completed |

---

## Assumptions

* Driver routes are simulated using hardcoded Delhi NCR coordinates.
* Pickup points are also simulated for demonstration.
* The project does not use live GPS tracking or real-time backend data.
* The main goal is to demonstrate geospatial corridor logic, H3 indexing, and pickup eligibility visualization.
* A pickup point is eligible only if it lies within the active 350m route corridor.

---

## Possible Real-World Extension

In a production-level system, this demo can be extended with:

* Live driver GPS tracking
* Backend APIs for route and pickup data
* Real-time rider pickup requests
* Multiple active drivers
* Traffic-aware routing
* Route optimization
* Driver-rider assignment logic
* Database-backed trip and zone management

---

## Author

**Aayush Dubey**
B.Tech Electrical Engineering
Indian Institute of Technology Kanpur

---

## Contact

**Email:** [dubeyaayush0403@gmail.com](mailto:dubeyaayush0403@gmail.com)

