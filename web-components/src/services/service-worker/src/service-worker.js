

import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class ServiceWorkerComponent extends HTMLElement {


  #sw

  constructor() {
    super()
    const template = html``
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

    this.#registerWorker()


  }

  #registerWorker() {

    const cacheItems = Array.from(this.querySelectorAll('service-worker-cache'))

    const serviceWorkerCode = `
      console.log('\n\nthis is the service worker')
      self.addEventListener('install', function(event) {
        event.waitUntil(
          caches.open('my-cache').then(function(cache) {
            return cache.addAll([
              ${cacheItems.map(cache => `'${cache.getAttribute('path')}'`).join(', ')}
            ]);
          })
        );
      });
    
      // Listen for the fetch event and return the cached asset, if available
      self.addEventListener('fetch', function(event) {
        event.respondWith(
          caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
          })
        );
      });
    
    `

    console.log(serviceWorkerCode)
    // if ('serviceWorker' in navigator) {

    //   // let url = URL.createObjectURL(new Blob([serviceWorkerCode]))

    //   console.log(url)
    //   navigator.serviceWorker.register('./sw.js')
    //     .then(registration => {
    //       console.log('Service worker registered successfully!');
    //     })
    //     .catch(error => {
    //       console.log('Service worker registration failed:', error);
    //     });
    // }



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

window.customElements.define('service-worker', ServiceWorkerComponent)


