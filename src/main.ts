import condiment_1 from "./ketchupSS.png";

import "./style.css";

//Counter variable for button
let burgers: number = 0;
const burgersPerSecond: number = 111;
let clickPower: number = 1;

//variables for Animation
let lastTime: number = 0;
const MsPerSecond: number = 1000;

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

const updateCounterDisplay = () => { //function to make it easier to update current burgers
  counterElement.textContent = Math.floor(burgers).toString(); //changed to allow fractional growth without making it ugly
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
