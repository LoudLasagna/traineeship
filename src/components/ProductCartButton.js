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
  const { product, product: { id, price } } = props

  const cart = useSelector((state) => state.cartReducer.cart)
  const cartItem = useSelector(
    (state) => state.cartReducer.cart.find((arrayEntry) => arrayEntry.object.id === id)
  )

  const dispatch = useDispatch()

  let isInCart;

  if (cart.find((item) => item.object.id === id)) {
    isInCart = true;
  } else isInCart = false;

  const handleCartClick = () => {
    dispatch(addProduct({
      object: product,
      amount: 1,
      price
    }))
  }

  const handleMinusClick = () => {
    if (cartItem.amount - 1 > 0) {
      dispatch(setProductAmount({
        object: product,
        amount: cartItem.amount - 1
      }))
    } else dispatch(removeProduct({ id }))
  }

  const handlePlusClick = () => {
    dispatch(setProductAmount({
      object: product,
      amount: cartItem.amount + 1
    }))
  }

  const handleInputChange = (event) => {
    const { target } = event;
    const { value } = target;

    if (Number(value) > 0) {
      dispatch(setProductAmount({
        object: product,
        amount: Number(value)
      }))
    } else dispatch(removeProduct({ id }))
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
  product: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
}

export default connect()(ProductCartButton)
