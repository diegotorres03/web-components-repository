import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools';

import componentHtml from './app-layout.html';
import componentCss from './app-layout.css';
import globalStyles from '../../../global/style-tools.css';

export default class AppLayoutComponent extends HTMLElement {
  static get observedAttributes() {
    return ['hide-left'];
  }

  get isHidden() {
    //
    return (
      this.shadowRoot.querySelector('[data-left-content-hide]').style
        .display === 'none'
    );
  }

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

  showLeftContent() {
    const leftContent = this.shadowRoot.querySelector(
      '[data-left-content-hide]',
    );
    leftContent.style.display = 'flex';
  }

  hideLeftContent() {
    const leftContent = this.shadowRoot.querySelector(
      '[data-left-content-hide]',
    );
    leftContent.style.display = 'none';
    console.log('leftContent', leftContent);
  }

  connectedCallback() {
    mapComponentEvents(this);
    updateVars(this);
    registerTriggers(this, (event) => console.log(event));

    console.log(globalStyles);
    const leftContent = this.querySelector('[slot="left-content"]');
    console.log('leftContent', leftContent);
    if (leftContent.hasAttribute('hide-left')) {
      this.hideLeftContent();
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {
    // console.log(name, oldValue, newValue)
    if (name === 'hide-left') {
      console.log('hide-left', newValue);
      if (newValue === null) this.hideLeftContent();
      else this.showLeftContent();
    }
  }

  adoptedCallback() {}
}

window.customElements.define('app-layout', AppLayoutComponent);
