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
    product,
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
        <img src={images.find((arrayEntry) => arrayEntry.id === main_image).url} alt="X" style={{ maxWidth: '92px' }} />
      </div>
      <div className="col-6 d-flex flex-column">
        <div>
          {name}
        </div>
        <div style={{ paddingBottom: '.5em' }}>
          {`${price} руб`}
        </div>
        <ProductCartButton product={product} />
      </div>
    </>
  )
}

export default connect()(MiniListItem)
