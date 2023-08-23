import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
} from '../../global/web-tools'

import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import ctxmenu from 'cytoscape-cxtmenu'

//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

export default class GraphViewerComponent extends HTMLElement {

  constructor() {
    super()
    const template = html`<h1>graph</h1>
      <div id="cytospace-area" style="width: 100%; height: 100%;"></div>
    `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
    console.log(cytoscape)

    const childGraphNodes = [...this.querySelectorAll('graph-node')]
    const childGraphEdges = [...this.querySelectorAll('graph-edge')]

    console.log('childGraphNodes', childGraphNodes)
    console.log('childGraphEdges', childGraphEdges)
    cytoscape.use(klay)
    cytoscape.use(ctxmenu)

    const cy = window.cy = cytoscape({
      container: this.shadowRoot.getElementById('cytospace-area'),

      // demo your layout
      layout: {
        name: 'klay',
      },

      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#dd4de2',
            'label': 'data(id)'
          }
        },

        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'target-arrow-shape': 'triangle',
            'line-color': '#dd4de2',
            'target-arrow-color': '#dd4de2',
            'opacity': 0.5,
            'label': 'data(id)'
          }
        }
      ],

        elements: [
          ...childGraphNodes.map(element => ({
            data: {
              id: element.id,
              weight: element.dataset.weight
            },
          })),
          ...childGraphEdges.map(element => ({
            data: {
              id: element.id,
              source: element.getAttribute('source'),
              target: element.getAttribute('target'),
            }
          }))
        ],
    //   elements: [ // list of graph elements to start with
    //     { data: { id: 'a', weight: 70 } },
    //     { data: { id: 'b', weight: 76 } },
    //     { data: { id: 'c', weight: 70 } },
    //     { data: { id: 'd', weight: 78 } },
    //     { data: { id: 'e', weight: 78 } },
    //     { data: { id: 'f', weight: 70 } },
    //     { data: { id: 'g', weight: 78 } },
    //     { data: { id: 'ac', source: 'a', target: 'c' } },
    //     { data: { id: 'ab', source: 'a', target: 'b' } },
    //     { data: { id: 'bc', source: 'b', target: 'd' } },
    //     { data: { id: 'cd', source: 'c', target: 'd' } },
    //     { data: { id: 'de', source: 'd', target: 'e' } },
    //     { data: { id: 'dg', source: 'd', target: 'g' } },
    //     { data: { id: 'df', source: 'd', target: 'f' } },
    //   ]
    });


    cy.cxtmenu({
      selector: 'node, edge',

      commands: [
        {
          content: '💣',
          select: function (ele) {
            console.log(ele.id())
            var collection = cy.elements(`node[weight < ${ele.data('weight')}]`);
            cy.remove(collection);
          }
        },


        {
          content: '🚀',
          select: function (ele) {
            console.log(ele.data('name'));
          },
          // enabled: false
        },

        {
          content: '🏹',
          select: function (ele) {
            console.log(ele.id())
            var collection = cy.elements(`node[weight > ${ele.data('weight')}]`);
            cy.remove(collection);
          }
        }
      ]
    });

    cy.cxtmenu({
      selector: 'core',

      commands: [
        {
          content: 'bg1',
          select: function () {
            console.log('bg1');
          }
        },

        {
          content: 'bg2',
          select: function () {
            console.log('bg2');
          }
        }
      ]
    });



    // setTimeout(() => {
    //   const item = cy.$('#a')
    //   cy.remove(item)
    // }, 5_000)

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

window.customElements.define('graph-viewer', GraphViewerComponent)
