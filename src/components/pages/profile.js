/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form
} from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import LoginForm from '../LoginForm';
import MainCartButton from '../MainCartButton';

function App() {
  const user = useSelector((state) => state.userReducer.user)

  if (user === {}) <Redirect to="/" />

  const [change, setChange] = useState(false)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const toggleChanges = () => setChange((prev) => !prev)

  const confirmChanges = () => {
    // dispatch
  }

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    switch (name) {
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
        setAddress(value);
        break;
      default:
        break;
    }
  }

  return (
    <div className="wrapper col-11 mt-3 center-block mx-auto p-4">
      <header>
        <h2>магазинский | профиль</h2>
      </header>
      <div className="menu mb-3 d-flex col-12">
        <Link to="/" className="col-3 btn btn-link text-left">
          На главную
        </Link>
        <div className="col-8" md="auto" />
        <MainCartButton />
      </div>
      {change
        ? (
          <Form>
            <div>{user.name}</div>
            <Form.Control
              name="phone"
              type="phone"
              placeholder="Введите телефон"
              value={user.phone}
              onChange={handleChange}
            />
            <div>{user.password}</div>
            <Button variant="warning" onClick={confirmChanges}>Принять изменения</Button>
          </Form>
        )
        : (
          <div className="d-flex flex-column">
            <div>{user.name}</div>
            <div>{user.phone}</div>
            <div>{user.password}</div>
            <Button variant="warning" onClick={toggleChanges}>Изменить</Button>
          </div>
        )}
    </div>
  );
}

export default connect()(App);
