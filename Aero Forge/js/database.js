// =========================
// Aircraft Database Module
// =========================

let aircraftDatabase = null;
let currentDatabase = "";

// Load the aircraft database only once
export async function loadDatabase() {
  const databaseFile =
    window.designScale === "rc"
      ? "data/RC/aircraft_rc.json"
      : "data/full size/aircraft.json";

  if (aircraftDatabase !== null && currentDatabase === databaseFile) {
    return aircraftDatabase;
  }

  const response = await fetch(databaseFile);

  aircraftDatabase = await response.json();

  currentDatabase = databaseFile;

  return aircraftDatabase;
}

// Return one category (fighter, airliner, uav)
export async function getAircraft(type) {
  const db = await loadDatabase();

  return db[type] || [];
}

// Average wingspan
export async function averageWingSpan(type) {
  const aircraft = await getAircraft(type);

  let total = 0;

  aircraft.forEach((plane) => {
    total += plane.wingspan;
  });

  return total / aircraft.length;
}

// Average length
export async function averageLength(type) {
  const aircraft = await getAircraft(type);

  let total = 0;

  aircraft.forEach((plane) => {
    total += plane.length;
  });

  return total / aircraft.length;
}

// Average wing area
export async function averageWingArea(type) {
  const aircraft = await getAircraft(type);

  let total = 0;

  aircraft.forEach((plane) => {
    total += plane.wingArea;
  });

  return total / aircraft.length;
}

// Find the most common value
export function mostCommon(list, property) {
  const counts = {};

  list.forEach((item) => {
    counts[item[property]] = (counts[item[property]] || 0) + 1;
  });

  let answer = "";
  let highest = 0;

  for (const key in counts) {
    if (counts[key] > highest) {
      highest = counts[key];
      answer = key;
    }
  }

  return answer;
}

// Find aircraft closest to a given wingspan
export async function closestAircraft(type, wingspan) {
  const aircraft = await getAircraft(type);

  let best = aircraft[0];

  let difference = Math.abs(aircraft[0].wingspan - wingspan);

  aircraft.forEach((plane) => {
    const currentDifference = Math.abs(plane.wingspan - wingspan);

    if (currentDifference < difference) {
      difference = currentDifference;
      best = plane;
    }
  });

  return best;
}
// Find aircraft closest to the requested wingspan
export async function findClosestAircraft(type, wingspan) {
  const aircraft = await getAircraft(type);

  let closest = aircraft[0];
  let smallestDifference = Math.abs(aircraft[0].wingspan - wingspan);

  aircraft.forEach((plane) => {
    const difference = Math.abs(plane.wingspan - wingspan);

    if (difference < smallestDifference) {
      smallestDifference = difference;
      closest = plane;
    }
  });

  return closest;
}
