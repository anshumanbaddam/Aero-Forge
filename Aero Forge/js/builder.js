import { findClosestAircraft } from "./database.js";

export function loadBuilder() {
  const content = window.appContent;

  content.innerHTML = `

        <h2 class="sectionTitle">
            Aircraft Builder
        </h2>

        <label>Vehicle</label>

        <select id="vehicle">

            <option value="fighter">Fighter Aircraft</option>
            <option value="airliner">Airliner</option>
            <option value="uav">UAV / Drone</option>

        </select>

        <label>Mission</label>

        <select id="mission">

            <option>Interceptor</option>
            <option>Multirole</option>
            <option>Ground Attack</option>
            <option>Reconnaissance</option>
            <option>Cargo</option>

        </select>

        <label>Desired Wingspan (m)</label>

<input
    id="desiredWing"
    type="number"
    placeholder="12">

<label>Engine Count</label>

<select id="engineCount">

    <option>1</option>
    <option>2</option>
    <option>4</option>

</select>
        <button id="generateButton">

            Generate Aircraft

        </button>

        <div
            class="outputBox"
            id="builderOutput">

            Fill in the information and click Generate Aircraft.

        </div>

    `;

  document
    .getElementById("generateButton")
    .addEventListener("click", generateAircraft);
}

async function generateAircraft() {
  const vehicle = document.getElementById("vehicle").value;

  const mission = document.getElementById("mission").value;

  const desiredWing = parseFloat(document.getElementById("desiredWing").value);

  const engineCount = parseInt(document.getElementById("engineCount").value);

  if (isNaN(desiredWing)) {
    document.getElementById("builderOutput").textContent =
      "Please enter a valid wingspan.";

    return;
  }

  const base = await findClosestAircraft(vehicle, desiredWing);

  const scale = desiredWing / base.wingspan;

  const estimatedLength = base.length * scale;

  const estimatedHeight = base.height * scale;

  const estimatedWingArea = base.wingArea * scale * scale;

  const estimatedWeight = base.emptyWeight * scale * scale * scale;

  const estimatedMTOW = base.maxTakeoffWeight * scale * scale * scale;

  document.getElementById("builderOutput").textContent = `Concept Aircraft

Based On:
${base.name}

Mission
${mission}

Recommended Wingspan
${desiredWing.toFixed(2)} m

Estimated Length
${estimatedLength.toFixed(2)} m

Estimated Height
${estimatedHeight.toFixed(2)} m

Estimated Wing Area
${estimatedWingArea.toFixed(2)} m²

Estimated Empty Weight
${estimatedWeight.toFixed(0)} kg

Estimated MTOW
${estimatedMTOW.toFixed(0)} kg

Material
${base.material}

Airfoil
${base.airfoil}

Engine
${base.engine}

Engine Count
${engineCount}

Crew
${base.crew}

Aspect Ratio
${base.aspectRatio}`;
}
