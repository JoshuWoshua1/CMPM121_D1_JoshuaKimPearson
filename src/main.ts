import condiment_1 from "./ketchupSS.png";

import "./style.css";

//Counter variable for button
let burgers: number = 0;
const burgersPerSecond: number = 0;
let clickPower: number = 1;

//variables for upgrades
let ketchupCost: number = 10;
const ketchupPower: number = 1;

document.body.innerHTML = `
  <p>click power: <span id="clickPowerDisplay">${clickPower}</span></p>
  <p>BPS: <span id="burgersPerSecondDisplay">${burgersPerSecond}</span></p>
  <h2>burgers: <span id="counter">0</span></h2>
  <button id="burgButton">🍔</button>
  <p>Cost: <span id="ketchupCostDisplay">${ketchupCost}</span> burgers</p>
  <button id="ketchupButton"><img src="${condiment_1}" class="icon" /></button>
`;

// Add click handler
const button = document.getElementById("burgButton")!;
const counterElement = document.getElementById("counter")!;
const ketchupButton = document.getElementById("ketchupButton")!;
const ketchupCostDisplay = document.getElementById("ketchupCostDisplay")!;
const clickPowerDisplay = document.getElementById("clickPowerDisplay")!;
//const burgersPerSecondDisplay = document.getElementById("burgersPerSecondDisplay",)!;

const updateCounterDisplay = () => {
  counterElement.textContent = burgers.toString();
};

button.addEventListener("click", () => {
  burgers += clickPower;
  updateCounterDisplay();
});

ketchupButton.addEventListener("click", () => {
  if (burgers >= ketchupCost) {
    burgers -= ketchupCost;
    clickPower += ketchupPower;
    ketchupCost = Math.floor(ketchupCost * 1.5);

    updateCounterDisplay();
    ketchupCostDisplay.textContent = ketchupCost.toString();
    clickPowerDisplay.textContent = clickPower.toString();
  }
});

// Increment the counter by 1 every 1000 milliseconds (1 second)
setInterval(() => {
  burgers += burgersPerSecond;

  // Update the display to reflect the change
  updateCounterDisplay();
}, 1000); // 1000 ms = 1 second
