const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const createTable = require('./src/server/models/create-table');
const itemModel = require('./src/server/models/item');
app.use(bodyParser.json());
app.use(express.static('dist'));

var path = require('path');
var port = process.env.PORT || 3000;

const addItemMW = (req, res, next) => {
    var data = req.body;
    var item = {
        ...data,        
        sellDate: 'null',
        isSold: 'null',
        isRemoved: 'null'
    }
    console.log(item);
    itemModel.add(item);
    next();
}

app.post('/addItem', [addItemMW], (req, res) => {
    var data = req.body;
    res.send('Success');
});

app.get('/getAllItems', (req, res) => {
    itemModel.getAll(data => {
        res.send(data);
    });
});

app.post('/removeItem', (req, res) => {
    itemModel.remove(req.body, data => {
        res.send(data);
    })
})

app.post('/editLaborPrice', (req, res) => {
    itemModel.editLaborPrice(req.body, data => {
        res.send(data);
    })
})
/*
app.get('/createTableGoldAge', (req, res) => {
    res.send(createTable('GOLD_AGE'));
});

app.get('/createTableItem', (req, res) => {
    res.send(createTable('ITEM'));
});

app.get('/createTableTransaction', (req, res) => {
    res.send(createTable('TRANSACTION'));
});

app.get('/createTableCustomer', (req, res) => {
    res.send(createTable('CUSTOMER'));
});*/

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/src/client/index.html'));
});

app.listen(port, () => {
    console.log('Server started at port ' + port);
});
