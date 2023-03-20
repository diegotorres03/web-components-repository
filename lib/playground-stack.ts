import {
  Stack, StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
// import { WebAppConstruct } from '../lib/webapp/webapp-construct'
import {
  WebAppConstruct,
  FunctionConstruct,
  FunctionOptions,
  DynamoCostruct,
  RestApiConstruct,
} from 'dt-cdk-lib'

export class PlaygroundStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //   const response = {
    //     body: 'content',
    //     bodyEncoding: 'text' | 'base64',
    //     headers: {
    //         'header name in lowercase': [{
    //             key: 'header name in standard case',
    //             value: 'header value'
    //          }],
    //          ...
    //     },
    //     status: 'HTTP status code (string)',
    //     statusDescription: 'status description'
    // };


    const handlerCode = (async (ev) => {
      console.log(ev)
      const content = `
      <\!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Simple Lambda@Edge Static Content Response</title>
        </head>
        <body>
          <p>Hello from Lambda@Edge!</p>
        </body>
      </html>
      `

      return {
        status: '200',
        statusDescription: 'OK',
        headers: {
          'cache-control': [{
            key: 'Cache-Control',
            value: 'max-age=100'
          }],
          'content-type': [{
            key: 'Content-Type',
            value: 'text/html'
          }]
        },
        body: content,
      }

    }).toString()


    const { VIEWER_REQUEST } = WebAppConstruct.EVENT_TYPES
    const webapp = new WebAppConstruct(this, 'wc-repo-webapp')
    webapp
      // .run('./web-components', 'npm i')
      // .run('./web-components', 'npx webpack')
      // .run('./web-components', 'rm -rf ./node_modules')
      .addAssets('./wc-demo-page')
      .path('auth/*')
      .on(VIEWER_REQUEST, handlerCode)
    // .onOriginRequest(handlerCode)
    // .onViewerRequest(handlerCode)




    const table = new DynamoCostruct(this, 'test-table-cdk-lib')
    table.addKeys('key', 'sort')

    table.on('change', (event => {
      console.log(JSON.stringify(event, null, 2))
      return { success: true }
    }).toString())


    if (!table.table) return

    const api = new RestApiConstruct(this, 'rest-api-to-play')

    api
      .cors()
      .authorizer('main-auth', (async ev => {
        console.log(JSON.stringify(ev, undefined, 2))
        // return {
        //   isAuthorized: true,
        //   context: {
        //     msg: 'use this to send data to handler fn',
        //   }
        // }
        return {
          "principalId": "abcdef", // The principal user identification associated with the token sent by the client.
          "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
              {
                "Action": "execute-api:Invoke",
                "Effect": "Allow",
                "Resource": "arn:aws:execute-api:{regionId}:{accountId}:{apiId}/{stage}/{httpVerb}/[{resource}/[{child-resources}]]"
              }
            ]
          },
          "context": {
            "exampleKey": "exampleValue"
          }
        }
      }).toString())

      .get('/users', (async function (event) {
        console.log(JSON.stringify(event, undefined, 2))
        const aws = require('aws-sdk')
        const dynamo = new aws.DynamoDB.DocumentClient({ region: 'us-east-1' })
        const table = 'playground2-testtablecdklibtestTable7CC566A5-84C54XYWIMJQ'

        const res = await dynamo.scan({
          TableName: table,
        }).promise()

        return {
          statusCode: 200,
          body: JSON.stringify(res.Items),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,PATCH"
          },
        }
      }).toString()).readFrom(table.table)

      .post('/users', (async event => {
        console.log(JSON.stringify(event, undefined, 2))
        const aws = require('aws-sdk')
        const dynamo = new aws.DynamoDB.DocumentClient({ region: 'us-east-1' })
        const table = 'playground2-testtablecdklibtestTable7CC566A5-84C54XYWIMJQ'

        await dynamo.put({
          TableName: table,
          Item: JSON.parse(event.body)
        }).promise()

        return {
          statusCode: 204,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,PATCH"
          },
        }
      }).toString()).writeTo(table.table)
    // .put('/users/{userId}', sampleGetHandler)
    // .delete('/users/{userId}', sampleGetHandler)


    // const fn = new FunctionConstruct(this, 'test-fn-cdk-lib')


    // fn.createLayer('js-dax-dependencies', './lambda/layers/dax')

    // fn.handler(((event) => {
    //   console.log(JSON.stringify(event, null, 2))
    //   console.log('this is a test lambda, to log the evnets')
    //   const test = require('test')
    //   console.log(JSON.stringify(test, null, 2))

    // }).toString())


    // fn.useLayer()


    // db.createDax({
    //   securityGroupIds: props.daxSecurityGroupIds,
    //   subnetIds: props.daxSubnetIds
    // })

    // const table = new DynamoCostruct(this, 'test-table-cdk-lib')
    // table.addKeys('key', 'sort')

    // table.on('change', (event => {
    //   console.log(JSON.stringify(event, null, 2))
    //   return { success: true }
    // }).toString())



  }
}



  // "EQ"
  // "NE"
  // "IN"
  // "LE"
  // "LT"
  // "GE"
  // "GT"
  // "BETWEEN"
  // "NOT_NULL"
  // "NULL"
  // "CONTAINS"
  // "NOT_CONTAINS"
  // "BEGINS_WITH"
