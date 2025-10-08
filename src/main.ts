import condiment_1 from "./ketchupSS.png";
import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";

import "./style.css";

//Counter variable for button
let burgers: number = 0;
let clickPower: number = 1;

let ketchupCost: number = 5;
let ketchupPower: number = 1;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <p>burgers: <span id="counter">0</span></p>
  <button id="burgButton">🍔</button>
  <button id="ketchupButton"> <img src="${condiment_1}" class="icon" /> </button>
`;

// Add click handler
const button = document.getElementById("burgButton")!;
const counterElement = document.getElementById("counter")!;
const ketchupButton = document.getElementById("ketchupButton")!;

button.addEventListener("click", () => {
  burgers += clickPower;
  counterElement.textContent = burgers.toString();
});

ketchupButton.addEventListener("click", () => {
  if (burgers >= ketchupCost) {
    burgers -= ketchupCost;
    clickPower += ketchupPower;
    ketchupCost = Math.floor(ketchupCost * 1.5);

    counterElement.textContent = `${burgers}`;
  }
});
