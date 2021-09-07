/* eslint-disable prefer-const */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const jsonParser = bodyParser.json()

const app = express();

const changeProductStructure = (product) => {
  let ratingSum = 0;
  product.ratings.forEach((element) => {
    ratingSum += element;
  });
  return {
    id: product.id,
    name: product.name,
    short_description: product.short_description,
    full_description: product.full_description,
    rating: Math.round(ratingSum / product.ratings.length),
    price: product.price,
    images: product.images,
    main_image: product.main_image
  }
}

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

app.get('/api/v1/catalog', (req, res, next) => {
  const data = fs.readFileSync('catalog.json', 'utf8');
  const catalog = JSON.parse(data);

  for (let i = 0; i < catalog.length; i += 1) {
    catalog[i] = changeProductStructure(catalog[i]);
  }

  res.send(catalog)
});

app.get('/api/v1/catalog/:id', (req, res, next) => {
  const data = fs.readFileSync('catalog.json', 'utf8');
  const catalog = JSON.parse(data);

  let product = null
  for (let i = 0; i < catalog.length; i += 1) {
    if (catalog[i].id === Number(req.params.id)) {
      product = changeProductStructure(catalog[i]);
      break;
    }
  }

  if (product === null) {
    res.sendStatus(400)
  } else {
    res.send(JSON.stringify(product))
  }
});

app.put('/api/v1/catalog/rating/:id', jsonParser, (req, res) => {
  let data = fs.readFileSync('catalog.json', 'utf8');
  const catalog = JSON.parse(data);

  for (let i = 0; i < catalog.length; i += 1) {
    if (catalog[i].id === Number(req.params.id)) {
      catalog[i].ratings.push(Number(req.body.rating))
      break;
    }
  }

  data = JSON.stringify(catalog);
  fs.writeFileSync('catalog.json', data)

  res.send({ productId: Number(req.params.id) })
})

app.post('/api/v1/login', jsonParser, (req, res) => {
  const data = fs.readFileSync('userList.json', 'utf8');
  const userList = JSON.parse(data);

  let user = null;
  let auth = false;

  if (req.body.phone && req.body.password) {
    for (let i = 0; i < userList.length; i += 1) {
      if (userList[i].phone === req.body.phone && userList[i].password === req.body.password) {
        auth = true;
        user = {
          id: userList[i].id,
          phone: userList[i].phone,
          name: userList[i].name,
          address: userList[i].address,
          email: userList[i].email
        }
      }
    }
  }
  if (auth) res.send({ auth, user })
  else res.send({ auth, errorMessage: 'неверный телефон или пароль' })
})

app.put('/api/v1/user/:id', jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);

  let data = fs.readFileSync('userList.json', 'utf8');
  let users = JSON.parse(data);

  let user;
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].id === Number(req.params.id)) {
      users[i] = {
        id: users[i].id,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: users[i].password,
        address: req.body.address
      };
      user = users[i];
      break;
    }
  }

  if (user) {
    data = JSON.stringify(users);
    fs.writeFileSync('userList.json', data)
    res.send({ edited: user.id })
  } else {
    res.sendStatus(404)
  }
})

app.post('/api/v1/cart/order', jsonParser, (req, res) => {
  if (!req.body) res.sendStatus(400);
  let data = fs.readFileSync('orders.json', 'utf8');
  const orders = JSON.parse(data);

  let id = orders.length + 1
  let orderInfo = {
    id,
    name: req.body.name,
    phone: req.body.phone,
    delivery: req.body.delivery,
    address: req.body.address,
    payment: req.body.payment,
    email: req.body.email,
    comment: req.body.comment,
    sum: req.body.sum,
    order: req.body.order
  };

  orders.push(orderInfo)
  data = JSON.stringify(orders);
  fs.writeFileSync('orders.json', data)

  res.send({ orderId: id })
})

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(5000, () => {
  console.log('server started on port 5000');
});
