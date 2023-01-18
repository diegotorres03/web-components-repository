exports.handler = async function (event) {
    console.log(JSON.stringify(event, undefined, 2));
    const queryObject = event.multiValueQueryStringParameters;

    const aws = require('aws-sdk');
    const dynamo = new aws.DynamoDB.DocumentClient();

    const res = await dynamo.scan({
        TableName: process.env.TABLE_NAME,
        FilterExpression: '#partitionKey = :partitionKey_1 or #partitionKey = :partitionKey_2',
        ExpressionAttributeNames: {
            '#partitionKey': 'partitionKey',
            //'#sortKey': 'sortKey'
        },
        ExpressionAttributeValues: {
            ':partitionKey_1': 'group3',
            ':partitionKey_2': 'group2',
            //':sortKey_1': 'item2',
        },
    }).promise()


    // console.log(JSON.stringify(res, undefined, 2))

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
}