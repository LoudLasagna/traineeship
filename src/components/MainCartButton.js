/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button,
  Dropdown
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { clearCart, removeProduct } from './redux/actions';
import tray from '../pics/bin.png';

import MiniListItem from './MiniListItem'
import ProductCartButton from './ProductCartButton';

function MainCartButton() {
  const cart = useSelector((state) => state.cartReducer.products)
  const dispatch = useDispatch()
  const data = useSelector((state) => state.cartReducer.data)

  let totalProducts = 0
  let totalPrice = 0

  if (cart.length > 0) {
    totalProducts = cart.map((cartEntry) => cartEntry.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
    totalPrice = cart.map((cartEntry) => cartEntry.amount * cartEntry.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue)
  }

  const clearCartClick = () => {
    dispatch(clearCart())
  }

  return (
    <>
      { cart.length > 0
        ? (
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary" className="col-12" id="dropdown-autoclose-outside">
              <img src={tray} alt="X" style={{ minWidth: 24 }} />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 500 }}>
              { data.map((arrayEntry) => (
                cart.find((cartEntry) => cartEntry.id === arrayEntry.id)
                  ? (
                    <Dropdown.ItemText key={arrayEntry.id} className="d-flex" style={{ minWidth: '300px' }}>
                      <MiniListItem key={arrayEntry.id} product={arrayEntry} />
                    </Dropdown.ItemText>
                  )
                  : ''
              ))}
              <Dropdown.Divider />
              <Dropdown.ItemText className="d-flex justify-content-between">
                <div className="col-4 d-flex flex-column">
                  <div>{`Всего ${totalProducts} товар(а/ов)`}</div>
                  <div>{`на ${totalPrice} рублей`}</div>
                </div>
                <Link to="/checkout" className="col-5 btn btn-warning"> Оформить заказ </Link>
                <Button variant="outline-secondary" className="col-2" onClick={clearCartClick}> X </Button>
              </Dropdown.ItemText>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown align="end">
            <Dropdown.Toggle variant="outline-secondary" className="col-12" id="dropdown-autoclose-outside">
              <img src={tray} alt="X" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="d-flex" flex-column style={{ minHeight: 200 }}>
              <Dropdown.ItemText>
                <div className="col-12 text-center">Корзина пуста</div>
              </Dropdown.ItemText>
            </Dropdown.Menu>
          </Dropdown>
        )}
    </>
  )
}

export default connect()(MainCartButton)
