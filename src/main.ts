import cheese from "./cheeseSS.png";
import fries from "./friesSS.png";
import ketchup from "./ketchupSS.png";
import lettuce from "./lettuceSS.png";

import "./style.css";

//misc variables
const costMult = 1.15;  // added for step 7, though i already had cost multiplying in since step 3.

//Counter variable for button
let burgers: number = 0;
let burgersPerSecond: number = 0;
let clickPower: number = 1;

//variables for Animation
let lastTime: number = 0;
const MsPerSecond: number = 1000;

//variables for BPS upgrades
let friesCount: number = 0;
let friesCost: number = 10;
const friesPower: number = 0.1;
let cheeseCount: number = 0;
let cheeseCost: number = 100;
const cheesePower: number = 2;
let lettuceCount: number = 0;
let lettuceCost: number = 1000;
const lettucePower: number = 50;

//variables for click power upgrades
let ketchupCount: number = 0;
let ketchupCost: number = 100;
const ketchupPower: number = 1;

document.body.innerHTML = `
  <!-- Counters & burger button -->
  <p>click power: <span id="clickPowerDisplay">${clickPower}</span></p>
  <p>BPS: <span id="BPSDisplay">${burgersPerSecond}</span></p>
  <h2>burgers: <span id="counter">0</span></h2>
  <button id="burgButton">🍔</button>
  <!-- Auto burger Upgrades -->
  <p>Fries +${friesPower} BPS <br>Cost: <span id="friesCostDisplay">${friesCost}</span> burgers <br>Owned: <span id="friesCountDisplay">${friesCount}</span></p>
  <button id="friesButton"><img src="${fries}" class="icon" /></button>
  <p>Cheese +${cheesePower} BPS <br>Cost: <span id="cheeseCostDisplay">${cheeseCost}</span> burgers <br>Owned: <span id="cheeseCountDisplay">${cheeseCount}</span></p>
  <button id="cheeseButton"><img src="${cheese}" class="icon" /></button>
  <p>Lettuce +${lettucePower} BPS <br>Cost: <span id="lettuceCostDisplay">${lettuceCost}</span> burgers <br>Owned: <span id="lettuceCountDisplay">${lettuceCount}</span></p>
  <button id="lettuceButton"><img src="${lettuce}" class="icon" /></button>
  <!-- Click Power Increase Upgrades -->
  <p>Ketchup +${ketchupPower} click power <br>Cost: <span id="ketchupCostDisplay">${ketchupCost}</span> burgers <br>Owned: <span id="ketchupCountDisplay">${ketchupCount}</span></p>
  <button id="ketchupButton"><img src="${ketchup}" class="icon" /></button>
  `;

// Add click handler
const button = document.getElementById("burgButton")!;
const counterElement = document.getElementById("counter")!;
const friesCountDisplay = document.getElementById("friesCountDisplay")!;
const friesButton = document.getElementById("friesButton")!;
const friesCostDisplay = document.getElementById("friesCostDisplay")!;
const ketchupCountDisplay = document.getElementById("ketchupCountDisplay")!;
const ketchupButton = document.getElementById("ketchupButton")!;
const ketchupCostDisplay = document.getElementById("ketchupCostDisplay")!;
const clickPowerDisplay = document.getElementById("clickPowerDisplay")!;
const BPSDisplay = document.getElementById("BPSDisplay")!;
const cheeseCountDisplay = document.getElementById("cheeseCountDisplay")!;
const cheeseButton = document.getElementById("cheeseButton")!;
const cheeseCostDisplay = document.getElementById("cheeseCostDisplay")!;
const lettuceCountDisplay = document.getElementById("lettuceCountDisplay")!;
const lettuceButton = document.getElementById("lettuceButton")!;
const lettuceCostDisplay = document.getElementById("lettuceCostDisplay")!;

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
    friesCost = Math.floor(friesCost * costMult);
    friesCount += 1;

    updateCounterDisplay();
    friesCountDisplay.textContent = friesCount.toString();
    friesCostDisplay.textContent = friesCost.toString();
    BPSDisplay.textContent = burgersPerSecond.toFixed(1);
  }
});

cheeseButton.addEventListener("click", () => { // first new button for step 6, increases BPS instead of click Power
  if (burgers >= cheeseCost) {
    burgers -= cheeseCost;
    burgersPerSecond += cheesePower;
    cheeseCost = Math.floor(cheeseCost * costMult);
    cheeseCount += 1;

    updateCounterDisplay();
    cheeseCountDisplay.textContent = cheeseCount.toString();
    cheeseCostDisplay.textContent = cheeseCost.toString();
    BPSDisplay.textContent = burgersPerSecond.toFixed(1);
  }
});

lettuceButton.addEventListener("click", () => { // second (and final) new button for step 6, increases BPS instead of click Power
  if (burgers >= lettuceCost) {
    burgers -= lettuceCost;
    burgersPerSecond += lettucePower;
    lettuceCost = Math.floor(lettuceCost * costMult);
    lettuceCount += 1;

    updateCounterDisplay();
    lettuceCountDisplay.textContent = lettuceCount.toString();
    lettuceCostDisplay.textContent = lettuceCost.toString();
    BPSDisplay.textContent = burgersPerSecond.toFixed(1);
  }
});

// old button *added during section assignment, I had misinterpreted what "good change" meant and me & my partner added a button to eachother's games
ketchupButton.addEventListener("click", () => {
  if (burgers >= ketchupCost) {
    burgers -= ketchupCost;
    clickPower += ketchupPower;
    ketchupCost = Math.floor(ketchupCost * costMult);
    ketchupCount += 1;

    updateCounterDisplay();
    ketchupCountDisplay.textContent = ketchupCount.toString();
    ketchupCostDisplay.textContent = ketchupCost.toString();
    clickPowerDisplay.textContent = clickPower.toFixed(1);
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
