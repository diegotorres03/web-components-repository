// import { mapComponentEvents, updateVars, registerTriggers, html } from "../../../global/web-tools.js";
import {
  html, 
  mapComponentEvents,
  updateVars,
  registerTriggers, 
} from '../../../global/web-tools'

import FlipCardHtml from "./flip-card.html";
import FlipCardCss from "./flip-card.css";


class FlipCard extends HTMLElement {
  constructor() {
    super();

    const template = html`
      <style>
        ${FlipCardCss}
      </style>
      ${FlipCardHtml}
    `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template);

  }

  conectedCallback() {
    mapComponentEvents(this);
    updateVars(this);
    console.log(registerTriggers)
    registerTriggers(this, this.flip);
  }

  flip() {
    const flipcard = this.shadowRoot.querySelector(".flip-card");
    // log(flipcard.classList)
    flipcard.classList.toggle("active");
    // log(flipcard.classList)
    this.dispatchEvent(
      new CustomEvent("flipped", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

export default FlipCard;
