import { Chart } from 'chart.js/auto'

import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
  sleep,
} from '../../global/web-tools'

export default class DataChartComponent extends HTMLElement {

  static get observedAttributes(){
    return ['width', 'height']
  }

  constructor() {
    super()
    const template = html`
    <div><canvas id="chart"></canvas></div>`
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)

  }


  connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))
    this.renderChart()
  }

  async renderChart() {
    // datapoints
      await sleep(10)

      const dataSets = Array.from(this.querySelectorAll('data-set'))
      console.log(dataSets)

      // const dataPoints = Array.from(this.querySelectorAll('data-point'))

      function getDataPoints(dataSet) {
          const dataPoints = Array.from(dataSet.querySelectorAll('data-point'))
          console.log(dataPoints)

          const entries = dataPoints.map(point => {
              const attributes = [...point.attributes]
              const keyValuePairs = attributes.map(attr => {
                  return { key: attr.nodeName, value: attr.nodeValue }
              })
              return keyValuePairs
          })
          console.log('entries', entries)

          const data = entries.map(entry => {
              let record = {}
              entry.forEach(item => {
                  record[item.key] = item.value
              })
              return record
          })

          console.log(data)
          return {
              label: dataSet.getAttribute('label') || 'no-label',
              data: data.map(item => Number(item.count)),
              rawData: data,
          }
      }

      const datasets = dataSets.map(getDataPoints)
      // console.log(JSON.stringify(datasets, undefined, 2))

      const chartData = {
          labels: datasets[0].rawData.map(row => row.year),
          datasets,
          // [
          //     {
          //         label: 'Acquisitions by year',
          //         data: data.map(row => row.count)
          //     }
          // ]
      }
      console.log(JSON.stringify(chartData, undefined, 2))


      const displayLegend = this.hasAttribute('legend')

      this.chart = new Chart(
          this.shadowRoot.getElementById('chart'),
          {
              // type:  'line',
              type: this.getAttribute('type') || 'line',
              data: chartData,
              options: {
                plugins: {
                  legend: { display: displayLegend }
                }
              }
              // options
          }
      );

      // const labels = Utils.months({count: 7});
     
      // new Chart(this.shadowRoot.getElementById('chart'), {
      //   type: 'bar',
      //   data: {
      //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      //     datasets: [{
      //       label: '# of Votes',
      //       data: [12, 19, 3, 5, 2, 3],
      //       borderWidth: 1
      //     }]
      //   },
      // });

  }

  
  attributeChangedCallback(name, oldValue, newValue) { 
    if(name === 'type') {
        console.dir(this.chart, null, 2)
        this.chart.config.type = this.getAttribute('type')
        this.chart.update()
        console.log(newValue)
    }

    // if(name === 'wigth') {
    //   this.shadowRoot.querySelector('#chart').style.width = newValue
    // }
    // if (name === 'height') {
    //   this.shadowRoot.querySelector('#chart').style.height = newValue
    // }
  }

}

window.customElements.define('data-chart', DataChartComponent)




// (function (module) {

//   const Chart = require('chart.js/auto')

  // const data = [
  //     { year: 2010, count: 10 },
  //     { year: 2011, count: 20 },
  //     { year: 2012, count: 15 },
  //     { year: 2013, count: 25 },
  //     { year: 2014, count: 22 },
  //     { year: 2015, count: 30 },
  //     { year: 2016, count: 28 },
  // ];


//   class DataChartComponent extends HTMLElement {
      
//       static get observedAttributes() { return ['type']; }
      
//       test = true
//       #secret = 'WOW DUDEEE!!!!' // private variables


//       constructor() {
//           super()
//           console.log(this.#secret)
//       }

//       async _render() {
//           const inner = html`<div style="width: 800px;"><canvas id="chart"></canvas></div>
//       `
//           const shadow = this.attachShadow({ mode: 'open' })
//           shadow.appendChild(inner)

//           // [ ] get datapoints
//           await wait(10)

//           const dataSets = Array.from(this.querySelectorAll('data-set'))
//           console.log(dataSets)

//           // const dataPoints = Array.from(this.querySelectorAll('data-point'))

//           function getDataPoints(dataSet) {
//               const dataPoints = Array.from(dataSet.querySelectorAll('data-point'))
//               console.log(dataPoints)

//               const entries = dataPoints.map(point => {
//                   const attributes = [...point.attributes]
//                   const keyValuePairs = attributes.map(attr => {
//                       return { key: attr.nodeName, value: attr.nodeValue }
//                   })
//                   return keyValuePairs
//               })
//               console.log('entries', entries)

//               const data = entries.map(entry => {
//                   let record = {}
//                   entry.forEach(item => {
//                       record[item.key] = item.value
//                   })
//                   return record
//               })

//               console.log(data)
//               return {
//                   label: dataSet.getAttribute('label') || 'no-label',
//                   data: data.map(item => Number(item.count)),
//                   rawData: data,
//               }
//           }

//           const datasets = dataSets.map(getDataPoints)
//           // console.log(JSON.stringify(datasets, undefined, 2))

//           const chartData = {
//               labels: datasets[0].rawData.map(row => row.year),
//               datasets,
//               // [
//               //     {
//               //         label: 'Acquisitions by year',
//               //         data: data.map(row => row.count)
//               //     }
//               // ]
//           }
//           console.log(JSON.stringify(chartData, undefined, 2))


//           this.chart = new Chart(
//               this.shadowRoot.getElementById('chart'),
//               {
//                   type: this.getAttribute('type') || 'line',
//                   data: chartData,
//               }
//           );


//           // setTimeout(() => {
//           //     console.log(chartData.datasets)
//           //     chartData.datasets.forEach(item => item.data = item.data - 10 )
//           //     // console.log(data)
//           //     console.log(this.chart)
//           //     this.chart.update()
//           // }, 1_000)

//           // replacing inline handler function with own component methods
//           mapComponentEvents(this, eventNames)

//           // get variable names
//           updateVars(this)

//       }

//       connectedCallback() {
//           this._render()
//       }

//       disconnectedCallback() { }

//       attributeChangedCallback(name, oldValue, newValue) { 
//           if(name === 'type') {
//               console.dir(this.chart, null, 2)
//               this.chart.config.type = this.getAttribute('type')
//               this.chart.update()
//               console.log(newValue)
//           }
//       }

//       adoptedCallback() { }

//   }

//   window.customElements.define('data-chart', DataChartComponent)

//   module.exports = DataChartComponent

// })(module)
