import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery/dist/jquery.js';
import 'bootstrap/dist/js/bootstrap.bundle';
import placeholder from './pics/placeholder.png';
import bin from './pics/bin.png';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Modal, Button } from 'bootstrap';

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
		}],
		main_image: 465
	},
];
//////////////////////////////////////////////
function DescriptionForm(){
	
	return( 
		<div className="modal">
			  <div className="modal-dialog" role="document">
				<div className="modal-content">
				  <div className="modal-header">
					<h5 className="modal-title">Modal title</h5>
					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					  <span aria-hidden="true">&times;</span>
					</button>
				  </div>
				  <div className="modal-body">
					<p>Modal body text goes here.</p>
				  </div>
				  <div className="modal-footer">
					<button type="button" className="btn btn-primary">Save changes</button>
					<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
				  </div>
				</div>
			  </div>
		</div>
	)
}




class ListItem extends React.Component {
	constructor(props){
		super(props);
		this.dataEntry = data[this.props.index];
		
		this.state = {showDescription: false};
		

		
		this.handleCloseFormClick = this.handleCloseFormClick.bind(this);
	}
	
	handleShowFormClick = () => {
		this.setState({showDescription: true})
	}
	
	handleCloseFormClick(){
		this.setState({showDescription: false})
	}
	
	render(){
		return(	
			<div className='item-wrapper col-4 p-3'>
				<div className='p-3 d-flex flex-column cell'>
					<div className='img-wrapper mx-auto' style={{padding:0, maxWidth:300, minWidth:200}}>
						<img src={this.dataEntry.images.find(image => image.id === this.dataEntry.main_image).url} alt='X'/>
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
							<button onClick={this.handleShowFormClick} className='btn btn-warning col-12 mx-auto mt-2'>подробнee</button>
							<div>{this.state.showDescription ? 'Показывать форму' : 'Не показывать форму'}</div>
						</div>
					</div>
				</div>

				
			</div>
		);
	}
}

/*<Modal show={this.showDescription} onHide={this.handleCloseFormClick}>
					<Modal.Header closeButton>
						<Modal.Title>{this.dataEntry.name}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{this.dataEntry.full_description}
					</Modal.Body>
					<Modal.Footer>
						<Button variant='warning' onClick={this.handleCloseFormClick}>в корзину</Button>
					</Modal.Footer>
				</Modal>*/


/*const itemsList = data.map((dataentry) => 
		<div key={data.id} className='item-wrapper col-4 p-3'>
			<div className='p-3 d-flex flex-column cell'>
				<div className='img-wrapper mx-auto' style={{padding:0, maxWidth:300, minWidth:200}}>
					<img src={dataentry.images.find(image => image.id == dataentry.main_image).url}></img>
				</div>
				<div className='description-wrapper d-flex flex-column'>
					<h3 className='text-left text-wrap pt-3'>{dataentry.name}</h3>
					<h6 className='text-left text-wrap text-break'>{dataentry.short_description}</h6>
				</div>
				<div className='product-footer-wrapper d-flex flex-row mt-2' style={{paddingRight:0}}>
					<div className='product-price-wrapper col-6 d-flex flex-column'>
						<h4>{dataentry.price + ' руб'}</h4>
						<h6>{'Рейтинг: ' + '★'.repeat(dataentry.rating)}</h6>
					</div>
					<div className='product-buttons-wrapper col-6 d-flex flex-column'>
						<button className='btn btn-warning col-12 mx-auto'>в корзину</button>
						<button className='btn btn-warning col-12 mx-auto mt-2'>подробнee</button>
					</div>
				</div>
			</div>
		</div>
	);*/



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
				<button className='btn btn-outline-secondary col-1'><img src={bin}/></button>
			</div>
			
			<div className='catalog-wrapper container col-12 pt-5'>
				<div className='row'>
				
				<ListItem index='0' showDescription={false}/>
				<ListItem index='1' showDescription={false}/>
				<ListItem index='2' showDescription={false}/>
				<ListItem index='3' showDescription={false}/>
				
				
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
