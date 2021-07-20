/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from 'react';
import {
  Button,
  Modal,
  Carousel,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import placeholder from './pics/placeholder.png';

class CarouselT extends React.PureComponent {

	getArrayIndexById(array, id) {
		for(var i = 0; i < array.length; i++){
			if (array[i].id === id) {
				return i;
			} 
		};
		return 0;
	}

	getArrayEntryById(array, id) {
		return array.find(arrayEntry => arrayEntry.id === id);
	}

	render() {
		const sortedImages = [].concat(this.props.images)
		sortedImages.splice(this.getArrayIndexById(this.props.images, this.props.mainImage), 1)
		sortedImages.unshift(this.getArrayEntryById(this.props.images, this.props.mainImage))
		return (
			<Carousel keyboard={false}>
				{sortedImages.map((image) => (
					<Carousel.Item key={image.id}>
					<img
						className="d-block w-100"
						src={image.url}
						alt='X'
					/>
					</Carousel.Item>
				))}
     		</Carousel>
		);
	}
}

export default CarouselT;