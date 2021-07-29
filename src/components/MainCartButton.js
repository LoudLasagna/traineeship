import React from 'react';
import {
  Button,
  Dropdown
} from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, removeAllFromCart } from './redux/cartSlicer';
import tray from '../pics/bin.png';

import ProductCartButton from './ProductCartButton';

const data = [{
  id: 1,
  name: 'Товар 1',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 5,
  price: 1000,
  images: [{
    id: 1,
    url: 'https://picsum.photos/id/19/200'
  }, {
    id: 2,
    url: 'https://picsum.photos/id/20/200'
  }],
  main_image: 1
},
{
  id: 2,
  name: 'Товар 2',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 3,
  price: 2500,
  images: [{
    id: 3,
    url: 'https://picsum.photos/id/222/200'
  }, {
    id: 4,
    url: 'https://picsum.photos/id/64/200'
  }],
  main_image: 4
},
{
  id: 3,
  name: 'Товар 3',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 4,
  price: 13,
  images: [{
    id: 3,
    url: 'https://picsum.photos/id/122/200'
  }, {
    id: 4,
    url: 'https://picsum.photos/id/654/200'
  }],
  main_image: 3
},
{
  id: 4,
  name: 'Товаррррск',
  short_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitttttttttttttttttttttttt.',
  full_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed maximus tellus orci, eu posuere risus sagittis a.',
  rating: 1,
  price: 6666,
  images: [{
    id: 16,
    url: 'https://picsum.photos/id/1022/200'
  }, {
    id: 485,
    url: 'https://picsum.photos/id/1023/200'
  }, {
    id: 465,
    url: 'https://picsum.photos/id/1025/200'
  }, {
    id: 466,
    url: 'https://picsum.photos/id/1028/200'
  }],
  main_image: 465
}
];

function CartItem(props) {
  return (
    <Dropdown.Item className="d-flex" style={{ minWidth: '300px' }}>
      <div className="col-3">
        <img src={props.product.images.find((arrayEntry) => arrayEntry.id === props.product.main_image).url} alt="X" style={{ width: '50px' }} />
      </div>
      <div className="col-5 d-flex flex-column">
        <div>
          {props.product.name}
        </div>
        <div>
          {`${props.product.price} руб`}
        </div>
      </div>
      <div className="col-4">
        <ProductCartButton classname="col-12" productId={props.product.id} />
      </div>
    </Dropdown.Item>
  )
}

export default function MainCartButton(props) {
  const cart = useSelector((state) => state.cart.products)
  const dispatch = useDispatch()

  const checkout = () => {
    console.log('asdasdsad')
  }
  const clearCart = () => {
    dispatch(removeAllFromCart())
  }

  return (
    <>
      {cart.length > 0
        ? (
          <Dropdown className="col-1" autoClose={false}>
            <Dropdown.Toggle variant="outline-secondary" className="col-12" id="dropdown-autoclose-outside">
              <img src={tray} alt="X" />
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ minWidth: '350px' }}>
              {
              data.map((arrayEntry) => (
                cart.find((cartEntry) => cartEntry.id === arrayEntry.id)
                  ? <CartItem key={arrayEntry.id} product={arrayEntry} />
                  : ''))
              }
              <Dropdown.Divider />
              <Dropdown.Item className="d-flex">
                <Button variant="warning" className="col-6" onClick={checkout}> Оформить заказ </Button>
                <div className="col-4" />
                <Button variant="outline-secondary" className="col-2" onClick={clearCart}> X </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button variant="outline-secondary" className="col-1" style={{ minWidth: '50px' }}>
            <img src={tray} alt="X" />
          </Button>
        )}
    </>
  )
}
