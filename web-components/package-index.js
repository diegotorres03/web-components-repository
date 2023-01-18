const amplify = require('aws-amplify')
const dynamodbClient = require('@aws-sdk/client-dynamodb') // web-components/node_modules/@aws-sdk/client-dynamodb/dist-es/index.js

console.log(amplify)

global.window.modules = {
    'aws-amplify': amplify,
    '@aws-sdk/client-dynamodb':dynamodbClient,
}

