// import { mapComponentEvents, updateVars, registerTriggers, html } from "../../../global/web-tools.js";
import {
  html,
  mapComponentEvents,
  sleep,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import FlipCardHtml from "./flip-card.html";
import FlipCardCss from "./flip-card.css";


export default class FlipCard extends HTMLElement {
  get DEFAULT_EVENT_NAME() {
    return 'flipped'
  }


  constructor() {
    super();

    const disabled = this.hasAttribute('disabled')

    const template = html`
      <style>
      ${FlipCardCss}
      ${disabled ? '' : `.flip-card-box:hover .flip-card {
        transform: rotateY(180deg);
      }`}
      </style>
      ${FlipCardHtml}
    `

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template);

  }

  connectedCallback() {

    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, () => this.flip())

  }

  flip() {
    const flipcard = this.shadowRoot.querySelector(".flip-card");
    // log(flipcard.classList)
    flipcard.classList.toggle("active");
    // log(flipcard.classList)
    this.dispatchEvent(
      new CustomEvent(this.DEFAULT_EVENT_NAME, {
        bubbles: true,
        composed: true,
      })
    );
  }
}


