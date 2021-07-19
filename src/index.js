import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import './index.css';

import React, { useState } from 'react';
import 'react-bootstrap';
import { Button, Modal, Carousel } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import $ from 'jquery/dist/jquery.js';
import App from './App';
import reportWebVitals from './reportWebVitals';

import placeholder from './pics/placeholder.png';
import tray from './pics/bin.png';

import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";


const data =[{
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
	},
];

const bin = [];





class ListItem extends React.Component {
	constructor(props){
		super(props);
		this.dataEntry = data[this.props.index];
		
		this.state = {showDescription: false};
	}
	
	handleShowFormClick = () => {
		this.setState({showDescription: true})
	}
	
	handleCloseFormClick = () => {
		this.setState({showDescription: false})
	}
	
	render(){
		return(	
			<div className='item-wrapper col-4 p-3'>
				<div className='p-3 d-flex flex-column cell'>
					<div className='img-wrapper mx-auto' style={{padding:0, maxWidth:300, minWidth:200}}>
						<img src={getArrayEntryById(this.dataEntry.images, this.dataEntry.main_image).url} alt='X'/>
					</div>
					<div className='description-wrapper d-flex flex-column'>
						<h3 className='text-left text-wrap pt-3'>{this.dataEntry.name}</h3>
						<h6 className='text-left text-wrap text-break'>{this.dataEntry.short_description}</h6>
					</div>
					<div className='product-footer-wrapper d-flex flex-row mt-2' style={{paddingRight:0}}>
						<div className='product-price-wrapper col-6 d-flex flex-column'>
							<h4>{this.dataEntry.price + ' руб'}</h4>
							<h6>{'Рейтинг: ' + '★'.repeat(this.dataEntry.rating)}</h6>
						</div>
						<div className='product-buttons-wrapper col-6 d-flex flex-column'>
							<button onClick={this.handleCloseFormClick} className='btn btn-warning col-12 mx-auto'>в корзину</button>
							<DescriptionForm data={this.dataEntry}/>	
						</div>
					</div>
				</div>
					
			</div>
		);
	}
}

function DescriptionForm(props) {
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	return (
		<>
			<Button variant='warning' onClick={handleShow} className='col-12 mx-auto mt-2'>
				подробнее
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title className='col-11'>{props.data.name}</Modal.Title>
					<Button variant='link' className='col-1' onClick={handleClose}>
						X
					</Button>
				</Modal.Header>
				<Modal.Body>
					
					<CarouselT images={props.data.images} mainImage={props.data.main_image}/>

				</Modal.Body>
				<Modal.Footer className='d-flex flex-column'>
					<div className='text-wrap text-break col-12'>
						{props.data.full_description}
					</div>
					<div className='modalPriceRating d-flex flex-row col-12 mt-1 pt-3'>
						<div className='col-4'>{'Рейтинг: ' + '★'.repeat(props.data.rating)}</div>
						<div className='leftBorder col-4 text-center'>{props.data.price + ' руб.'} </div>
						<Button variant='warning' className='col-4' onClick={handleClose}>
							В корзину
						</Button>
					</div>
				</Modal.Footer>
			</Modal>
		</>
	);
  }

/*<Carousel keyboard={false}>
						<Carousel.Item>
							<img
								className="d-block w-100"
								src={props.data.images.find(image => image.id === props.data.main_image).url}
								alt='X'
							/>
						</Carousel.Item>
						{
							props.data.images.map((image) => 
								image.id === props.data.main_image ? '' : 
								<Carousel.Item key={image.id}>
									<img
										className="d-block w-100"
										src={image.url}
										alt='X'
									/>
								</Carousel.Item>
							)
						}
					</Carousel>*/

class CarouselT extends React.PureComponent {
	constructor(props) {
		super(props);
		this.images = this.props.images;
		this.mainImage = this.props.mainImage;
		this.slider = React.createRef();
		this.state = {
		autoplay: true,
		};

	}


	_onSelect = (active, direction) => {
		console.log(`active=${active} && direction=${direction}`);
	};
	_visiableOnSelect = (active) => {
		console.log(`visiable onSelect active=${active}`);
	};
	_slideNext = () => {
		this.slider.current.slideNext();
	};
	_slidePrev = () => {
		this.slider.current.slidePrev();
	};
	_goToSlide = () => {
		this.slider.current.goToSlide(1);
	};
	_autoplay = () => {
		this.setState({ autoplay: !this.state.autoplay });
	};
	render() {
		return (
			
			<RBCarousel
				animation={true}
				autoplay={this.state.autoplay}
				slideshowSpeed={3500}
				defaultActiveIndex={getArrayIndexById(this.images, this.mainImage)}
				leftIcon={this.state.leftIcon}
				rightIcon={this.state.rightIcon}
				ref={this.slider}
				version={4}
				>
				{
					this.images.map((image) => 
						<div key={image.id}>
							<img
								className="d-block w-100"
								src={image.url}
								alt='X'
							/>
						</div>
					)
				}
			</RBCarousel>
		);
	}
}

function getArrayIndexById(array, id){
	for(var i = 0; i < array.length; i++){
		if (array[i].id === id) {
			return i;
		} 
	};
	return 0;
}

function getArrayEntryById(array, id){
	return array.find(arrayEntry => arrayEntry.id === id);
}

class TEST extends React.Component {
    render() {
        return(
		<div className='wrapper col-11 mt-3 center-block mx-auto p-4'>
			<header className='container d-flex col-12'>
				<h2 className=' col-3'>магазинский</h2>
			</header>
			<div className='menu container d-flex col-12'>
				<button className='btn btn-outline-primary col-1'>Войти</button>
				<div className='col-10' />
				<button className='btn btn-outline-secondary col-1'><img src={tray} alt='X'/></button>
			</div>
			
			<div className='catalog-wrapper container col-12 pt-5'>
				<div className='row'>
				
				<ListItem index='0' />
				<ListItem index='1' />
				<ListItem index='2' />
				<ListItem index='3' />
				
				
				</div>
			</div>

		</div>
	    );    
    }
}


ReactDOM.render(
  <TEST />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
