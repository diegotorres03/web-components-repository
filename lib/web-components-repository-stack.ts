import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { WebAppConstruct } from '../lib/webapp/webapp-construct'
import { ApiBuilderConstruct } from '../lib/rest-api/api-builder-construct'
import { DynamoCostruct } from '../lib/dynamodb/dynamodb-construct'
// import {} from ''

export class WebComponentsRepositoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const webapp = new WebAppConstruct(this, 'wc-repo-webapp')
    webapp
      // .run('./web-components', 'npm i')
      // .run('./web-components', 'npx webpack')
      // .run('./web-components', 'rm -rf ./node_modules')
      .addAssets('./web-components')

    const apiBuilder = new ApiBuilderConstruct(this, 'wc-demo-rest-api')

    const demoTable = new DynamoCostruct(this, 'demo-table')
    demoTable.addKeys('partitionKey', 'sortKey')
    

    const demoApi = apiBuilder.createApi('WCDemoApi')


    demoApi.get('/items', async function (event) {
      console.log(JSON.stringify(event, undefined, 2))
      const queryObject = event.multiValueQueryStringParameters
      console.log(queryObject)
      const exampleItems = [
        { id: '1', name: 'user1', other: 'other field' },
        { id: '2', name: 'user2', other: 'other field' },
        { id: '3', name: 'user3', other: 'other field' },
        { id: '4', name: 'user4', other: 'other field' },
        { id: '5', name: 'user5', other: 'other field' },
        { id: '6', name: 'user6', other: 'other field' },
        { id: '7', name: 'user7', other: 'other field' },
        { id: '8', name: 'user8', other: 'other field' },
        { id: '9', name: 'user9', other: 'other field' },
        { id: '1', name: 'user1', moreItems: ['1', '2', '3'] },
        { id: '2', name: 'user2', moreItems: ['1', '2', '3'] },
        { id: '3', name: 'user3', moreItems: ['1', '2', '3'] },
        { id: '4', name: 'user4', moreItems: ['1', '2', '3'] },
        { id: '5', name: 'user5', moreItems: ['1', '2', '3'] },
        { id: '6', name: 'user6', moreItems: ['1', '2', '3'] },
        { id: '7', name: 'user7', moreItems: ['1', '2', '3'] },
        { id: '8', name: 'user8', moreItems: ['1', '2', '3'] },
        { id: '9', name: 'user9', moreItems: ['1', '2', '3'] },

      ]

      const aws = require('aws-sdk')
      const dynamo = new aws.DynamoDB.DocumentClient()

      const multiValueQueryStringParameters = {
        partitionKey: [
            "test",
            "hahaha"
        ],
        sortKey: [
            "hahaha"
        ],
        protocols: [],
    }

      const res = await dynamo.scan({
        TableName: process.env.TABLE_NAME,
      }).promise()

      console.log(JSON.stringify(res, undefined, 2))
      return {
        statusCode: 200,
        body: JSON.stringify(res.Items),
        headers: {
          'x-last-key': 'last',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,PATCH',
        }
      }
    }, {
      name: 'listItems',
      env: {
        ...props?.env,
        TABLE_NAME: demoTable.table.tableName,
      },
      access: [(fn) => demoTable.table.grantReadData(fn)],
    })

    demoApi.post('/items', async function(event) {
      const aws = require('aws-sdk')
      const dynamo = new aws.DynamoDB.DocumentClient()

      console.log(JSON.stringify(event, undefined, 2))


      const res = await dynamo.put({
        TableName: process.env.TABLE_NAME,
        Item: JSON.parse(event.body),
      }).promise()

      console.log(res)

      return {
        statusCode: 200,
        body: JSON.stringify(res),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': 'Content-type',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,GET,POST,PUT,PATCH',
        }
      }

    }, {
      name: 'createItem',
      env: {
        ...props?.env,
        TABLE_NAME: demoTable.table.tableName,
      },
      access: [(fn) => demoTable.table.grantWriteData(fn)]
    })



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
