const AWS = require('aws-sdk');
//AWS.config.update({region: 'eu-central-1'});
AWS.config.loadFromPath('./config.json');

// Create the DynamoDB service object
//ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});
//var docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-central-1'});
var doc = require('dynamodb-doc');
var docClient = new doc.DynamoDB();

const TABLE_NAME = 'ITEM';

const callbackFunction = (err, data) => {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data);
    }
}

const add = item => {
    var params = {
        TableName: TABLE_NAME,
        Item: {...item}
    }
    // Call DynamoDB to add the item to the table
    docClient.putItem(params, callbackFunction);
}

const get = (code, resSend) => {
    var params = {
      TableName: TABLE_NAME,
      Key: {code: code}
    };

    // Call DynamoDB to read the item from the table
    docClient.getItem(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        resSend("Err...");
      } else {
        console.log("Success", data.Item);
        resSend([data.Item]);
      }
    });
}

const getAll = (resSend) => {
    var params = {
        TableName: TABLE_NAME,
        FilterExpression: '#code between :start and :end',
        ExpressionAttributeNames: {
            '#code': 'code',
        },
        ExpressionAttributeValues: {
             ":start": 0,
             ":end": 9999999
        }
    }
    docClient.scan(params, (err, data) => {
      if (err) {
        console.log("Error", err);
        resSend("Err...");
      } else {
        console.log("Success", data.Items);
        resSend(data.Items);
      }
    });
};

module.exports = {
    add,
    get,
    getAll
 }
