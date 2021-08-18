/* eslint-disable camelcase */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import {
  Button
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useDispatch, connect } from 'react-redux';
import { removeProduct } from './redux/actions';

import ProductCartButton from './ProductCartButton';

MiniListItem.propTypes = {
  product: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.objectOf(PropTypes.array),
  main_image: PropTypes.number
}
MiniListItem.defaultProps = {
  id: 0,
  name: 'placeholder',
  price: 0,
  images: [],
  main_image: 0
}

function MiniListItem(props) {
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
    <>
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
    </>
  )
}

export default connect()(MiniListItem)
