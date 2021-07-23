import React from 'react';
import {
  Carousel
} from 'react-bootstrap';

import placeholder from '../pics/placeholder.png';

function CarouselT(props) {
	const getI = (array, id) => {
	  for (let i = 0; i < array.length; i++) {
		if (array[i].id === id) {
		  return i;
		}
	  }
	  return 0;
	}
  
	const getE = (array, id) => array.find((arrayEntry) => arrayEntry.id === id)
  
	const sortedImages = [].concat(props.images)
	sortedImages.splice(getI(props.images, props.mainImage), 1)
	sortedImages.unshift(getE(props.images, props.mainImage))
	return (
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
	);
  }
  
  export default CarouselT;