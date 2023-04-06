# Reimagining the web with native Web Components

The goal with this lab is to showcase alternatives to create web applications with a focus on reusable and easy to use 


## prerequisits
1. **Intro to Html** optional
    1. Html tags
        1. definition
        1. examples
    1. Css selectors
        1. id
        1. class
        1. data-attributes
    1. javascript `querySelector`
        1. geting element from the DOM with css selectors
        1. listen to events
        1. changing element properties
        1. adding/removing css clases

## steps

## Stage link url
[js lib](https://d1hhjlyh3vlkqr.cloudfront.net/main.js)



---

1. [**Intro to Web Components**](./step-by-step.md#chapter-1-intro-to-web-components)
    1. [using our first web component](./step-by-step.md#section-1-using-our-firsts-components)
        1. [add a flip card](./step-by-step.md#activity-1-add-a-flip-card)
        2. [display front and back slots](./step-by-step.md#activity-2-display-front-and-back-slots)
        3. [disable flip](./step-by-step.md#activity-3-disable-flip)
    2. [triggers and events](./step-by-step.md#section-2-triggers-and-events)
        1. [create a button and a modal](./step-by-step.md#activity-1-create-a-button-and-a-modal)
        2. [connect modal to button](./step-by-step.md#activity-2-connect-modal-to-button)
        3. [connect flip to modal](./step-by-step.md#activity-3-connect-flip-to-modal)
        4. [reflect event data in ui](step-by-step.md#activity-4-reflect-event-data-in-ui)
    3. [creating our first web component](step-by-step.md#section-3-creating-our-first-web-component)
        1. [create required files](./step-by-step.md#activity-1-create-required-files)
        2. [copy paste html and css](./step-by-step.md#activity-2-copy-paste-html-and-css)
        3. [create `SecretCardComponent` class](./step-by-step.md#activity-3-create-secretcardcomponent-class)
        4. [testing the new `secret-card` tag](./step-by-step.md#activity-4-testing-the-new-secret-card-tag)
    4. [comunication from within a component](./step-by-step.md#section-4-comunication-from-within-a-component)
        1. [remove the `button` and all the `trigger` and `on` attributes from `secret-card.html`](./step-by-step.md#activity-1-remove-the-button-ui-data-sync-and-all-the-trigger-and-on-attributes-from-secret-cardhtml)
        2. [get interactive elements from `secret-card.js`](./step-by-step.md#activity-2get-interactive-elements-from-secret-cardjs)
        3. [add event listeners](./step-by-step.md#activity-3-add-event-listeners)
        4. [get a value from an attribute](step-by-step.md#activity-4-get-a-value-from-an-attribute)
        5. [implement the `trigger` and `on` attributes](./step-by-step.md#activity-5-implement-the-trigger-and-on-attributes)
    <!-- 1. let's share our component -->
2. **Composing apps with Web Components**
    1. [ ] data components
       1. [ ] data point anddata set
       2. [ ] data query
       3. [ ] data store
       4. [ ] ui sync components
    2. [ ] event components
       1. [ ] basic event handling
       2. [ ] `event-source`, `event-group` and `event stream`
       3. [ ] transforms and filters
    3. [ ] layout components
       1. [ ] app-layout
       2. [ ] deck-reader
       3. [ ] app-router
3. **deploy webapps to AWS**
    1. Intro to AWS CDK
        1. install cdk
        2. init cdk app
        3. install reusable constructs for lab
    2. deploy webapp using CDK
        1. use `WebappConstruct` to deploy webapp
        2. lambda@edge??
    3. create and deploy a rest api using CDK
        1. create `RestApiContruct`
        2. greate some routes
        3. deploy api











[step by step guide](./step-by-step.md#chapter-1-intro-to-web-components)