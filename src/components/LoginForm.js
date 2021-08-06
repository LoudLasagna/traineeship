import React, { useState } from 'react';

import {
  Button,
  Modal,
  Form
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { useSelector, useDispatch, connect } from 'react-redux'
import { login, logout } from './redux/actions'

const users = [
  {
    name: 'Michael',
    phone: '8(999)999-99-99',
    password: 'test'
  }, {
    name: 'Jim',
    phone: '8(999)999-99-91',
    password: 'test'
  }, {
    name: 'Pam',
    phone: '8(999)999-99-92',
    password: 'test'
  }
]

function LoginForm() {
  const usert = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  console.log(usert)

  const toggleForm = () => setShow((prev) => !prev);

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    switch (name) {
      case 'phone':
        setPhone(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  }

  const handleLogin = () => {
    const test = users.find((user) => user.phone === phone && user.password === password);

    if (test === users.find((user) => user === test)) {
      setShow(false);
      dispatch(login(test));
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    setPhone('');
    setPassword('');
    toggleForm();
    setShow(false);
  }

  return (
    <>
      {usert && usert.name
        ? (
          <div className="col-3 d-flex justify-content-between">
            <Link className="btn btn-link col-5" to="/profile">
              {usert.name}
            </Link>
            <Button variant="outline-primary" className="btn col-4" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        )
        : (
          <Button variant="outline-primary" className="col-3" onClick={toggleForm}>
            Войти
          </Button>
        )}

      <Modal show={show} onHide={toggleForm}>
        <Modal.Header>
          <Modal.Title className="col-11">Войти</Modal.Title>
          <Button variant="link" className="col-1" onClick={toggleForm}>
            X
          </Button>
        </Modal.Header>
        <Form>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                name="phone"
                type="phone"
                placeholder="Введите телефон"
                value={phone}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer className="d-flex flex-column">
            <Button variant="warning" type="button" onClick={handleLogin}>
              Войти
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default connect()(LoginForm);
