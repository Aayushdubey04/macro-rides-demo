import { useEffect, useMemo, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Polygon,
  CircleMarker,
  Popup,
  GeoJSON,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./App.css";

import { routeOptions, pickupPoints, zones } from "./data/mapData";
import {
  BUFFER_RADIUS_KM,
  H3_RESOLUTION,
  classifyPickupPoints,
  createRouteBuffer,
  getCorridorH3Cells,
  getH3Boundary,
} from "./utils/geoUtils";

const autoIcon = L.divIcon({
  html: `
    <div class="driver-pulse">
      <div class="driver-marker">
        <div class="driver-icon">EV</div>
      </div>
    </div>
  `,
  className: "custom-auto-icon",
  iconSize: [52, 52],
  iconAnchor: [26, 26],
});
const startIcon = L.divIcon({
  html: `<div class="route-endpoint start-point">S</div>`,
  className: "custom-route-point-icon",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});

const endIcon = L.divIcon({
  html: `<div class="route-endpoint end-point">E</div>`,
  className: "custom-route-point-icon",
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});


function App() {
  const [routeIndex, setRouteIndex] = useState(0);
const [routeStartIndex, setRouteStartIndex] = useState(0);
const [isRunning, setIsRunning] = useState(true);

  const ROUTE_WINDOW_SIZE = 6;
  const currentRoute = routeOptions[routeIndex];
const fullDriverRoute = currentRoute.points;

  const activeRoute = useMemo(() => {
    const routeWindow = fullDriverRoute.slice(
      routeStartIndex,
      routeStartIndex + ROUTE_WINDOW_SIZE
    );

    if (routeWindow.length < 2) {
      return fullDriverRoute.slice(0, 2);
    }

    return routeWindow;
  }, [routeStartIndex]);
  const driverPosition = activeRoute[0];
  const routeStartPoint = fullDriverRoute[0];
const routeEndPoint = fullDriverRoute[fullDriverRoute.length - 1];

  const bufferPolygon = useMemo(() => {
    return createRouteBuffer(activeRoute);
  }, [activeRoute]);

  const corridorCells = useMemo(() => {
    return getCorridorH3Cells(bufferPolygon);
  }, [bufferPolygon]);

  const classifiedPickups = useMemo(() => {
    return classifyPickupPoints(pickupPoints, bufferPolygon, corridorCells);
  }, [bufferPolygon, corridorCells]);

  const eligibleCount = classifiedPickups.filter((p) => p.eligible).length;
  const nonEligibleCount = classifiedPickups.length - eligibleCount;

  useEffect(() => {
  if (!isRunning) return;

  const interval = setInterval(() => {
    setRouteStartIndex((prev) => {
      const maxStartIndex = fullDriverRoute.length - ROUTE_WINDOW_SIZE;

      if (prev >= maxStartIndex) {
        setRouteIndex((oldRouteIndex) => {
          return (oldRouteIndex + 1) % routeOptions.length;
        });

        return 0;
      }

      return prev + 1;
    });
  }, 1800);

  return () => clearInterval(interval);
}, [isRunning, fullDriverRoute.length]);

  return (
    <div className="app">
      <div className="side-panel">
        <h2>Macro Rides</h2>
        <h3>Zone Boundary + Dynamic Route Corridor Tool</h3>
        <p className="route-name">{currentRoute.name}</p>

        <div className="metric">
          <span>Buffer Radius</span>
          <strong>{BUFFER_RADIUS_KM * 1000} meters</strong>
        </div>

        <div className="metric">
          <span>H3 Resolution</span>
          <strong>{H3_RESOLUTION}</strong>
        </div>

        <div className="metric">
          <span>Total Pickups</span>
          <strong>{classifiedPickups.length}</strong>
        </div>

        <div className="metric">
          <span>Eligible Pickups</span>
          <strong>{eligibleCount}</strong>
        </div>

        <div className="metric">
          <span>Non-Eligible Pickups</span>
          <strong>{nonEligibleCount}</strong>
        </div>

        <div className="metric">
          <span>Current Route Segment</span>
          <strong>{routeStartIndex}</strong>
        </div>

        <button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "Pause Simulation" : "Start Simulation"}
        </button>

        <button
        onClick={() => {
        setRouteIndex(0);
        setRouteStartIndex(0);
       }}
>
  Reset Route
</button>

        <div className="legend">
          <p>
            <span className="line route"></span> Driver Route
          </p>
          <p>
            <span className="box corridor"></span> 350m Corridor
          </p>
          <p>
            <span className="dot eligible"></span> Eligible Pickup
          </p>
          <p>
            <span className="dot not-eligible"></span> Not Eligible Pickup
          </p>
          <p>
            <span className="box zone"></span> Zone Boundary
          </p>
        </div>
      </div>

      <MapContainer
  center={[28.6280, 77.2400]}
  zoom={12}
  className="map"
  scrollWheelZoom={true}
>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {zones.map((zone) => (
          <Polygon
            key={zone.id}
            positions={zone.coordinates}
            pathOptions={{
              color: "#7c3aed",
              weight: 2,
              fillOpacity: 0.06,
            }}
          >
            <Popup>{zone.name}</Popup>
          </Polygon>
        ))}

        <Polyline
  positions={fullDriverRoute}
  pathOptions={{
    color: "#64748b",
    weight: 3,
    opacity: 0.35,
    dashArray: "8, 10",
  }}
/>
<Polyline
  positions={activeRoute}
  pathOptions={{
    color: "#14b8a6",
    weight: 11,
    opacity: 0.28,
  }}
/>
<Polyline
  positions={activeRoute}
  pathOptions={{
    color: "#0f172a",
    weight: 5.5,
    opacity: 0.98,
  }}
/>
{routeStartPoint && (
  <Marker position={routeStartPoint} icon={startIcon} zIndexOffset={800}>
    <Popup>
      <strong>Route Start</strong>
      <br />
      Route: {currentRoute.name}
    </Popup>
  </Marker>
)}

{routeEndPoint && (
  <Marker position={routeEndPoint} icon={endIcon} zIndexOffset={800}>
    <Popup>
      <strong>Route End</strong>
      <br />
      Route: {currentRoute.name}
    </Popup>
  </Marker>
)}

        {driverPosition && (
  <Marker position={driverPosition} icon={autoIcon} zIndexOffset={1000}>
    <Popup>
      <strong>Current Driver</strong>
      <br />
      Driver ID: D1
      <br />
      Vehicle Type: EV Auto
      <br />
      Current Route: {currentRoute.name}
      <br />
      Current Segment: {routeStartIndex + 1}
      <br />
      Corridor Radius: {BUFFER_RADIUS_KM * 1000} meters
      <br />
      Status: Active
    </Popup>
  </Marker>
)}

        {bufferPolygon && (
          <GeoJSON
            key={`buffer-${routeStartIndex}`}
            data={bufferPolygon}
            style={{
              color: "#0ea5e9",
              weight: 1.5,
              opacity: 0.65,
              fillColor: "#0ea5e9",
              fillOpacity: 0.09,
            }}
          />
        )}

        {corridorCells.slice(0, 400).map((cell) => (
  <Polygon
    key={cell}
    positions={getH3Boundary(cell)}
    pathOptions={{
      color: "#38bdf8",
      weight: 0.55,
      opacity: 0.32,
      fillOpacity: 0.005,
    }}
  />
))}

        {classifiedPickups.map((point) => (
          <CircleMarker
            key={point.id}
            center={[point.lat, point.lng]}
            radius={point.eligible ? 9 : 7}
pathOptions={{
  color: "#ffffff",
  weight: 2,
  fillColor: point.eligible ? "#16a34a" : "#ef4444",
  fillOpacity: 0.95,
}}
          >
            <Popup>
              <strong>{point.name}</strong>
              <br />
              Pickup ID: {point.id}
              <br />
              Status: {point.eligible ? "Eligible" : "Not Eligible"}
<br />
Inside 350m corridor: {point.exactInside ? "Yes" : "No"}
<br />
H3 corridor match: {point.h3Candidate ? "Yes" : "No"}
<br />
H3 Cell: {point.h3Cell}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;