import {
    averageWingSpan,
    averageLength,
    averageWingArea,
    closestAircraft
} from "./database.js";

export function loadDimension() {

    const content = window.appContent;

    content.innerHTML = `

        <h2 class="sectionTitle">
            Dimension Recommender
        </h2>

        <label>Vehicle</label>

        <select id="vehicle">

            <option value="fighter">Fighter Aircraft</option>

            <option value="airliner">Airliner</option>

            <option value="uav">UAV / Drone</option>

        </select>

        <label>Known Dimension</label>

        <select id="knownDimension">

            <option value="wingspan">Wingspan</option>

            <option value="length">Length</option>

        </select>

        <label>Value (m)</label>

        <input
            id="dimensionValue"
            type="number"
            placeholder="12.0">

        <button id="calculateButton">

            Calculate

        </button>

        <div
            class="outputBox"
            id="dimensionOutput">

            Enter a value and press Calculate.

        </div>

    `;

    document
        .getElementById("calculateButton")
        .addEventListener("click", calculateDimensions);

}

async function calculateDimensions(){

    const vehicle =
        document.getElementById("vehicle").value;

    const known =
        document.getElementById("knownDimension").value;

    const value =
        parseFloat(
            document.getElementById("dimensionValue").value
        );

    if(isNaN(value)){

        document
            .getElementById("dimensionOutput")
            .textContent =
            "Please enter a valid number.";

        return;

    }

    const avgWing =
        await averageWingSpan(vehicle);

    const avgLength =
        await averageLength(vehicle);

    const avgArea =
        await averageWingArea(vehicle);

    let estimatedWing;
    let estimatedLength;
    let estimatedArea;

    if(known==="wingspan"){

        estimatedWing = value;

        estimatedLength =
            value * (avgLength / avgWing);

        estimatedArea =
            value * value *
            (avgArea / (avgWing * avgWing));

    }

    else{

        estimatedLength = value;

        estimatedWing =
            value * (avgWing / avgLength);

        estimatedArea =
            estimatedWing *
            estimatedWing *
            (avgArea / (avgWing * avgWing));

    }

    const closest =
        await closestAircraft(
            vehicle,
            estimatedWing
        );

    const confidence =
        Math.max(
            0,
            100 -
            Math.abs(
                closest.wingspan -
                estimatedWing
            ) * 5
        );

    document
        .getElementById("dimensionOutput")
        .textContent =

`Recommended Dimensions

Wingspan

${estimatedWing.toFixed(2)} m

Length

${estimatedLength.toFixed(2)} m

Wing Area

${estimatedArea.toFixed(2)} m²

Closest Aircraft

${closest.name}

Confidence

${confidence.toFixed(0)}%`;

}