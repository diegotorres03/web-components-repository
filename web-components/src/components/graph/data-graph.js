import {
  html,
  mapComponentEvents,
  updateVars,
  sleep,
  registerTriggers,
} from '../../global/web-tools'

import * as vis from 'vis-network'

//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class DataGraph extends HTMLElement {

  constructor() {
    super()
    const template = html`
        <style type="text/css">
          #graph {
            width: 600px;
            height: 400px;
            border: 1px solid lightgray;
          }
        </style>
        <div id="graph"></div>
        <main><h1>on main</h1><main>
        <slot></slot>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }



 async connectedCallback() {
    registerTriggers(this, (event) => console.log(event))
    // create a new MutationObserver instance
    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          console.log('innerHTML changed:', this.innerHTML);
        }
      }
    });

    // observe changes to the element's child nodes
    observer.observe(this, { childList: true });

    const nodes = Array.from(this.querySelectorAll('data-point'))
    const edges = Array.from(this.querySelectorAll('data-rel'))
    nodes.forEach(node => {
      console.log('[item node]:', node)
    })

    await sleep(10) // [ ] Fix this, is loading before the data-point adds the from attr
    const jsonEdges = []
    edges.forEach(edge => {
      let item = {}
      Array.from(edge.attributes)
        .filter(attr => attr.name === 'from' || attr.name === 'to')
        .forEach(attr => item[attr.name] = attr.value.replace('#', ''))

      jsonEdges.push(item)
    })

    // console.log(JSON.stringify(jsonEdges, null, 2))

    const jsonNodes = []
    nodes.forEach(node => {
      let item = {}
      Array.from(node.attributes)
        .forEach(attr => item[attr.name === 'name' ? 'label' : attr.name] = attr.value )
      jsonNodes.push(item)
    })

    // console.log(JSON.stringify(jsonNodes, null, 2))
    // console.log(JSON.stringify(jsonEdges, null, 2))


    var container = this.shadowRoot.getElementById('graph');
    var data = {
      nodes: jsonNodes,
      edges: jsonEdges,
    };
    var options = {
      // directed: true, // set the graph to be directed
      edges: {
        arrows: {
          to: true // show arrows on the edges pointing to their target nodes
        }
      }
    };
    var network = new vis.Network(container, data, options);
  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('data-graph', DataGraph)
