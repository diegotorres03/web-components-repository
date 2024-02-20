import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../../global/web-tools';

import componentHtml from './landing-footer.html';
import componentStyle from './landing-footer.css';

export default class LandingFooterComponent extends HTMLElement {
  constructor() {
    super();
    const template = html`
      <style>
        ${componentStyle}
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

  attributeChangedCallback(name, oldValue, newValue) {}

  adoptedCallback() {}
}

window.customElements.define('landing-footer', LandingFooterComponent);
