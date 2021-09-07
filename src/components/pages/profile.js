/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  Form
} from 'react-bootstrap';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import { changeuser } from '../redux/actions'
import MainCartButton from '../MainCartButton';

function App() {
  const user = useSelector((state) => state.userReducer.user)
  const loggedIn = useSelector((state) => state.userReducer.loggedIn)
  const dispatch = useDispatch()

  if (!loggedIn) return <Redirect to="/" />

  const [change, setChange] = useState(false)

  const [fields, setFields] = useState({
    uname: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

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

    if (!fields.uname) {
      formIsValid = false;
      tErrors.uname = 'Введите имя пользователя';
    }

    if (!fields.address) {
      formIsValid = false;
      tErrors.address = 'Введите адрес';
    }

    if (!fields.email) {
      formIsValid = false;
      tErrors.email = 'Введите электронную почту';
    }

    if (typeof fields.email !== 'undefined') {
      const lastAtPos = fields.email.lastIndexOf('@');
      const lastDotPos = fields.email.lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') === -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
        formIsValid = false;
        tErrors.email = 'Неверный формат электронной почты';
      }
    }
    setErrors(tErrors);
    setValidated(formIsValid);
  }

  const toggleChanges = () => setChange((prev) => !prev)

  const confirmChanges = () => {
    validateInput()
    if (validated) {
      const newUser = {
        id: user.id,
        name: fields.uname,
        phone: fields.phone.replace(/[^0-9 ]/g, ''),
        email: fields.email,
        address: fields.address
      }

      axios.put(`/api/v1/user/${user.id}`, newUser)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

      dispatch(changeuser(newUser))
      toggleChanges()
    }
  }

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const tFields = fields
    tFields[name] = value

    if (name === 'uname') {
      tFields.uname = tFields.uname.replace(/(?!\w|\s)./g, '')
        .replace(/\s+/g, ' ')
        .replace(/^(\s*)([\W\w]*)(\b\s*$)/g, '$2');
    }

    setFields(tFields)
    validateInput()
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

      <Form className="d-flex flex-column cell p-3">
        <h4>Информация о пользователе</h4>
        <Form.Group style={{ borderBottom: '1px solid lightgrey', borderTop: '1px solid lightgrey' }}>
          <Form.Label> Имя: </Form.Label>
          <Form.Control
            name="uname"
            type="text"
            placeholder="Введите имя"
            value={fields.uname}
            onChange={handleChange}
            readOnly={!change}
            plaintext={!change}
          />
          <Form.Text style={{ color: 'red' }}>
            {errors.uname}
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ borderBottom: '1px solid lightgrey' }}>
          <Form.Label> Телефон: </Form.Label>
          <MaskedFormControl
            name="phone"
            type="phone"
            placeholder="Введите телефон"
            value={fields.phone}
            onChange={handleChange}
            mask="8(111)111-11-11"
            readOnly={!change}
            plaintext={!change}
          />
          <Form.Text style={{ color: 'red' }}>
            {errors.phone}
          </Form.Text>
        </Form.Group>
        <Form.Group style={{ borderBottom: '1px solid lightgrey' }}>
          <Form.Label> Электронная почта: </Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Введите электронную почту"
            value={fields.email}
            onChange={handleChange}
            readOnly={!change}
            plaintext={!change}
          />
          <Form.Text style={{ color: 'red' }}>
            {errors.email}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" style={{ borderBottom: '1px solid lightgrey' }}>
          <Form.Label> Адрес: </Form.Label>
          <Form.Control
            name="address"
            type="text"
            placeholder="Введите адрес"
            value={fields.address}
            onChange={handleChange}
            readOnly={!change}
            plaintext={!change}
          />
          <Form.Text style={{ color: 'red' }}>
            {errors.address}
          </Form.Text>
        </Form.Group>
        { !change ? <Button variant="warning" onClick={toggleChanges}>Изменить</Button>
          : <Button variant="warning" onClick={confirmChanges}>Сохранить изменения</Button>}
      </Form>
    </div>
  );
}

export default connect()(App);
