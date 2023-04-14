# Reimagining the web with native Web Components

The goal of this lab is to showcase web components as an option when creating web application, with a focus on simplicity and reusability. 


## Prerequisites
---
1. [AWS Account](https://aws.amazon.com/free/)
2. [Text editor or IDE -recommend (Cloud9)](https://aws.amazon.com/cloud9/)
3. [NodeJS](https://nodejs.org/en)
4. Basic understanding of HTML, JavaScript and CSS

## Stage link url
[js lib](https://d1hhjlyh3vlkqr.cloudfront.net/main.js)



---

1. [**Introduction to Web Components**](./step-by-step.md#chapter-1-introduction-to-web-components)
    1. [Using our first web component](./step-by-step.md#section-11-using-our-first-components)
        1. [Add a flip card](./step-by-step.md#activity-111-add-a-flip-card)
        2. [Create a button and modal](./step-by-step.md#activity-112-create-a-button-and-a-modal)
        3. [Connect flip to the modal](./step-by-step.md#activity-113-connect-flip-to-the-modal)
    2. [Creating our first web component](step-by-step.md#section-12-creating-our-first-web-component)
        1. [Create required files](./step-by-step.md#activity-121-create-required-files)
        2. [ Create SecretCardComponent class](./step-by-step.md#activity-122-create-secretcardcomponent-class)
        3. [Get interactive elements from secret-card.js](./step-by-step.md#activity-123-get-interactive-elements-from-secret-cardjs)
        4. [Get a value from an attribute](./step-by-step.md#activity-124-get-a-value-from-an-attribute)
        5. [Implement the `trigger` and `on` attributes](./step-by-step.md#activity-125-implement-the-trigger-and-on-attributes)
2. **Composing apps with Web Components**
    1. [Layout components](step-by-step.md#section-21-layout-components) 
        1. [App layout](step-by-step.md#activity-211-app-layout)
        2. [Hash routing](step-by-step.md#activity-212-hash-routing)
        3. [Grid layout](step-by-step.md#activity-213-grid-layout)
    2. [Creating a statefull component](step-by-step.md#section-22-creating-a-statefull-component)
        1. [Memory flip game](step-by-step.md#activity-221-memory-flip-game)
        2. [Generating content dynamically](step-by-step.md#activity-222-generating-content-dynamically)
        3. [Registering event listeners](step-by-step.md#activity-223-registering-event-listeners)
        4. [Emiting event from within the component](step-by-step.md#activity-224-emiting-event-from-within-the-component)
    3. [Data components](step-by-step.md#section-23-data-components)
        1. [Data point and data set](step-by-step.md#activity-231-data-point-and-data-set)
        2. [Data query](step-by-step.md#activity-232-data-query)
        3. [Data store](step-by-step.md#activity-233-data-store)
        4. [UI sync components](step-by-step.md#activity-234-ui-sync-components)
    4. [Event components](step-by-step.md#section-24-event-components)
        1. [Basic event handling](step-by-step.md#)
        2. [working with multiple event flows](step-by-step.md#)
        3. [transforms and filters](step-by-step.md#)
        4. [challenge?](step-by-step.md#)
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