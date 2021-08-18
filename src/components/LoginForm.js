/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

import {
  Button,
  Modal,
  Form,
  InputGroup
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import { useSelector, useDispatch, connect } from 'react-redux'
import { login, logout } from './redux/actions'

function validateInput(phone, password) {
  const withoutSpecialChars = /^[^-() /]*$/
  const containsLetters = /^.*[a-zA-Z]+.*$/
  const minimum6Chars = /^.{6,}$/
  const withoutSpaces = /^[\S]$/
  return withoutSpecialChars.test(password)
  && containsLetters.test(password)
  && minimum6Chars.test(password)
}

function LoginForm() {
  const usert = useSelector((state) => state.userReducer.user)
  const userList = useSelector((state) => state.userReducer.userList)
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [validated, setValidated] = useState(false)

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

  const handleLogin = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false || validateInput(phone, password) === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
    } else {
      setValidated(true);

      if (userList.find((user) => user.phone === phone && user.password === password)) {
        setShow(false)
        dispatch(login(userList.find((user) => user.phone === phone && user.password === password)))
      }
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
          <div className="d-flex">
            <Link className="btn btn-link" to="/profile" style={{ borderRight: '1px solid lightgrey' }}>
              {`${usert.name}  `}
            </Link>
            <Button variant="link" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        )
        : (
          <Button variant="outline-primary" onClick={toggleForm}>
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
        <Form name="loginform" noValidate validated={validated} onSubmit={handleLogin}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Телефон</Form.Label>
              <MaskedFormControl
                name="phone"
                placeholder="Введите телефон"
                value={phone}
                onChange={handleChange}
                mask="8(111)111-11-11"
                required
                feedback="Вы должны ввести номер телефона"
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
                required
                feedback="Вы должны ввести пароль"
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text id="passwordHelpBlock" muted>
                Пароль должен быть минимум 6 символов, состоять только из латинских букв
                и цифр и не содержать пробелов
              </Form.Text>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer className="d-flex flex-column">
            <Button type="submit" variant="warning">
              Войти
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default connect()(LoginForm);
