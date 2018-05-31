const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

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
    docClient.put(params, callbackFunction);
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
        resSend(err);
      } else {
        //console.log("Success", data.Item);
        resSend(data.Items);
      }
    });
}

const remove = (data, resSendFn) => {
    var params = {
        TableName: TABLE_NAME,
        Key: { code: parseInt(data.code) }
    }

    docClient.delete(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        resSendFn(err.message);
      } else {
        console.log("Success", data.Item);
        resSendFn(data.Item);
      }
    });
}

const editLaborPrice = (data, resSendFn) => {
    var params = {
        TableName: TABLE_NAME,
        Key: { code: parseInt(data.code) },
        UpdateExpression: `SET
            sellLaborPrice = :sellLaborPrice,
            sellPrice = :sellPrice
            `,
        ExpressionAttributeValues: {
            ':sellLaborPrice': data.sellLaborPrice,
            ':sellPrice': data.sellPrice
        },
        ReturnValues: 'UPDATED_NEW'
    }

    docClient.update(params, function(err, data) {
      if (err) {
        console.log("Error", err);
        resSendFn(err.message);
      } else {
        console.log("Success", data);
        resSendFn(data.Attributes);
      }
    });
}

const getAll = resSendFn => {
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
        resSendFn(err);
      } else {
        //console.log("Success", data.Items);
        resSendFn(data.Items);
      }
    });
};

module.exports = {
    add,
    get,
    getAll,
    remove,
    editLaborPrice
 }
