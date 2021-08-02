import React from 'react';
import {
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, setAmount } from './redux/cartSlicer';

ProductCartButton.propTypes = {
  productId: PropTypes.number.isRequired
}

export default function ProductCartButton(props) {
  const { productId } = props

  const cart = useSelector((state) => state.cart.products)
  const cartItem = useSelector((state) => state.cart.products.find((arrayEntry) => arrayEntry.id
  === productId))

  const dispatch = useDispatch()

  let isInCart;

  if (cart.find((item) => item.id === productId)) {
    isInCart = true;
  } else isInCart = false;

  const handleCartClick = () => {
    dispatch(addToCart({ id: productId, amount: 1 }))
  }

  const handleMinusClick = () => {
    if (cartItem.amount - 1 > 0) {
      dispatch(setAmount({ id: productId, amount: cartItem.amount - 1 }))
    } else dispatch(removeFromCart({ id: productId }))
  }

  const handlePlusClick = () => {
    dispatch(setAmount({ id: productId, amount: cartItem.amount + 1 }))
  }

  const handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;

    if (Number(value) > 0) dispatch(setAmount({ id: productId, amount: Number(value) }))
    else dispatch(removeFromCart({ id: productId }))
  }

  return (
    <>
      {isInCart
        ? (
          <InputGroup size="col-4">
            <Button variant="outline-secondary" className="col-3" onClick={handleMinusClick}>-</Button>
            <FormControl aria-label="Amount (to the nearest dollar)" className="col-6 text-center" value={cartItem.amount} onChange={handleInputChange} />
            <Button variant="outline-secondary" className="col-3" onClick={handlePlusClick}>+</Button>
          </InputGroup>
        ) : (
          <Button variant="warning" onClick={handleCartClick}>
            В корзину
          </Button>
        )}
    </>
  )
}
