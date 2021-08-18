/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import {
  Button,
  Modal,
  Carousel
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import ProductCartButton from './ProductCartButton';
import placeholder from '../pics/placeholder.png';

const pt = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  short_description: PropTypes.string,
  full_description: PropTypes.string,
  price: PropTypes.number,
  rating: PropTypes.number,
  images: PropTypes.arrayOf(PropTypes.array),
  main_image: PropTypes.number
}

const dp = {
  id: 0,
  name: 'placeholder',
  short_description: 'placeholder',
  full_description: 'placeholder',
  price: 0,
  rating: 0,
  images: [],
  main_image: 0
}

function ListItem(props) {
  const {
    data,
    data:
    {
      id, name, short_description, price, rating, images, main_image
    }
  } = props

  return (
    <div className="item-wrapper col-12 mb-3">
      <div className="p-3 d-flex flex-column cell">
        <div className="img-wrapper mx-auto" style={{ padding: 0, minWidth: 200, width: '100%' }}>
          <img src={images.find((arrayEntry) => arrayEntry.id === main_image).url} alt="X" style={{ width: '100%' }} />
        </div>
        <div className="description-wrapper d-flex flex-column">
          <h3 className="text-left text-wrap pt-3">{name}</h3>
          <h6 className="text-left text-wrap text-break">{short_description}</h6>
        </div>
        <div className="product-footer-wrapper d-flex flex-row mt-2" style={{ paddingRight: 0 }}>
          <div className="product-price-wrapper col-6 d-flex flex-column">
            <h4>{`${price} руб`}</h4>
            <h6>{`Рейтинг: ${'★'.repeat(rating)}`}</h6>
          </div>
          <div className="product-buttons-wrapper col-6 d-flex flex-column">
            <ProductCartButton className="col-12 mx-auto" productId={id} />
            <DescriptionForm data={data} />
          </div>
        </div>
      </div>

    </div>
  );
}

function DescriptionForm(props) {
  const [show, setShow] = useState(false);
  const toggleForm = () => setShow((prev) => !prev);

  const {
    data:
    {
      id, name, images, main_image, full_description, rating, price
    }
  } = props

  const getI = (array, aid) => array.findIndex((arrayEntry) => arrayEntry.id === aid)

  const getE = (array, aid) => array.find((arrayEntry) => arrayEntry.id === aid)

  const sortedImages = [].concat(images)
  sortedImages.splice(getI(images, main_image), 1)
  sortedImages.unshift(getE(images, main_image))

  return (
    <>
      <Button variant="warning" onClick={toggleForm} className="col-12 mx-auto mt-2">
        подробнее
      </Button>

      <Modal show={show} onHide={toggleForm}>
        <Modal.Header>
          <Modal.Title className="col-11">{name}</Modal.Title>
          <Button variant="link" className="col-1" onClick={toggleForm}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Carousel keyboard={false}>
            {sortedImages.map((image) => (
              <Carousel.Item key={image.id}>
                <img
                  className="d-block w-100"
                  src={image.url}
                  alt={placeholder}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column">
          <div className="text-wrap text-break col-12">
            {full_description}
          </div>
          <div className="modalPriceRating d-flex flex-row col-12 mt-1 pt-3">
            <div className="col-4">{`Рейтинг: ${'★'.repeat(rating)}`}</div>
            <div className="leftBorder col-4 text-center">
              {`${price} руб.`}
              {' '}
            </div>
            <ProductCartButton className="col-4" productId={id} />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ListItem.propTypes = pt;
ListItem.defaultProps = dp;

DescriptionForm.propTypes = pt;
DescriptionForm.defaultProps = dp;

export default ListItem;
