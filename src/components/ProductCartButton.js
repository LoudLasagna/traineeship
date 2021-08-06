/* eslint-disable no-unused-vars */
import React from 'react';
import {
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch, connect } from 'react-redux';
import { addProduct, removeProduct, setProductAmount } from './redux/actions';

const ProductCartButton = (props) => {
  const { productId } = props
  const data = useSelector((state) => state.cartReducer.data)

  const cart = useSelector((state) => state.cartReducer.products)
  const cartItem = useSelector(
    (state) => state.cartReducer.products.find((arrayEntry) => arrayEntry.id === productId)
  )

  const dispatch = useDispatch()

  let isInCart;
  const productPrice = data.find((arrayEntry) => arrayEntry.id === productId).price
  if (cart.find((item) => item.id === productId)) {
    isInCart = true;
  } else isInCart = false;

  const handleCartClick = () => {
    dispatch(addProduct({
      id: productId,
      amount: 1,
      price: productPrice
    }))
  }

  const handleMinusClick = () => {
    if (cartItem.amount - 1 > 0) {
      dispatch(setProductAmount({
        id: productId,
        amount: cartItem.amount - 1,
        price: productPrice
      }))
    } else dispatch(removeProduct({ id: productId }))
  }

  const handlePlusClick = () => {
    dispatch(setProductAmount({
      id: productId,
      amount: cartItem.amount + 1,
      price: productPrice
    }))
  }

  const handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;

    if (Number(value) > 0) dispatch(setProductAmount({ id: productId, amount: Number(value) }))
    else dispatch(removeProduct({ id: productId }))
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

ProductCartButton.propTypes = {
  productId: PropTypes.number.isRequired
}

export default connect()(ProductCartButton)
