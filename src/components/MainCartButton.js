/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button,
  Dropdown
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useSelector, useDispatch, connect } from 'react-redux';
import { clearCart, removeProduct } from './redux/actions';
import tray from '../pics/bin.png';

import ProductCartButton from './ProductCartButton';

CartItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.objectOf(PropTypes.array),
  main_image: PropTypes.number
}
CartItem.defaultProps = {
  id: 0,
  name: 'placeholder',
  price: 0,
  images: [],
  main_image: 0
}

function CartItem(props) {
  const dispatch = useDispatch()
  const {
    product:
    {
      id, name, price, images, main_image
    }
  } = props

  const removeProductClick = () => {
    const tid = id
    dispatch(removeProduct({ id: tid }))
  }

  return (
    <Dropdown.Item className="d-flex" style={{ minWidth: '300px' }}>
      <Button variant="btn btn-outline link" className="col-1" onClick={removeProductClick}>X</Button>
      <div className="col-3">
        <img src={images.find((arrayEntry) => arrayEntry.id === main_image).url} alt="X" style={{ width: '50px' }} />
      </div>
      <div className="col-4 d-flex flex-column">
        <div>
          {name}
        </div>
        <div>
          {`${price} руб`}
        </div>
      </div>
      <ProductCartButton classname="col-4" productId={id} />
    </Dropdown.Item>
  )
}

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

  const checkout = () => {
    console.log(`${totalProducts} ${totalPrice}`)
  }
  const clearCartClick = () => {
    dispatch(clearCart())
  }

  return (
    <>
      { cart.length > 0
        ? (
          <Dropdown className="col-1" autoClose="outside">
            <Dropdown.Toggle variant="outline-secondary" className="col-12" id="dropdown-autoclose-outside">
              <img src={tray} alt="X" />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: 450 }}>
              { data.map((arrayEntry) => (
                cart.find((cartEntry) => cartEntry.id === arrayEntry.id)
                  ? <CartItem key={arrayEntry.id} product={arrayEntry} />
                  : ''
              ))}
              <Dropdown.Divider />
              <Dropdown.Item className="d-flex justify-content-between">
                <div className="col-4 d-flex flex-column">
                  <div>{`Всего ${totalProducts} товар(а/ов)`}</div>
                  <div>{`на ${totalPrice} рублей`}</div>
                </div>
                <Button variant="warning" className="col-5" onClick={checkout}> Оформить заказ </Button>
                <Button variant="outline-secondary" className="col-2" onClick={clearCartClick}> X </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown align="end" className="col-1" autoClose="outside">
            <Dropdown.Toggle variant="outline-secondary" className="col-12" id="dropdown-autoclose-outside">
              <img src={tray} alt="X" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="d-flex" flex-column style={{ minHeight: 200 }}>
              <Dropdown.Item>
                <div className="col-12 text-center">Корзина пуста</div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
    </>
  )
}

export default connect()(MainCartButton)
