import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

//Counter variable for button
let burgers: number = 0;

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
  <p>burgers: <span id="counter">0</span></p>
  <button id="burgButton">🍔</button>
`;

// Add click handler
const button = document.getElementById("burgButton")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  burgers += 1;
  counterElement.textContent = burgers.toString();
});
