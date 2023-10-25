import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'

import { MapLibreGL, Map } from 'maplibre-gl'



//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class GeoMapComponent extends HTMLElement {

  #map

  constructor() {
    super()
    const template = html`<div id="map"></div>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
    this.#renderMap()
  }

  #renderMap() {

    console.log('map', Map)

    this.#map = new Map({
      container: mapContainer,
      style: 'https://api.maptiler.com/maps/outdoor/style.json?key=YOUR_KEY',  // Replace with your map style or keep it if you want to use the default one. Note: If you're using MapTiler's default styles, you need an API key.
      center: [0, 0],  // Longitude, Latitude
      zoom: 2
    });
    console.log(this.#map)

  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))

  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('geo-map', GeoMapComponent)
