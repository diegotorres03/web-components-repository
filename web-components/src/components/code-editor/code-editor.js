import {
  html,
  mapComponentEvents,
  updateVars,
  registerTriggers,
  sleep
} from '../../global/web-tools'


function removeSpacesAtBeginning(str, numSpaces) {
  const lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = lines[i].replace(new RegExp(`^ {${numSpaces}}`), '');
  }
  return lines.join("\n");
}



//import componentHtml from './flip-card.html'
//import componentStyle from './flip-card.css'

// https://github.com/ajaxorg/ace/wiki/Default-Keyboard-Shortcuts

export default class CodeEditorComponent extends HTMLElement {

  static EVENT_NAMES = [
    'onchange',
    'changeSelection',
    'changeCursor',
  ]

  #editor

  constructor() {
    super()
    const template = html`
          <!DOCTYPE html>
          <link href=" https://cdn.jsdelivr.net/npm/ace-builds@1.16.0/css/ace.min.css " rel="stylesheet">
          <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/emmet/2.4.2/emmet.es.min.js" integrity="sha512-xnvghbYeHFVuenouvPOKVQzADrDxuYxvqiFlmd3mu88ZwwDLEWvgex+6tnWkyW2Sgtj4yfNBizMlyp1z0iNU9Q==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->
          <!-- <script src=" https://cdn.jsdelivr.net/npm/ace-builds@1.16.0/src-min-noconflict/ace.min.js "></script> -->
   
          <style type="text/css" media="screen">
              #editor { 
                width: ${this.hasAttribute('width') ? this.getAttribute('width') : '100%'};
                height: ${this.hasAttribute('height') ? this.getAttribute('height') : '100%'};
              }
          </style>
          <h1>code editor</h1>
          <div id="editor">${this.textContent}</div>
      
  
      `
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template)
  }


  async connectedCallback() {
    mapComponentEvents(this)
    updateVars(this)
    registerTriggers(this, (event) => console.log(event))

    let content
    const templateTag = this.querySelector('template')


    if (this.hasAttribute('animate')) {
      if (templateTag) {
        this.textContent = templateTag.innerHTML
        content = templateTag.innerHTML
      } else {
        content = this.shadowRoot.querySelector('#editor').textContent
      }
      this.shadowRoot.querySelector('#editor').textContent = ''

    } else {
      if (templateTag) {
        // this.textContent = removeSpacesAtBeginning(templateTag.innerHTML, Number(this.getAttribute('tab')))
        this.shadowRoot.querySelector('#editor').textContent = removeSpacesAtBeginning(templateTag.innerHTML, Number(this.getAttribute('tab')))
      }
    }

    //   console.log(ace)
    const editorContainer = this.shadowRoot.querySelector('#editor')
    console.log('editorContainer', editorContainer)
    this.#editor = ace.edit(editorContainer);
    this.#editor.setTheme("ace/theme/monokai");
    this.#editor.session.setMode(`ace/mode/${this.getAttribute('language')}`); // javascript html and so on
    //   this.#editor.setOption("enableEmmet", true);

    if (this.hasAttribute('animate')) {
      this.#editor.setOptions({
        autoCloseBrackets: false,
      })
      console.log(this.#editor.getOptions())
    }


    this.#editor.setOptions({
      enableEmmet: true,
      useWorkers: true,
      enableBasicAutocompletion: true, // the editor completes the statement when you hit Ctrl + Space
      enableLiveAutocompletion: true, // the editor completes the statement while you are typing
      // showPrintMargin: false, // hides the vertical limiting strip
      // maxLines: Infinity,
      // fontSize: "100%" // ensures that the editor fits in the environment
    });

    if (this.hasAttribute('animate')) {
      // await sleep(4_000)
      this.#editor.setOptions({
        autoCloseBrackets: false,
      })

      this.type(content.trim())
    }

    this.#registerListeners()

  }

  go(lineNumber) {
    this.#editor.gotoLine(lineNumber);
  }

  /**
   *
  *
  * @param {string} code
  * @param {number} [time=100]
  * @memberof CodeEditorComponent
  */
  async type(code, time = 50) {

    const lines = code.split(new RegExp('\n'))
    console.log(lines)


    for (let line of lines) {
      for (let char of line.trim()) {
        this.#editor.insert(char)
        await sleep(time)
      }
      this.#editor.insert('\n')

    }

  }

  #registerListeners() {
    // this.#editor.session.on('change', (delta) => {
    //   // delta.start, delta.end, delta.lines, delta.action
    //   console.log(delta)
    // })

    this.#editor.session.selection.on('changeSelection', (event) => {
      const selection = this.#editor.session.getSelection()
      const lines = selection.doc.$lines
      const text = lines.join('\n')
      console.log('changeSelection', selection.doc.$lines, text)
    });

    this.#editor.session.selection.on('changeCursor', (event) => {
      console.log('changeCursor', event)
    });

  }

  disconnectedCallback() { }

  attributeChangedCallback(name, oldValue, newValue) { }

  adoptedCallback() { }

}

window.customElements.define('code-editor', CodeEditorComponent)


