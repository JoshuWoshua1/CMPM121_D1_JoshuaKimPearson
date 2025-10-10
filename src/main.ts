import fries from "./friesSS.png";
import ketchup from "./ketchupSS.png";

import "./style.css";

//Counter variable for button
let burgers: number = 0;
let burgersPerSecond: number = 0;
let clickPower: number = 1;

//variables for Animation
let lastTime: number = 0;
const MsPerSecond: number = 1000;

//variables for upgrades
let ketchupCost: number = 100;
const ketchupPower: number = 1;
let friesCost: number = 10;
const friesPower: number = 1;

document.body.innerHTML = `
  <p>click power: <span id="clickPowerDisplay">${clickPower}</span></p>
  <p>BPS: <span id="BPSDisplay">${burgersPerSecond}</span></p>
  <h2>burgers: <span id="counter">0</span></h2>
  <button id="burgButton">🍔</button>
  <p>Fries +1 BPS <br>Cost: <span id="friesCostDisplay">${friesCost}</span> burgers</p>
  <button id="friesButton"><img src="${fries}" class="icon" /></button>
  <p>Ketchup +1 click power <br>Cost: <span id="ketchupCostDisplay">${ketchupCost}</span> burgers</p>
  <button id="ketchupButton"><img src="${ketchup}" class="icon" /></button>
`;

// Add click handler
const button = document.getElementById("burgButton")!;
const counterElement = document.getElementById("counter")!;
const friesButton = document.getElementById("friesButton")!;
const friesCostDisplay = document.getElementById("friesCostDisplay")!;
const ketchupButton = document.getElementById("ketchupButton")!;
const ketchupCostDisplay = document.getElementById("ketchupCostDisplay")!;
const clickPowerDisplay = document.getElementById("clickPowerDisplay")!;
const BPSDisplay = document.getElementById("BPSDisplay")!;

const updateCounterDisplay = () => { //function to make it easier to update current burgers
  counterElement.textContent = Math.floor(burgers).toString(); //changed to allow fractional growth without making it ugly
};

button.addEventListener("click", () => {
  burgers += clickPower;
  updateCounterDisplay();
});

friesButton.addEventListener("click", () => { // new button for step 5, increases BPS instead of click Power
  if (burgers >= friesCost) {
    burgers -= friesCost;
    burgersPerSecond += friesPower;
    friesCost = Math.floor(friesCost * 1.5);

    updateCounterDisplay();
    friesCostDisplay.textContent = friesCost.toString();
    BPSDisplay.textContent = burgersPerSecond.toString();
  }
});

ketchupButton.addEventListener("click", () => { // old button
  if (burgers >= ketchupCost) {
    burgers -= ketchupCost;
    clickPower += ketchupPower;
    ketchupCost = Math.floor(ketchupCost * 1.5);

    updateCounterDisplay();
    ketchupCostDisplay.textContent = ketchupCost.toString();
    clickPowerDisplay.textContent = clickPower.toString();
  }
});

//step 4 implementation
function gameLoop(timestamp: DOMHighResTimeStamp) {
  if (lastTime === 0) {
    lastTime = timestamp;
  }

  const deltaTime_ms: number = timestamp - lastTime; // calculate time since last frame
  const growthThisFrame: number = burgersPerSecond *
    (deltaTime_ms / MsPerSecond); // calculate growth for frame
  burgers += growthThisFrame;
  updateCounterDisplay();
  lastTime = timestamp;
  self.requestAnimationFrame(gameLoop);
}
self.requestAnimationFrame(gameLoop);
