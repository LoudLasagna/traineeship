/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button,
  Dropdown
} from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { clearCart } from './redux/actions';
import tray from '../pics/bin.png';

import MiniListItem from './MiniListItem';

function MainCartButton() {
  const cart = useSelector((state) => state.cartReducer.cart)
  const dispatch = useDispatch()

  let totalProducts = 0
  let totalPrice = 0

  if (cart.length > 0) {
    totalProducts = cart.map((cartEntry) => cartEntry.amount)
      .reduce((accumulator, { amount: currentValue }) => accumulator + currentValue, 0)
    totalPrice = cart.map((cartEntry) => cartEntry.amount * cartEntry.object.price)
      .reduce((accumulator, { amount: currentValue }) => accumulator + currentValue, 0)
  }

  const clearCartClick = () => {
    dispatch(clearCart())
  }

  return (
    <Dropdown>
      <Dropdown.Toggle drop="start" variant="outline-secondary" className="col-12" id="dropdown-autoclose-outside">
        <img src={tray} alt="X" style={{ minWidth: 24 }} />
      </Dropdown.Toggle>
      { cart.length > 0
        ? (
          <Dropdown.Menu style={{ minWidth: 350 }}>
            {
            cart.map((cartEntry) => (
              <Dropdown.ItemText key={cartEntry.object.id} className="d-flex justify-content-between" style={{ minWidth: '300px' }}>
                <MiniListItem product={cartEntry.object} />
              </Dropdown.ItemText>
            ))
            }
            <Dropdown.Divider />
            <Dropdown.ItemText className="d-flex justify-content-between">
              <div className="col-7 d-flex flex-column">
                <div>{`Всего ${totalProducts} товар(а/ов)`}</div>
                <div>{`на ${totalPrice} рублей`}</div>
              </div>
              <Link to="/checkout" className="col-2 btn btn-warning" style={{ paddingTop: '12px' }}> &#10004; </Link>
              <Button variant="outline-secondary" className="col-2" onClick={clearCartClick}> X </Button>
            </Dropdown.ItemText>
          </Dropdown.Menu>
        ) : (
          <Dropdown.Menu align="end" style={{ minHeight: 100 }}>
            <Dropdown.ItemText>
              <div className="col-12 text-center">Корзина пуста</div>
            </Dropdown.ItemText>
          </Dropdown.Menu>
        )}
    </Dropdown>
  )
}

export default connect()(MainCartButton)
