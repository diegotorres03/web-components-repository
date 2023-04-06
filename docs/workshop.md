# Reimagining the web with native Web Components

The goal of this lab is to showcase web components as an option when creating web application, with a focus on simplicity and reusability. 


## Prerequisites
---
1. (AWS Account)[https://aws.amazon.com/free/]
2. Text editor or IDE -recommend (Cloud9)[https://aws.amazon.com/cloud9/]
3. (NodeJS)[https://nodejs.org/en]
4. Basic understanding of HTML, JavaScript and CSS


## steps

## Stage link url
[js lib](https://d1hhjlyh3vlkqr.cloudfront.net/main.js)



---

1. [**Introduction to Web Components**](./step-by-step.md#chapter-1-intro-to-web-components)
    1. [Using our first web component](./step-by-step.md#section-1-using-our-firsts-components)
        1. [add a flip card](./step-by-step.md#activity-1-add-a-flip-card)
        2. [display front and back slots](./step-by-step.md#activity-2-display-front-and-back-slots)
        3. [disable flip](./step-by-step.md#activity-3-disable-flip)
    2. [Triggers and Events](./step-by-step.md#section-2-triggers-and-events)
        1. [create a button and modal](./step-by-step.md#activity-1-create-a-button-and-a-modal)
        2. [connect modal to the button](./step-by-step.md#activity-2-connect-modal-to-button)
        3. [connect flip to the modal](./step-by-step.md#activity-3-connect-flip-to-modal)
        4. [reflect event data in the UI](step-by-step.md#activity-4-reflect-event-data-in-ui)
    3. [Creating our first web component](step-by-step.md#section-3-creating-our-first-web-component)
        1. [create required files](./step-by-step.md#activity-1-create-required-files)
        2. [copy/paste html and CSS](./step-by-step.md#activity-2-copy-paste-html-and-css)
        3. [create `SecretCardComponent` class](./step-by-step.md#activity-3-create-secretcardcomponent-class)
        4. [testing the new `secret-card` tag](./step-by-step.md#activity-4-testing-the-new-secret-card-tag)
    4. [Communication from within a component](./step-by-step.md#section-4-communication-from-within-a-component)
        1. [remove the `button` and all the `trigger` and `on` attributes from `secret-card.html`](./step-by-step.md#activity-1-remove-the-button-ui-data-sync-and-all-the-trigger-and-on-attributes-from-secret-cardhtml)
        2. [get interactive elements from `secret-card.js`](./step-by-step.md#activity-2get-interactive-elements-from-secret-cardjs)
        3. [add event listeners](./step-by-step.md#activity-3-add-event-listeners)
        4. [get a value from an attribute](step-by-step.md#activity-4-get-a-value-from-an-attribute)
        5. [implement the `trigger` and `on` attributes](./step-by-step.md#activity-5-implement-the-trigger-and-on-attributes)
    <!-- 1. Let's share our component -->
2. **Composing apps with Web Components**
    1. [ ] Layout components
        1. [ ] app-layout
        2. [ ] deck-reader
        3. [ ] app-router
    2. [ ] Data components
        1. [ ] data point
        2. [ ] data set
        3. [ ] data query
        4. [ ] data store
        5. [ ] ui sync components
    3. [ ] Event components
        1. [ ] basic event handling
        2. [ ] `event-source`, `event-group` and `event stream`
        3. [ ] transforms and filters
        4. [ ] challenge?
3. **Deploy webapps to AWS**
    1. Introduction to [AWS CDK](https://aws.amazon.com/cdk/)
        1. install CDK
        2. initialize CDK project
        3. install reusable constructs for the lab
    2. Deploy webapp using CDK
        1. use `WebappConstruct`to deploy the webapp
        2. lambda@edge??
    3. Create and deploy a rest api using CDK
        1. create `RestApiContruct`
        2. greate some routes
        3. deploy api













[step by step guide](./step-by-step.md#chapter-1-intro-to-web-components)