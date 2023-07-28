import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../global/web-tools'


//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DeviceAccelerationComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`<b>Accelerometer active<b>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)


    // window.addEventListener("deviceorientation", handleOrientation, true);
    const interval = setInterval(() => {
      this.shadowRoot.querySelector('b').innerText = Date.now()
    }, 1000)

    if (!Accelerometer) {
      return
    }

    // ya le marco al whatsaap

    const acl = new Accelerometer({ frequency: 60 });
    acl.addEventListener("reading", () => {
      clearInterval(interval)
      this.shadowRoot.querySelector('b').innerText = acl.x

      console.log(`Acceleration along the X-axis ${acl.x}`);
      console.log(`Acceleration along the Y-axis ${acl.y}`);
      console.log(`Acceleration along the Z-axis ${acl.z}`);
    });
    acl.start();



    // const options = { frequency: 60, referenceFrame: "device" };
    // const sensor = new AbsoluteOrientationSensor(options);

    // sensor.addEventListener("reading", () => {
    //   // model is a Three.js object instantiated elsewhere.
    //   model.quaternion.fromArray(sensor.quaternion).inverse();
    // });
    // sensor.addEventListener("error", (error) => {
    //   if (error.name === "NotReadableError") {
    //     console.log("Sensor is not available.");
    //   }
    // });
    // sensor.start();

  }


  connectedCallback() {
    // mapComponentEvents(this)
    // updateVars(this)
    registerTriggers(this, (event) => console.log(event))
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('device-acceleration', DeviceAccelerationComponent)
