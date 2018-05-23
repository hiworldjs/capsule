var express = require('express');
var app = express();
var path = require('path');

var randomize = (items) => {
    for (let i = 0; i < 100; i++) {
        items.push({
            code: `E000${i}`,
            name: "Dây chuyền vàng",
            age: "9999",
            price: "1884000"
        });
    }
    return items;
}

var items = [
    {
        code: "194830",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "194831",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "194832",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "194833",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "857493",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "8383047",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "99438938",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "9384849",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "1944343",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "4947233",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "1235344",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "5434545",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "2345324",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "5234542",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "4324342",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "43535124",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "456456456",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "8285645",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "245345635",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "345346345",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "654564563",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "345363455",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "3456345543",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "3453453453",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "345345353",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "345345435",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "7645564",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "34534535",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "67567436",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "3453463465",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    },{
        code: "5646456",
        name: "Dây chuyền vàng",
        age: "9999",
        price: "1884000"
    },{
        code: "2234323",
        name: "Nhẫn Mặt Đá",
        age: "997",
        price: "563000"
    }
]
app.use(express.static('dist'));

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '/src/client/index.html'));
});

app.get('/getAllItems', (req,res) => {
    res.send(randomize(items));
});

app.listen(3000, () => {
    console.log('Server started at port 3000');
});
