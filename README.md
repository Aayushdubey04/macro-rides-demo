# Macro Rides - Zone Boundary + Dynamic Route Corridor Visualization Tool

A web-based geospatial visualization demo built for the Macro Rides technical evaluation assignment.

The project demonstrates how a driver's route can be visualized on a map, how a 350-meter dynamic pickup corridor can be generated around that route, and how pickup points can be classified as eligible or non-eligible based on whether they fall inside the corridor.

The solution uses H3 spatial indexing for geospatial cell-based lookup and Leaflet for interactive map visualization.

---

## Live Demo

```text
Live Demo: <https://macro-rides-demo.vercel.app/>
```

---

## GitHub Repository

```text
GitHub Repository: <https://github.com/Aayushdubey04/macro-rides-demo>
```

---

## Project Objective

The objective of this project is to build a functional map-based tool for Macro Rides that can:

* Display a driver's route on an interactive map
* Generate a 350-meter buffer corridor around the active route
* Display predefined zone boundaries
* Identify pickup points that fall within the corridor
* Use H3 indexing for spatial representation and lookup
* Simulate dynamic route updates and recalculate eligibility in real time

This type of tool can be useful in a hyperlocal EV mobility platform where pickup requests need to be matched with drivers already moving along nearby route corridors.

---

## Features

### 1. Interactive Map Visualization

The application displays an interactive map using Leaflet and OpenStreetMap tiles.

The map shows:

* Driver route
* 350-meter pickup corridor
* H3 hexagonal cells
* Zone boundaries
* Pickup points
* Eligible and non-eligible pickup markers

---

### 2. Driver Route Visualization

The driver route is represented using a sequence of latitude-longitude points.

The route is drawn as a polyline on the map and updates dynamically during the simulation.

---

### 3. 350-Meter Route Corridor

A 350-meter buffer is generated around the active driver route.

This corridor represents the region within which pickup points are considered potentially serviceable by the driver.

The buffer is generated using Turf.js geospatial utilities.

---

### 4. H3 Spatial Indexing

The route corridor is converted into H3 hexagonal cells.

Each pickup point is also converted into an H3 cell.

This allows the system to perform spatial lookup using hexagonal indexing instead of only relying on raw latitude-longitude comparison.

H3 resolution 10 is used to provide suitable granularity for a 350-meter corridor.

---

### 5. Pickup Eligibility Classification

Each pickup point is classified as either:

* Eligible
* Not Eligible

A pickup is considered eligible if it falls inside the active 350-meter route corridor.

The system uses both:

* H3-based candidate matching
* Exact point-in-polygon validation

This improves reliability and avoids incorrect classification near corridor boundaries.

---

### 6. Zone Boundary Display

The application displays predefined Macro Rides service zones as polygon boundaries on the map.

These zones help visualize operational areas where rides or pickups may be allowed.

---

### 7. Dynamic Route Simulation

The route updates automatically using simulated driver movement.

The demo supports multiple predefined routes. Once one route simulation completes, the application moves to another route.

Whenever the active route changes, the following are recalculated:

* Route polyline
* 350-meter corridor
* H3 cells
* Eligible pickup points
* Dashboard counts

---

### 8. Dashboard Panel

The left-side dashboard shows:

* Buffer radius
* H3 resolution
* Total pickup points
* Eligible pickups
* Non-eligible pickups
* Current route information
* Simulation controls

The dashboard also includes buttons to pause/start the simulation and reset the route.

---

## Tech Stack

| Technology    | Purpose                                             |
| ------------- | --------------------------------------------------- |
| React.js      | Frontend application                                |
| Vite          | Development and build tool                          |
| Leaflet       | Interactive map rendering                           |
| React Leaflet | React bindings for Leaflet                          |
| Turf.js       | Geospatial buffer and point-in-polygon calculations |
| H3-js         | Hexagonal spatial indexing                          |
| OpenStreetMap | Map tiles                                           |

---

## How the System Works

### Step 1: Route Representation

Each driver route is stored as a list of latitude-longitude coordinates.

Example:

```js
[
  [28.6517, 77.1900],
  [28.6448, 77.2050],
  [28.6365, 77.2167]
]
```

