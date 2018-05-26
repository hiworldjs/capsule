const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.static('dist'));

const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});

var path = require('path');
var port = process.env.PORT || 3000;

var randomize = (items) => {
    for (let i = 0; i < 100; i++) {
        items.push({
            code: `E000${i}`,
            name: "Dây chuyền vàng",
            age: "99.99%",
            price: "1884000",
            goldWeight: "1.95",
            originalLaborPrice: "300000",
            laborPrice: "0",
        });
    }
    return items;
}

app.get('/createTable', (req, res) => {
    // Create the DynamoDB service object
    ddb = new AWS.DynamoDB({apiVersion: '2012-10-08'});

    var params = {
      AttributeDefinitions: [
        {
            AttributeName: 'NAME',
            AttributeType: 'S'
        },
        {
            AttributeName: 'PRICE',
            AttributeType: 'N'
        }
      ],
      KeySchema: [
        {
            AttributeName: 'ID',
            KeyType: 'HASH'
        },
          {
              AttributeName: 'CODE',
              KeyType: 'RANGE'
          },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      },
      TableName: 'GOLD_AGE',
      StreamSpecification: {
        StreamEnabled: false
      }
    };

    // Call DynamoDB to create the table
    ddb.createTable(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        console.log("Success", data);
      }
    });
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/src/client/index.html'));
});

app.get('/getAllItems', (req, res) => {
    res.send(randomize([]));
});

app.post('/addItem', (req, res) => {
    var data = req.body;
    var laborPrice = data.originalLaborPrice;
    var goldWeight = parseFloat(data.itemWeight) - parseFloat(data.stoneWeight);
    res.send({...data, laborPrice: laborPrice, goldWeight: goldWeight});
});

app.listen(port, () => {
    console.log('Server started at port ' + port);
});
