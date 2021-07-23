import React, { useState } from 'react';

import {
  Button,
  Modal,
  Form
} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './redux/userSlicer'


const users = [
  {
    name: "Michael",
    phone: "8(999)999-99-99",
    password: "test"
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
  const usert = useSelector((state) => state.user.userObj)
  const dispatch = useDispatch()

  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const toggleForm = () => setShow((prev) => !prev);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    switch(name) {
      case 'phone':
        setPhone(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
      
  }

  const handleLogin = () => {
    let test = users.find((user) => 
      user.phone === phone && 
      user.password === password
    );

    if (test === users.find((user) => user === test)){
      setShow(false);
      dispatch(login(test));
    }

    else{

    }

  }

  const handleLogout = () => { 
    dispatch(logout());
    setPhone('');
    setPassword('');
    toggleForm;
  }



  return (
    <>
      {usert && users.find((user) => user === usert)? 
        <div className="col-2 d-flex">
          <div className="col-6">{usert.name}</div>
          <button type="button" className="btn btn-outline-primary col-6" onClick={handleLogout}>
            Выйти
          </button>
        </div> : 
        <button type="button" className="btn btn-outline-primary col-2" onClick={toggleForm}>
          Войти
        </button>
      }

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

export default LoginForm;
