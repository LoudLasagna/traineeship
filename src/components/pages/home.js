import React from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { useSelector, connect } from 'react-redux';
import ListItem from '../ListItem';
import LoginForm from '../LoginForm';
import MainCartButton from '../MainCartButton';

function App() {
  const data = useSelector((state) => state.cartReducer.data)
  return (
    <div className="wrapper col-11 mt-3 center-block mx-auto p-4">
      <header>
        <h2>магазинский | каталог</h2>
      </header>
      <div className="menu mb-3 d-flex col-12">
        <LoginForm />
        <div className="col-8" md="auto" />
        <MainCartButton />
      </div>
      <div>
        <Container fluid className="p-0">
          <Row>
            {data && data.length ? data.map((item) => <Col xs={12} sm={6} lg={4} xl={3} key={item.id}><ListItem data={item} /></Col>) : 'Нет товаров'}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default connect()(App);
