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
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import MiniListItem from '../MiniListItem';
import { checkOut } from '../redux/actions';

function App() {
  const loggedIn = useSelector((state) => state.userReducer.loggedIn)
  const user = useSelector((state) => state.userReducer.user)
  const cart = useSelector((state) => state.cartReducer.cart)
  const dispatch = useDispatch()

  const [deliveryMethod, setDeliveryMethod] = useState('самовывоз')
  const [paymentMethod, setPaymentMethod] = useState('наличными')

  const [fields, setFields] = useState(loggedIn ? {
    uname: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    comment: ''
  } : {
    uname: '',
    email: '',
    phone: '',
    address: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [validated, setValidated] = useState(false);

  let totalProducts = 0
  let totalPrice = 0
  let discount = 0

  if (cart && cart.length > 0) {
    totalProducts = cart.map((cartEntry) => cartEntry.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    totalPrice = cart.map((cartEntry) => cartEntry.amount * cartEntry.object.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
  }
  if (totalPrice >= 1000 && !loggedIn) discount = 5
  else if (loggedIn) discount = 10
  const sumWithDiscount = (totalPrice * ((100 - discount) / 100)).toFixed(2)

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

    if (!fields.address && deliveryMethod === 'курьер') {
      formIsValid = false;
      tErrors.address = 'Введите адрес';
    }

    if (!fields.email && paymentMethod === 'онлайн') {
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

  const handleChange = (event) => {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    const tFields = fields
    tFields[name] = value

    setFields(tFields)
    validateInput()
  }

  const checkout = (event) => {
    event.preventDefault();
    validateInput()
    if (validated) {
      const orderedProducts = cart.map((element) => ({
        id: element.object.id,
        amount: element.amount
      }))

      const requestBody = {
        name: fields.uname,
        phone: fields.phone.replace(/[^0-9 ]/g, ''),
        payment: paymentMethod,
        email: fields.email,
        delivery: deliveryMethod,
        address: fields.address,
        comment: fields.comment,
        sum: sumWithDiscount,
        order: orderedProducts
      }

      axios.post('/api/v1/cart/order', requestBody)
        .then((response) => {
          console.log(response);
          dispatch(checkOut())
        })
        .catch((error) => console.log(error))
    }
  }
  validateInput();
  return (cart.length > 0
    ? (
      <div className="wrapper col-11 mt-3 center-block mx-auto p-4">
        <header>
          <h2>магазинский | оформление заказа</h2>
        </header>
        <div className="menu mb-3 d-flex col-12">
          <Link to="/" className="btn btn-link">
            На главную
          </Link>
        </div>
        <Container fluid style={{ padding: 0 }}>
          <Row className="justify-content-between">
            <Col
              xs={{
                span: 12,
                order: 2,
                paddingRight: '1em'
              }}
              md={{
                span: 6,
                order: 1
              }}
            >
              <Form className="d-flex flex-column p-3 cell" onSubmit={checkout}>
                <h4 className="pb-3">Информация о заказе</h4>
                <Form.Group>
                  <Form.Label> Имя: </Form.Label>
                  <Form.Control
                    name="uname"
                    type="text"
                    placeholder="Введите имя"
                    value={fields.uname}
                    onChange={handleChange}
                    required
                  />
                  <Form.Text style={{ color: 'red' }}>
                    {errors.uname}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Телефон: </Form.Label>
                  <MaskedFormControl
                    name="phone"
                    placeholder="Введите телефон"
                    value={fields.phone}
                    onChange={handleChange}
                    mask="8(111)111-11-11"
                    required
                    feedback="Вы должны ввести номер телефона"
                  />
                  <Form.Text style={{ color: 'red' }}>
                    {errors.phone}
                  </Form.Text>
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
                          value={fields.address}
                          onChange={handleChange}
                          required
                        />
                        <Form.Text style={{ color: 'red' }}>
                          {errors.address}
                        </Form.Text>
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
                          value={fields.email}
                          onChange={handleChange}
                          required
                        />
                        <Form.Text style={{ color: 'red' }}>
                          {errors.email}
                        </Form.Text>
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
                    value={fields.comment}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex flex-column">
                    <h4>
                      {`Всего ${totalProducts} товар(а/ов)`}
                    </h4>
                    {discount === 0 ? '' : <h6>{`скидка ${discount}%`}</h6>}
                    <h4>
                      {`Итого: ${sumWithDiscount}`}
                    </h4>
                  </Form.Label>
                  <Button type="submit" className="btn btn-warning" style={{ width: '100%' }}>Заказать</Button>
                </Form.Group>
              </Form>
            </Col>
            <Col
              xs={{
                span: 12,
                order: 1,
                paddingRight: '1em'
              }}
              md={{
                span: 6,
                order: 2
              }}
            >
              <div className="d-flex flex-column p-3 cell checkoutCart mb-3">
                <h4 className="pb-3">Корзина</h4>
                {
                cart.length > 0
                  ? cart.map((cartEntry) => (
                    <div className="pb-3" key={cartEntry.object.id}>
                      <div className="pt-1 pb-1 d-flex justify-content-between checkoutCartItem">
                        <MiniListItem product={cartEntry.object} />
                      </div>
                    </div>
                  ))
                  : <h5>Корзина пуста</h5>
              }
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    ) : (<Redirect to="/" />)
  );
}

export default connect()(App);
