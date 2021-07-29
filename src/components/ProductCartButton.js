import React from 'react';
import {
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, setAmount } from './redux/cartSlicer';

export default function ProductCartButton(props) {
  const cart = useSelector((state) => state.cart.products)
  const cartItem = useSelector((state) => state.cart.products.find((arrayEntry) => arrayEntry.id
  === props.productId))

  const dispatch = useDispatch()

  let isInCart;

  if (cart.find((item) => item.id === props.productId)) {
    isInCart = true;
  } else isInCart = false;

  const handleCartClick = () => {
    dispatch(addToCart({ id: props.productId, amount: 1 }))
  }

  const handleMinusClick = () => {
    if (cartItem.amount - 1 > 0) {
      dispatch(setAmount({ id: props.productId, amount: cartItem.amount - 1 }))
    }
    else dispatch(removeFromCart({ id: props.productId }))
  }

  const handlePlusClick = () => {
    dispatch(setAmount({ id: props.productId, amount: cartItem.amount + 1 }))
  }

  const handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;

    if (Number(value) > 0) dispatch(setAmount({ id: props.productId, amount: Number(value) }))
    else dispatch(removeFromCart({ id: props.productId }))
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
