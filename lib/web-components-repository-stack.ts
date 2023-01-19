import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { WebAppConstruct } from '../lib/webapp/webapp-construct'
import { ApiBuilderConstruct } from '../lib/rest-api/api-builder-construct'
import { DynamoCostruct } from '../lib/dynamodb/dynamodb-construct'
import { GraphQLConstruct } from './graphql/graphql-builder-construct'
// import {} from ''

export class WebComponentsRepositoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const webapp = new WebAppConstruct(this, 'wc-repo-webapp')
    webapp
      .run('./web-components', 'npm i')
      .run('./web-components', 'npx webpack')
      .run('./web-components', 'rm -rf ./node_modules')
      .addAssets('./web-components')

    const apiBuilder = new ApiBuilderConstruct(this, 'wc-demo-rest-api')

    const demoTable = new DynamoCostruct(this, 'demo-table')
    demoTable.addKeys('partitionKey', 'sortKey')


    const demoApi = apiBuilder.createApi('WCDemoApi')


    demoApi.get('/items', async function (event) {
      console.log(JSON.stringify(event, undefined, 2))

      const { multiValueQueryStringParameters } = event

      const aws = require('aws-sdk')
      const dynamo = new aws.DynamoDB.DocumentClient()



      let params

      const filterExpressions = []

      if (!multiValueQueryStringParameters) {
        params = {
          TableName: process.env.TABLE_NAME,
        }
      } else {

        params = {
          TableName: process.env.TABLE_NAME,
          FilterExpression: '#partitionKey = :partitionKey_1 or #partitionKey = :partitionKey_2',
          ExpressionAttributeNames: {},
          ExpressionAttributeValues: {},
        }

        Object.keys(multiValueQueryStringParameters)
          .map(key => {
            let filters = []
            params.ExpressionAttributeNames[`#${key}`] = key

            multiValueQueryStringParameters[key].forEach((value, index) => {
              params.ExpressionAttributeValues[`:${key}_${index}`] = value
              // @ts-ignore
              filters.push(` #${key} = :${key}_${index} `)
            })
            // @ts-ignore
            filterExpressions.push('(' + filters.join(' or ') + ')')
          })

        params.FilterExpression = filterExpressions.join(' and ')
      }

      console.log(JSON.stringify(params, undefined, 2))
      const res = await dynamo.scan(params).promise()

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

    demoApi.post('/items', async function (event) {
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
