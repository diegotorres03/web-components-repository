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
} from 'dt-cdk-lib'

export class PlaygroundStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);



    const webapp = new WebAppConstruct(this, 'wc-repo-webapp')
    // webapp
    // .run('./web-components', 'npm i')
    // .run('./web-components', 'npx webpack')
    // .run('./web-components', 'rm -rf ./node_modules')
    // .addAssets('./web-components')

    // webapp.onOriginRequest('auth/*', ((ev) => {
    //   console.log(ev)
    //   return ev.request
    // }).toString())
    webapp.onViewerRequest('users/*', ((ev) => {
      console.log(ev)
      return ev.request
    }).toString())
    // webapp.onOriginResponse('auth/*', ((ev) => {console.log(ev); return ev.request}).toString())
    // webapp.onViewerResponse('auth/*', ((ev) => {console.log(ev); return ev.request}).toString())



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
