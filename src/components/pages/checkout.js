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
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import MiniListItem from '../MiniListItem';
import { checkOut } from '../redux/actions';

function App() {
  const loggedIn = useSelector((state) => state.userReducer.loggedIn)
  const user = useSelector((state) => state.userReducer.user)
  const { products, data } = useSelector((state) => state.cartReducer)
  const dispatch = useDispatch()

  const [uname, setName] = useState(loggedIn ? user.name : '')
  const [phone, setPhone] = useState(loggedIn ? user.phone : '')
  const [email, setEmail] = useState(loggedIn ? user.email : '')
  const [address, setAddress] = useState(loggedIn ? user.address : '')

  const [comment, setComment] = useState('')
  const [deliveryMethod, setDeliveryMethod] = useState('Выберите способ доставки')
  const [paymentMethod, setPaymentMethod] = useState('Выберите способ оплаты')

  const [validated, setValidated] = useState(false);

  const cart = useSelector((state) => state.cartReducer.products)

  let totalProducts = 0
  let totalPrice = 0
  let discount = 0

  if (cart.length > 0) {
    totalProducts = cart.map((cartEntry) => cartEntry.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    totalPrice = cart.map((cartEntry) => cartEntry.amount * cartEntry.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
  }
  if (totalPrice >= 1000 && !loggedIn) discount = 5
  else if (loggedIn) discount = 10

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
      case 'comment':
        setComment(value);
        break;
      default:
        break;
    }
  }

  const checkout = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    dispatch(checkOut({ id: 1231 }))
  }

  return (
    <div className="wrapper col-11 mt-3 center-block mx-auto p-4">
      <header>
        <h2>магазинский | оформление заказа</h2>
      </header>
      <div className="menu mb-3 d-flex col-12">
        <Link to="/" className="col-3 btn btn-link text-left">
          На главную
        </Link>
      </div>
      <div className="d-flex">
        <Form noValidate validated={validated} className="d-flex flex-column col-5 center-block mx-auto" onSubmit={checkout}>
          <Form.Group style={{ borderTop: '1px solid lightgrey' }}>
            <Form.Label> Имя: </Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Введите имя"
              value={uname}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label> Телефон: </Form.Label>
            <Form.Control
              name="phone"
              type="phone"
              placeholder="Введите телефон"
              value={phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Способ доставки:</Form.Label>
            <Form.Control
              as="select"
              value={deliveryMethod}
              onChange={(event) => setDeliveryMethod(event.target.value)}
              style={{ appearance: 'auto' }}
              required
            >
              <option>самовывоз</option>
              <option>курьер</option>
            </Form.Control>
          </Form.Group>
          {deliveryMethod === 'курьер'
            ? (
              <>
                <Form.Group>
                  <Form.Label> Адрес: </Form.Label>
                  <Form.Control
                    name="address"
                    type="text"
                    placeholder="Введите адрес"
                    value={address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )
            : ''}
          <Form.Group className="mt-3">
            <Form.Label>Способ оплаты:</Form.Label>
            <Form.Control
              as="select"
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              style={{ appearance: 'auto' }}
              required
            >
              <option>наличными</option>
              <option>онлайн</option>
              {deliveryMethod === 'курьер'
                ? (<option>картой курьеру</option>)
                : ''}
            </Form.Control>
          </Form.Group>
          {paymentMethod === 'онлайн'
            ? (
              <>
                <Form.Group>
                  <Form.Label> Электронная почта: </Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Введите электронную почту для получения чека"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </>
            )
            : ''}
          <Form.Group className="mb-5 mt-3">
            <Form.Label> Комментарий к заказу: </Form.Label>
            <Form.Control
              name="comment"
              type="text"
              placeholder="Комментарий"
              value={comment}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="d-flex flex-column">
              <h4>
                {`Всего ${totalProducts} товар(а/ов)`}
              </h4>
              {discount === 1 ? '' : <h6>{`скидка ${discount}%`}</h6>}
              <h4>
                {`Итого: ${totalPrice * ((100 - discount) / 100)}`}
              </h4>
            </Form.Label>
            <Button className="btn btn-warning" style={{ width: '100%' }} type="submit">Заказать</Button>
          </Form.Group>
        </Form>
        <div className="col-6 d-flex flex-column">
          {
            data.map((catalogEntry) => (
              products.find((cartEntry) => catalogEntry.id === cartEntry.id) ? (
                <div className="d-flex pb-1 pt-1" key={catalogEntry.id} style={{ borderBottom: '1px solid lightgray', borderTop: '1px solid lightgray' }}>
                  <MiniListItem key={catalogEntry.id} product={catalogEntry} />
                </div>
              ) : ''
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default connect()(App);
