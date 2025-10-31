import burger from "./burgerSS.png";
import cheese from "./cheeseSS.png";
import fries from "./friesSS.png";
import ketchup from "./ketchupSS.png";
import lettuce from "./lettuceSS.png";
import mayo from "./mayoSS.png";
import onion from "./onionSS.png";

import "./style.css";

// ------------- Variables --------------------------

//misc variables
const costMultiplier: number = 1.15;

let points: number = 0;
let pointsPerSecond: number = 0;
let pointsPerClick: number = 1;

// variables for Animation
let lastTime: number = 0;
const MsPerSecond: number = 1000;

// ------------- Upgrades --------------------------

// Item structure
interface Item {
  id: string;
  name: string;
  image: string;
  type: "pointsPerSecond" | "pointsPerClick";
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
    type: "pointsPerSecond",
    baseRate: 0.1,
    cost: 10,
    count: 0,
    description: "Some french fries always go well with a burger!",
  },
  {
    id: "cheese",
    name: "Cheese",
    image: cheese,
    type: "pointsPerSecond",
    baseRate: 2,
    cost: 100,
    count: 0,
    description: "Mmmm chezburger mmm chezburger mmmmmmmm chezzzburgerrrr",
  },
  {
    id: "lettuce",
    name: "Lettuce",
    image: lettuce,
    type: "pointsPerSecond",
    baseRate: 50,
    cost: 1000,
    count: 0,
    description: "Make sure to eat your greens! adds some cruch to the burger!",
  },
  {
    id: "onion",
    name: "Onion",
    image: onion,
    type: "pointsPerSecond",
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
    type: "pointsPerClick",
    baseRate: 1,
    cost: 100,
    count: 0,
    description: "Great on the burger, great for some fries too!",
  },
  {
    id: "mayo",
    name: "Mayo",
    image: mayo,
    type: "pointsPerClick",
    baseRate: 5,
    cost: 1000,
    count: 0,
    description: "Yummy yummy in my tummy!",
  },
];

// automatically create items from array using map and join
const itemHtml = availableItems.map(renderItem).join("");

// ------------- HTML --------------------------
// edited this section to mirror the same design as https://github.com/fractalizes/cmpm-121-f25-d1
document.body.innerHTML = `
<div class="game-container">
  <div class="left-panel">
    <h1 class="game-title">
      <span class="burger-icon">🍔</span> Big Belly Burger <span class="burger-icon">🍔</span>
    </h1>
    <p class="total-display">Total: $<span id="counter">0</span> ($<span id="BPSDisplay">0.0</span>/sec)</p>
    <button id="burgButton" class="main-click-button">
      <img src="${burger}" alt="Burger" class="main-button-image" />
    </button>
    <p class="click-power-display">Click Power: +$<span id="clickPowerDisplay">${
  pointsPerClick.toFixed(1)
}</span></p>
  </div>
  <div class="right-panel">
    <div class="upgrades-list">
      ${itemHtml}
    </div>
  </div>
</div>
`;

// Add click handler
const button = document.getElementById("burgButton")!;
const counterElement = document.getElementById("counter")!;
const clickPowerDisplay = document.getElementById("clickPowerDisplay")!;
const BPSDisplay = document.getElementById("BPSDisplay")!;

// ------------- Functions --------------------------

// Function to generate the HTML for a single item
function renderItem(item: Item): string {
  const rateDescriptor = item.type === "pointsPerSecond" ? "/sec" : "/click";
  const nextRate = item.baseRate;

  const initialTitle = generateItemTitle(item);

  return `
  <button id="${item.id}Button" class="upgrade-card" title="${initialTitle}">
    <div class="upgrade-icon">
      <img src="${item.image}" alt="${item.name}" />
    </div>
    <div class="upgrade-details">
      <div class="upgrade-header">
        <span class="upgrade-name">${item.name}</span>
        <span class="upgrade-count">x<span id="${item.id}CountDisplay">${item.count}</span></span>
      </div>
        <div class="upgrade-stats">
          [$<span id="${item.id}CostDisplay">${item.cost}</span> ~ +$${
    nextRate.toFixed(1)
  }${rateDescriptor}]
        </div>
        <div class="upgrade-description">${item.description}</div>
    </div>
  </button>
  `;
}

function generateItemTitle(item: Item): string {
  const rateDescriptor = item.type === "pointsPerSecond" ? "BPS" : "PPC";
  const totalRate = item.baseRate * item.count;

  return `Total Bonus: +${totalRate.toFixed(1)} ${rateDescriptor}`;
}

// Helper function for floating numbers on click inspired from https://github.com/inyoo403/D1.a
function floatingGain(amount: number, x: number, y: number) {
  const textEl = document.createElement("div");
  textEl.className = "floating-gain";
  textEl.textContent = `+${amount.toFixed(0)}`; // Show whole number gain

  const container = document.getElementById("burgButton")!.parentElement!;
  const rect = container.getBoundingClientRect();

  textEl.style.left = `${x - rect.left}px`;
  textEl.style.top = `${y - rect.top}px`;

  container.appendChild(textEl);

  // Clean up the element after its CSS animation finishes
  textEl.addEventListener("animationend", () => textEl.remove());
}

// Function to update the main burger count display
const updateCounterDisplay = () => {
  counterElement.textContent = Math.floor(points).toString();
};

// Function to update the item-specific displays after a purchase
const updateItemDisplay = (item: Item) => {
  document.getElementById(`${item.id}CountDisplay`)!.textContent = item.count
    .toString();
  document.getElementById(`${item.id}CostDisplay`)!.textContent = item.cost
    .toString();
  const itemButton = document.getElementById(
    `${item.id}Button`,
  ) as HTMLButtonElement;
  if (itemButton) {
    itemButton.title = generateItemTitle(item);
  }
};

// Function to update the global BPS/Click Power displays
const updateGlobalDisplays = () => {
  BPSDisplay.textContent = pointsPerSecond.toFixed(1);
  clickPowerDisplay.textContent = pointsPerClick.toFixed(1);
};

// Purchase function for all items
function handlePurchase(itemId: string) {
  // Find the item in array
  const item = availableItems.find((i) => i.id === itemId);

  if (!item) return;

  if (points >= item.cost) {
    points -= item.cost;

    item.count += 1;
    item.cost = Math.floor(item.cost * costMultiplier);

    if (item.type === "pointsPerSecond") {
      pointsPerSecond += item.baseRate;
    } else if (item.type === "pointsPerClick") {
      pointsPerClick += item.baseRate;
    }

    updateCounterDisplay();
    updateItemDisplay(item);
    updateGlobalDisplays();
  }
}

// ------------- Eventlisteners --------------------------

// Burger button
button.addEventListener("click", (e) => {
  points += pointsPerClick;
  updateCounterDisplay();
  floatingGain(pointsPerClick, e.clientX, e.clientY);
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

//  ------------- Game Loop --------------------------
function gameLoop(timestamp: DOMHighResTimeStamp) {
  if (lastTime === 0) {
    lastTime = timestamp;
  }

  const deltaTime_ms: number = timestamp - lastTime;
  const growthThisFrame: number = pointsPerSecond *
    (deltaTime_ms / MsPerSecond);
  points += growthThisFrame;
  updateCounterDisplay();
  lastTime = timestamp;
  self.requestAnimationFrame(gameLoop);
}

self.requestAnimationFrame(gameLoop);
