// Current design scale
window.designScale = "full";

import { loadReference } from "./js/reference.js";
import { loadDimension } from "./js/dimension.js";
import { loadBuilder } from "./js/builder.js";
import { loadFlight } from "./js/flight.js";

const modeSelect = document.getElementById("mode");
const content = document.getElementById("content");
const startupScreen = document.getElementById("startupScreen");
const mainApp = document.getElementById("mainApp");
const continueButton = document.getElementById("continueButton");

continueButton.addEventListener("click", () => {

    const selected = document.querySelector(
        'input[name="scale"]:checked'
    );

    window.designScale = selected.value;

    startupScreen.style.display = "none";
    mainApp.style.display = "block";

    // Load the default page
    loadReference();

});

window.appContent = content;

//loadReference();

modeSelect.addEventListener("change", () => {

    switch (modeSelect.value) {

        case "reference":
            loadReference();
            break;

        case "dimension":
            loadDimension();
            break;

        case "builder":
            loadBuilder();
            break;

        case "flight":
            loadFlight();
            break;

    }

});