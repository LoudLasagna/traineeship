import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import ListItem from './components/ListItem';
import LoginForm from './components/LoginForm';
import MainCartButton from './components/MainCartButton';

const data = [{
  id: 1,
  name: 'Товар 1',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 5,
  price: 1000,
  images: [{
    id: 1,
    url: 'https://picsum.photos/id/19/200'
  }, {
    id: 2,
    url: 'https://picsum.photos/id/20/200'
  }],
  main_image: 1
},
{
  id: 2,
  name: 'Товар 2',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 3,
  price: 2500,
  images: [{
    id: 3,
    url: 'https://picsum.photos/id/222/200'
  }, {
    id: 4,
    url: 'https://picsum.photos/id/64/200'
  }],
  main_image: 4
},
{
  id: 3,
  name: 'Товар 3',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 4,
  price: 13,
  images: [{
    id: 3,
    url: 'https://picsum.photos/id/122/200'
  }, {
    id: 4,
    url: 'https://picsum.photos/id/654/200'
  }],
  main_image: 3
},
{
  id: 4,
  name: 'Товаррррск',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitttttttttttttttttttttttt.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 1,
  price: 6666,
  images: [{
    id: 16,
    url: 'https://picsum.photos/id/1022/200'
  }, {
    id: 485,
    url: 'https://picsum.photos/id/1023/200'
  }, {
    id: 465,
    url: 'https://picsum.photos/id/1025/200'
  }, {
    id: 466,
    url: 'https://picsum.photos/id/1028/200'
  }],
  main_image: 465
}
];

function App() {
  return (
    <div className="wrapper col-11 mt-3 center-block mx-auto p-4">
      <header>
        <h2 className="col-3">магазинский</h2>
      </header>
      <div className="menu mb-3 d-flex col-12">
        <LoginForm />
        <div className="col-9" md="auto" />
        <MainCartButton />
      </div>
      <div className="catalog-wrapper">
        <Container fluid className="p-0">
          <Row>
            {data && data.length ? data.map((item) => <Col xs={12} sm={6} lg={4} xl={3} key={item.id}><ListItem item={item} /></Col>) : 'Нет товаров'}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
