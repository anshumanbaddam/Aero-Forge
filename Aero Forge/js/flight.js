import { getAircraft } from "./database.js";

export function loadFlight() {
  const content = window.appContent;

  content.innerHTML = `

        <h2 class="sectionTitle">
            Flight Predictor
        </h2>

        <label>Vehicle Type</label>

        <select id="vehicle">

            <option value="fighter">Fighter</option>
            <option value="airliner">Airliner</option>
            <option value="uav">UAV</option>

        </select>

        <div class="formRow">

    <div class="formGroup">

        <label>Wingspan (m)</label>

        <input id="wingspan" type="number">

    </div>

    <div class="formGroup">

        <label>Length (m)</label>

        <input id="length" type="number">

    </div>

</div>



<div class="formRow">

    <div class="formGroup">

        <label>Wing Area (m²)</label>

        <input id="wingArea" type="number">

    </div>

    <div class="formGroup">

        <label>Empty Weight (kg)</label>

        <input id="weight" type="number">

    </div>

</div>

<label>Engine Count</label>

<select id="engineCount">

    <option>1</option>
    <option>2</option>
    <option>4</option>

</select>

<button id="predictButton">

    Analyze Aircraft

</button>

        <div
            class="outputBox"
            id="flightOutput">

            Enter aircraft specifications.

        </div>

    `;

  document
    .getElementById("predictButton")
    .addEventListener("click", analyzeFlight);
}
async function analyzeFlight() {
  const wingspan = parseFloat(document.getElementById("wingspan").value);

  const length = parseFloat(document.getElementById("length").value);

  const wingArea = parseFloat(document.getElementById("wingArea").value);

  const weight = parseFloat(document.getElementById("weight").value);

  const engines = parseInt(document.getElementById("engineCount").value);

  if (isNaN(wingspan) || isNaN(length) || isNaN(wingArea) || isNaN(weight)) {
    document.getElementById("flightOutput").textContent =
      "Please fill in every field.";

    return;
  }

  const aspectRatio = (wingspan * wingspan) / wingArea;

  const wingLoading = weight / wingArea;

  let estimatedThrust = engines * 130000;

  const thrustWeight = estimatedThrust / (weight * 9.81);

  let score = 100;

  if (aspectRatio < 2.5) score -= 20;

  if (aspectRatio > 14) score -= 15;

  if (wingLoading > 900) score -= 25;

  if (thrustWeight < 0.3) score -= 30;

  if (thrustWeight > 1.4) score -= 10;

  score = Math.max(score, 0);

  let rating;

  if (score >= 90) rating = "Excellent";
  else if (score >= 75) rating = "Good";
  else if (score >= 60) rating = "Fair";
  else rating = "Poor";

  let recommendations = [];

  if (aspectRatio < 3)
    recommendations.push("Increase wingspan to improve efficiency.");

  if (wingLoading > 900)
    recommendations.push("Increase wing area to reduce wing loading.");

  if (thrustWeight < 0.3)
    recommendations.push("Increase engine thrust or reduce weight.");

  if (recommendations.length === 0) {
    recommendations.push("No major aerodynamic concerns detected.");
  }

  document.getElementById("flightOutput").textContent =
    `Flight Feasibility Report

Aspect Ratio

${aspectRatio.toFixed(2)}

Wing Loading

${wingLoading.toFixed(1)} kg/m²

Estimated Thrust

${estimatedThrust.toLocaleString()} N

Thrust-to-Weight

${thrustWeight.toFixed(2)}

Engineering Score

${score}/100

Overall Rating

${rating}

Recommendations

• ${recommendations.join("\n• ")}`;
}
