const express = require('express');
const { randomUUID } = require("crypto")
const app = express();

app.use(express.json());

const products = [];

app.post('/products', (req, res) => {
    const { name, price } = req.body;

    const product = {
        name,
        price,
        id: randomUUID()
    }

    products.push(product);

    res.send(product);
});

app.get('/list', (req, res) => {
    res.send(products);
});

app.get('/list/:id', (req, res) => {
    const { id } = req.params
    const product = products.find(product => product.id === id);

    if (!product)
        res.status(404).send({ message: 'Product not found' });
    else
        res.send(product);
});

app.put('/list/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    products.map(product => {
        if (product.id === id) {
            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
            res.send(product);
        }
    })
})

app.delete('/list/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex(product => product.id === id)

    if (productIndex != -1) {
        products.splice(productIndex, 1);
        res.status(200).send({ message: 'Produto exluido' })
    }
    else
        res.status(404).send({ message: "Produto não encontrado" })
});

app.listen(4001, () => console.log('servidor rodando na porta 4001'));