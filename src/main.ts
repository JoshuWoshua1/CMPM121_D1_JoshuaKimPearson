import burger from "./burgerSS.png";
import cheese from "./cheeseSS.png";
import fries from "./friesSS.png";
import ketchup from "./ketchupSS.png";
import lettuce from "./lettuceSS.png";
import mayo from "./mayoSS.png";
import onion from "./onionSS.png";

import "./style.css";

// Step 9 restructed everything for data-driven design

// Item structure
interface Item {
  id: string;
  name: string;
  image: string;
  type: "BPS" | "ClickPower";
  baseRate: number;
  cost: number;
  count: number;
  description: string;
}

// Array containing all upgrade items
const availableItems: Item[] = [
  // BPS Upgrades
  {
    id: "fries",
    name: "Fries",
    image: fries,
    type: "BPS",
    baseRate: 0.1,
    cost: 10,
    count: 0,
    description: "Some french fries always go well with a burger!",
  },
  {
    id: "cheese",
    name: "Cheese",
    image: cheese,
    type: "BPS",
    baseRate: 2,
    cost: 100,
    count: 0,
    description: "Mmmm chezburger mmm chezburger mmmmmmmm chezzzburgerrrr",
  },
  {
    id: "lettuce",
    name: "Lettuce",
    image: lettuce,
    type: "BPS",
    baseRate: 50,
    cost: 1000,
    count: 0,
    description: "Make sure to eat your greens! adds some cruch to the burger!",
  },
  {
    id: "onion",
    name: "Onion",
    image: onion,
    type: "BPS",
    baseRate: 200,
    cost: 10000,
    count: 0,
    description:
      "Personally I don't like these, but they make the burgers sell even faster!",
  },
  // Click Power Upgrades
  {
    id: "ketchup",
    name: "Ketchup",
    image: ketchup,
    type: "ClickPower",
    baseRate: 1,
    cost: 100,
    count: 0,
    description: "Great on the burger, great for some fries too!",
  },
  {
    id: "mayo",
    name: "Mayo",
    image: mayo,
    type: "ClickPower",
    baseRate: 5,
    cost: 1000,
    count: 0,
    description: "Yummy yummy in my tummy!",
  },
];

//misc variables
const costMult: number = 1.15;

let burgers: number = 0;
let burgersPerSecond: number = 0;
let clickPower: number = 1;

// variables for Animation
let lastTime: number = 0;
const MsPerSecond: number = 1000;

// automatically create items from array
let itemHtml = "";
availableItems.forEach((item) => {
  // Determine the rate descriptor based on type
  const rateDescriptor = item.type === "BPS" ? "BPS" : "click power";

  itemHtml += `
    <p>${item.name} +${item.baseRate} ${rateDescriptor}
        <br>Cost: <span id="${item.id}CostDisplay">${item.cost}</span> burgers
        <br>Owned: <span id="${item.id}CountDisplay">${item.count}</span>
    </p>
    <button id="${item.id}Button" title="${item.description}"><img src="${item.image}" class="icon" /></button>
    `;
});

document.body.innerHTML = `
    <!-- Counters & burger button -->
    <p>click power: <span id="clickPowerDisplay">${
  clickPower.toFixed(1)
}</span></p>
    <p>BPS: <span id="BPSDisplay">${burgersPerSecond.toFixed(1)}</span></p>
    <h2>burgers: <span id="counter">0</span></h2>
    <button id="burgButton"><img src="${burger}" class="bigbutton" /></button>
    
    <!-- Dynamically generated Upgrades -->
    ${itemHtml}
`;

// Add click handler
const button = document.getElementById("burgButton")!;
const counterElement = document.getElementById("counter")!;
const clickPowerDisplay = document.getElementById("clickPowerDisplay")!;
const BPSDisplay = document.getElementById("BPSDisplay")!;

// Function to update the main burger count display
const updateCounterDisplay = () => {
  counterElement.textContent = Math.floor(burgers).toString();
};

// Function to update the item-specific displays after a purchase
const updateItemDisplay = (item: Item) => {
  document.getElementById(`${item.id}CountDisplay`)!.textContent = item.count
    .toString();
  document.getElementById(`${item.id}CostDisplay`)!.textContent = item.cost
    .toString();
};

// Function to update the global BPS/Click Power displays
const updateGlobalDisplays = () => {
  BPSDisplay.textContent = burgersPerSecond.toFixed(1);
  clickPowerDisplay.textContent = clickPower.toFixed(1);
};

// Purchase function for all items
function handlePurchase(itemId: string) {
  // Find the item in array
  const item = availableItems.find((i) => i.id === itemId);

  if (!item) return;

  if (burgers >= item.cost) {
    burgers -= item.cost;

    item.count += 1;
    item.cost = Math.floor(item.cost * costMult);

    if (item.type === "BPS") {
      burgersPerSecond += item.baseRate;
    } else if (item.type === "ClickPower") {
      clickPower += item.baseRate;
    }

    updateCounterDisplay();
    updateItemDisplay(item);
    updateGlobalDisplays();
  }
}

// Burger button
button.addEventListener("click", () => {
  burgers += clickPower;
  updateCounterDisplay();
});

// Item Buttons
availableItems.forEach((item) => {
  const itemButton = document.getElementById(`${item.id}Button`);
  if (itemButton) {
    itemButton.addEventListener("click", () => {
      handlePurchase(item.id);
    });
  }
});

// Game Loop
function gameLoop(timestamp: DOMHighResTimeStamp) {
  if (lastTime === 0) {
    lastTime = timestamp;
  }

  const deltaTime_ms: number = timestamp - lastTime;
  const growthThisFrame: number = burgersPerSecond *
    (deltaTime_ms / MsPerSecond);
  burgers += growthThisFrame;
  updateCounterDisplay();
  lastTime = timestamp;
  self.requestAnimationFrame(gameLoop);
}

self.requestAnimationFrame(gameLoop);
