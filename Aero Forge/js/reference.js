import {
    getAircraft,
    averageWingSpan,
    averageLength,
    averageWingArea,
    mostCommon
} from "./database.js";

export async function loadReference() {

    const content = window.appContent;

    content.innerHTML = `
        <h2 class="sectionTitle">Reference</h2>

        <label>Vehicle</label>

        <select id="vehicle">
            <option value="fighter">Fighter Aircraft</option>
            <option value="airliner">Airliner</option>
            <option value="uav">UAV / Drone</option>
        </select>

        <button id="referenceButton">
            View Engineering Data
        </button>

        <div class="outputBox" id="referenceOutput">
            Select a vehicle and click the button.
        </div>
    `;

    document
        .getElementById("referenceButton")
        .addEventListener("click", generateReference);

}

async function generateReference() {

    const vehicle =
        document.getElementById("vehicle").value;

    const aircraft =
        await getAircraft(vehicle);

    const avgWing =
        await averageWingSpan(vehicle);

    const avgLength =
        await averageLength(vehicle);

    const avgArea =
        await averageWingArea(vehicle);

    const material =
        mostCommon(aircraft, "material");

    const engine =
        mostCommon(aircraft, "engine");

    const airfoil =
        mostCommon(aircraft, "airfoil");

    let list = "";

    aircraft.forEach(plane => {

        list += `• ${plane.name}\n`;

    });

    document.getElementById("referenceOutput").textContent =

`Engineering Summary

Aircraft in Database: ${aircraft.length}

Aircraft

${list}

Average Wingspan
${avgWing.toFixed(2)} m

Average Length
${avgLength.toFixed(2)} m

Average Wing Area
${avgArea.toFixed(2)} m²

Typical Material
${material}

Typical Engine
${engine}

Typical Airfoil
${airfoil}`;

}