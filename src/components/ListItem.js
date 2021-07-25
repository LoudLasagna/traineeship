import React, { useState } from 'react';
import {
  Button,
  Modal
} from 'react-bootstrap';

import CarouselT from './CarouselT';

import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart, removeAllFromCart } from './redux/cartSlicer'

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.dataEntry = props.item;

    this.state = {
      showDescription: false
    };
  }

	getArrayEntryById = (array, id) => array.find((arrayEntry) => arrayEntry.id === id)

	render() {
	  return (
  <div className="item-wrapper col-12 mb-3">
    <div className="p-3 d-flex flex-column cell">
      <div className="img-wrapper mx-auto" style={{ padding: 0, minWidth: 200, width: '100%' }}>
        <img src={this.getArrayEntryById(this.dataEntry.images, this.dataEntry.main_image).url} alt="X" style={{ width: '100%' }}/>
      </div>
      <div className="description-wrapper d-flex flex-column">
        <h3 className="text-left text-wrap pt-3">{this.dataEntry.name}</h3>
        <h6 className="text-left text-wrap text-break">{this.dataEntry.short_description}</h6>
      </div>
      <div className="product-footer-wrapper d-flex flex-row mt-2" style={{ paddingRight: 0 }}>
        <div className="product-price-wrapper col-6 d-flex flex-column">
          <h4>{`${this.dataEntry.price} руб`}</h4>
          <h6>{`Рейтинг: ${'★'.repeat(this.dataEntry.rating)}`}</h6>
        </div>
        <div className="product-buttons-wrapper col-6 d-flex flex-column">
          <button onClick={this.handleCloseFormClick} className="btn btn-warning col-12 mx-auto">в корзину</button>
          <DescriptionForm data={this.dataEntry} />
        </div>
      </div>
    </div>

  </div>
	  );
	}
}

function DescriptionForm(props) {
  const cart = useSelector((state) => state.cart.products)
  const dispatch = useDispatch()

  const [amountInCart, changeInCartAmount] = useState(0);

  const [show, setShow] = useState(false);

  const toggleForm = () => setShow((prev) => !prev);

  const handleCartClick = () => {
    dispatch(addToCart(props.data));
    changeInCartAmount((prev) => prev + 1);
    console.log(amountInCart);
  }

  return (
    <>
      <Button variant="warning" onClick={toggleForm} className="col-12 mx-auto mt-2">
        подробнее
      </Button>

      <Modal show={show} onHide={toggleForm}>
        <Modal.Header>
          <Modal.Title className="col-11">{props.data.name}</Modal.Title>
          <Button variant="link" className="col-1" onClick={toggleForm}>
            X
          </Button>
        </Modal.Header>
        <Modal.Body>

          <CarouselT images={props.data.images} mainImage={props.data.main_image} />
         
        </Modal.Body>
        <Modal.Footer className="d-flex flex-column">
          <div className="text-wrap text-break col-12">
            {props.data.full_description}
          </div>
          <div className="modalPriceRating d-flex flex-row col-12 mt-1 pt-3">
            <div className="col-4">{`Рейтинг: ${'★'.repeat(props.data.rating)}`}</div>
            <div className="leftBorder col-4 text-center">
              {`${props.data.price} руб.`}
              {' '}
            </div>
            <Button variant="warning" className="col-4" onClick={handleCartClick}>
              В корзину
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListItem;