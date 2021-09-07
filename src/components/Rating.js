import React from 'react';
import Stars from 'react-stars';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';

const Rating = (props) => {
  let canEdit = useSelector((state) => state.userReducer.loggedIn);
  const { product: { id, rating } } = props

  const changeRating = (newRating) => {
    axios.put(`/api/v1/catalog/rating/${id}`, { rating: newRating })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
    canEdit = false
  }
  return (
    <Stars
      value={rating}
      count={5}
      size={24}
      onChange={changeRating}
      half={false}
      edit={canEdit}
    />
  )
}

Rating.propTypes = {
  product: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.number,
  rating: PropTypes.number
}
Rating.defaultProps = {
  id: 0,
  rating: 0
}

export default connect()(Rating)