Leaflet uses coordinates in the format:

```js
[latitude, longitude]
```

Turf.js uses GeoJSON format, where coordinates are represented as:

```js
[longitude, latitude]
```

So the route coordinates are converted before geospatial processing.

---

### Step 2: Route Buffer Generation

The driver's active route is converted into a GeoJSON LineString.

A 350-meter buffer is generated around this LineString using Turf.js.

```js
turf.buffer(routeLine, 0.35, { units: "kilometers" });
```

This creates a polygon representing the valid pickup corridor.

---

### Step 3: H3 Cell Generation

The buffer polygon is converted into H3 cells.

These cells are displayed on the map to show the spatial indexing layer used for pickup eligibility.

---

### Step 4: Pickup Point Classification

Each pickup point is converted into an H3 cell.

The system checks whether the pickup point lies near or inside the corridor cells.

Then, exact validation is performed using point-in-polygon checking.

A pickup point is marked eligible only if it satisfies the corridor condition.

---

### Step 5: Dynamic Updates

The route simulation updates the active route segment over time.

Whenever the active route changes, the application recalculates:

* Active route segment
* Corridor polygon
* H3 cells
* Pickup eligibility
* Dashboard metrics

This demonstrates how the system can support real-time or simulated route updates.

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

Contains sample data for:

* Driver routes
* Pickup points
* Zone boundaries

Multiple driver routes are included to simulate dynamic route changes.

---

### `src/utils/geoUtils.js`

Contains geospatial utility functions for:

* Creating route LineString
* Creating 350-meter route buffer
* Generating H3 cells
* Classifying pickup points
* Getting H3 cell boundaries

---

### `src/App.jsx`

Main application file.

It handles:

* Map rendering
* Route simulation
* Corridor generation
* Pickup eligibility display
* Dashboard metrics
* User controls

---

### `src/App.css`

Contains styling for:

* Dashboard panel
* Map layout
* Buttons
* Legend
* Metrics

---

## Running the Project Locally

### 1. Clone the repository

```bash
git clone <https://github.com/Aayushdubey04/macro-rides-demo>
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

### 5. Open the app in browser

```text
http://localhost:5173/
```

---

## Build for Production

To create a production build, run:

```bash
npm run build
```

The production-ready files will be generated inside the `dist` folder.

---

## Preview Production Build Locally

```bash
npm run preview
```

---

## Assignment Requirements Covered

| Requirement                 | Status    |
| --------------------------- | --------- |
| Driver route display        | Completed |
| 350-meter route corridor    | Completed |
| Zone boundary visualization | Completed |
| Eligible pickup points      | Completed |
| H3 spatial indexing         | Completed |
| Leaflet map visualization   | Completed |
| Dynamic route simulation    | Completed |
| Working web-based demo      | Completed |
| Dashboard and controls      | Completed |

---

## Possible Real-World Use Case

In a hyperlocal EV mobility system, drivers may already be moving along certain routes.

Instead of assigning every pickup request to every available driver, the system can check whether a pickup point lies close to a driver's current or upcoming route.

This can help with:

* Better rider-driver matching
* Lower driver detours
* Faster pickup decisions
* Improved fleet utilization
* More efficient last-mile EV mobility operations

---

## Limitations

This is a frontend-based simulation demo.

The current version uses predefined routes, pickup points, and zone boundaries.

For a production-level system, the following can be added:

* Real-time driver GPS updates
* Backend API integration
* Database for pickup requests
* Live rider-driver matching
* Route optimization
* Traffic-aware routing
* Authentication and role-based dashboards

---

## Future Improvements

Possible improvements include:

* Integrating live location data
* Adding route optimization APIs
* Supporting real-time pickup request updates
* Adding driver and rider dashboards
* Improving H3-based filtering for large-scale datasets
* Adding backend services for persistent storage
* Supporting multiple active drivers at the same time

---

## Author

**Aayush Dubey**
B.Tech Electrical Engineering
Indian Institute of Technology Kanpur

---

## Contact

```text
Email: dubeyaayush0403@gmail.com
```

