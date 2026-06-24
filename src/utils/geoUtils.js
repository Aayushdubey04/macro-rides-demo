import * as turf from "@turf/turf";
import {
  latLngToCell,
  polygonToCells,
  cellToBoundary,
  gridDisk,
} from "h3-js";

export const H3_RESOLUTION = 10;
export const BUFFER_RADIUS_KM = 0.35;

export function createRouteLine(route) {
  if (!route || route.length < 2) return null;

  return turf.lineString(route.map(([lat, lng]) => [lng, lat]));
}

export function createRouteBuffer(route) {
  const routeLine = createRouteLine(route);

  if (!routeLine) return null;

  return turf.buffer(routeLine, BUFFER_RADIUS_KM, {
    units: "kilometers",
  });
}

export function getCorridorH3Cells(bufferPolygon) {
  if (!bufferPolygon) return [];

  try {
    return polygonToCells(
      bufferPolygon.geometry.coordinates,
      H3_RESOLUTION,
      true
    );
  } catch (error) {
    console.error("H3 polygon conversion error:", error);
    return [];
  }
}

function createZonePolygon(zone) {
  const ring = zone.coordinates.map(([lat, lng]) => [lng, lat]);

  const firstPoint = ring[0];
  const lastPoint = ring[ring.length - 1];

  const isClosed =
    firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1];

  if (!isClosed) {
    ring.push(firstPoint);
  }

  return turf.polygon([ring], {
    id: zone.id,
    name: zone.name,
  });
}

function getServiceZoneForPickup(point, zonePolygons) {
  const pointGeoJSON = turf.point([point.lng, point.lat]);

  const matchedZone = zonePolygons.find((zone) =>
    turf.booleanPointInPolygon(pointGeoJSON, zone.polygon)
  );

  return matchedZone || null;
}

export function classifyPickupPoints(
  pickupPoints,
  bufferPolygon,
  corridorCells,
  zones = [],
  route = []
) {
  const corridorCellSet = new Set(corridorCells);
  const routeLine = createRouteLine(route);

  const zonePolygons = zones.map((zone) => ({
    id: zone.id,
    name: zone.name,
    polygon: createZonePolygon(zone),
  }));

  return pickupPoints.map((point) => {
    const h3Cell = latLngToCell(point.lat, point.lng, H3_RESOLUTION);

    const nearbyCells = gridDisk(h3Cell, 1);

    const h3Candidate = nearbyCells.some((cell) =>
      corridorCellSet.has(cell)
    );

    const pointGeoJSON = turf.point([point.lng, point.lat]);
    const nearestPoint = routeLine
  ? turf.nearestPointOnLine(routeLine, pointGeoJSON, {
      units: "kilometers",
    })
  : null;

const distanceFromRouteMeters = nearestPoint
  ? Math.round(nearestPoint.properties.dist * 1000)
  : null;

    const exactInside = bufferPolygon
      ? turf.booleanPointInPolygon(pointGeoJSON, bufferPolygon)
      : false;

    const serviceZone = getServiceZoneForPickup(point, zonePolygons);

    const insideServiceZone = Boolean(serviceZone);

    const eligible = h3Candidate && exactInside && insideServiceZone;

    return {
      ...point,
      h3Cell,
      h3Candidate,
      exactInside,
      insideServiceZone,
      serviceZoneId: serviceZone?.id || null,
      serviceZoneName: serviceZone?.name || "Outside service zone",
      distanceFromRouteMeters,
      eligible,
    };
  });
}

export function getH3Boundary(cell) {
  return cellToBoundary(cell);
}