import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools';

import componentHtml from './mobile-layout.html';
import componentCss from './mobile-layout.css';
import globalStyles from '../../../global/style-tools.css';

export default class MobileLayoutComponent extends HTMLElement {
  static get observedAttributes() {}

  constructor() {
    super();
    const template = html`
      <style>
        ${globalStyles}
      </style>
      <style>
        ${componentCss}
      </style>
      ${componentHtml}
    `;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template);
  }

  connectedCallback() {
    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, (event) => console.log(event));
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, newValue)
  }

  adoptedCallback() {}
}

window.customElements.define('mobile-layout', MobileLayoutComponent);
