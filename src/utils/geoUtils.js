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

export function classifyPickupPoints(pickupPoints, bufferPolygon, corridorCells) {
  if (!bufferPolygon) {
    return pickupPoints.map((point) => ({
      ...point,
      h3Cell: latLngToCell(point.lat, point.lng, H3_RESOLUTION),
      eligible: false,
    }));
  }

  const corridorCellSet = new Set(corridorCells);

  return pickupPoints.map((point) => {
    const h3Cell = latLngToCell(point.lat, point.lng, H3_RESOLUTION);

    const nearbyCells = gridDisk(h3Cell, 1);
    const h3Candidate = nearbyCells.some((cell) => corridorCellSet.has(cell));

    const pointGeoJSON = turf.point([point.lng, point.lat]);
    const exactInside = turf.booleanPointInPolygon(pointGeoJSON, bufferPolygon);

    return {
      ...point,
      h3Cell,
      h3Candidate,
      exactInside,
      eligible: h3Candidate && exactInside,
    };
  });
}

export function getH3Boundary(cell) {
  return cellToBoundary(cell);
}