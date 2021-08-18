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
import { useSelector, useDispatch, connect } from 'react-redux';
import { changeuser } from '../redux/actions'
import LoginForm from '../LoginForm';
import MainCartButton from '../MainCartButton';

function App() {
  const user = useSelector((state) => state.userReducer.user)
  const loggedIn = useSelector((state) => state.userReducer.loggedIn)
  const dispatch = useDispatch()

  if (!loggedIn) return <Redirect to="/" />

  const [change, setChange] = useState(false)
  const [uname, setName] = useState(user.name)
  const [phone, setPhone] = useState(user.phone)
  const [email, setEmail] = useState(user.email)
  const [address, setAddress] = useState(user.address)

  const toggleChanges = () => setChange((prev) => !prev)

  const confirmChanges = () => {
    const newUser = {
      name: uname,
      phone,
      email,
      address,
      password: user.password
    }
    console.log({ user, newUser })
    dispatch(changeuser(user, newUser))
    setChange((prev) => !prev)
  }

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    switch (name) {
      case 'username':
        setName(value);
        break;
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
      <div className="menu mb-3 d-flex col-12 justify-content-between">
        <Link to="/" className="btn btn-link text-left">
          На главную
        </Link>
        <MainCartButton />
      </div>

      <Form className="d-flex flex-column">
        <h4>Информация о пользователе</h4>
        <Form.Group style={{ borderBottom: '1px solid lightgrey', borderTop: '1px solid lightgrey' }}>
          <Form.Label> Имя: </Form.Label>
          <Form.Control
            name="username"
            type="text"
            placeholder="Введите имя"
            value={uname}
            onChange={handleChange}
            readOnly={!change}
            plaintext={!change}
          />
        </Form.Group>
        <Form.Group style={{ borderBottom: '1px solid lightgrey' }}>
          <Form.Label> Телефон: </Form.Label>
          <Form.Control
            name="phone"
            type="phone"
            placeholder="Введите телефон"
            value={phone}
            onChange={handleChange}
            readOnly={!change}
            plaintext={!change}
          />
        </Form.Group>
        <Form.Group style={{ borderBottom: '1px solid lightgrey' }}>
          <Form.Label> Электронная почта: </Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Введите электронную почту"
            value={email}
            onChange={handleChange}
            readOnly={!change}
            plaintext={!change}
          />
        </Form.Group>
        <Form.Group className="mb-4" style={{ borderBottom: '1px solid lightgrey' }}>
          <Form.Label> Адрес: </Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Введите адрес"
            value={address}
            onChange={handleChange}
            readOnly={!change}
            plaintext={!change}
          />
        </Form.Group>
        { !change ? <Button variant="warning" onClick={toggleChanges}>Изменить</Button>
          : <Button variant="warning" onClick={confirmChanges}>Сохранить изменения</Button>}
      </Form>
    </div>
  );
}

export default connect()(App);
