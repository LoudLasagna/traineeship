/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';

import {
  Button,
  Modal,
  Form,
  Alert
} from 'react-bootstrap';
import axios from 'axios';

import { Link } from 'react-router-dom';
import MaskedFormControl from 'react-bootstrap-maskedinput'
import { useSelector, useDispatch, connect } from 'react-redux'
import { login, logout } from './redux/actions'

function LoginForm() {
  const usert = useSelector((state) => state.userReducer.user)
  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const [validated, setValidated] = useState(false)

  const toggleForm = () => setShow((prev) => !prev);

  const validateInput = () => {
    let formIsValid = true;
    const tErrors = {}
    if (!fields.phone) {
      formIsValid = false;
      tErrors.phone = 'Введите телефон';
    }

    if (typeof fields.phone !== 'undefined') {
      if (fields.phone.replace(/[^0-9 ]/g, '').length !== 11) {
        formIsValid = false;
        tErrors.phone = 'Недостаточно цифр';
      }
    }
    if (!fields.password) {
      formIsValid = false;
      tErrors.password = 'Пароль должен состоять только из латинских букв, цифр и не содержать пробелов';
    }

    if (typeof fields.password !== 'undefined') {
      if (fields.password.length < 6) {
        formIsValid = false;
        tErrors.password = 'Длина пароль должна быть как минимум 6 символов';
      }
    }

    setErrors(tErrors);
    return formIsValid;
  }

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const tFields = fields
    tFields[name] = value

    if (name === 'password') {
      tFields.password = tFields.password.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, ' ')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
    }

    setFields(tFields)
    setValidated(validateInput())
  }

  const handleLogin = (event) => {
    event.preventDefault();
    setValidated(validateInput())
    if (validated) {
      axios.post('/api/v1/login', {
        phone: fields.phone.replace(/[^0-9 ]/g, ''),
        password: fields.password
      })
        .then((response) => {
          if (response.data.auth) {
            dispatch(login(response.data.user));
            setShow(false);
            location.reload()
          } else {
            setShowAlert(true)
          }
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    setFields({});
    setErrors({});
    toggleForm();
    setShow(false);
    location.reload();
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
          <Button variant="link" className="col-1 btn-close" onClick={toggleForm} />
        </Modal.Header>
        <Form name="loginform" method="post" noValidate onSubmit={handleLogin}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Телефон</Form.Label>
              <MaskedFormControl
                name="phone"
                placeholder="Введите телефон"
                value={fields.phone}
                onChange={handleChange}
                mask="8(111)111-11-11"
                required
                autocomplete="on"
              />
              <Form.Text style={{ color: 'red' }}>
                {errors.phone}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Введите пароль"
                value={fields.password}
                onChange={handleChange}
                required
                autocomplete="on"
              />
              <Form.Text style={{ color: 'red' }}>
                {errors.password}
              </Form.Text>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer className="d-flex flex-column">
            <Button type="submit" variant="warning">
              Войти
            </Button>
            {showAlert
              ? (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                  <Alert.Heading>Введён неверный телефон или пароль</Alert.Heading>
                </Alert>
              )
              : ''}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default connect()(LoginForm);
