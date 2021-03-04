import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadRestaurant } from './actions';
import RestaurantContainer from './RestaurantContainer';
import RestaurantsMenuContainer from './RestaurantsMenuContainer';

export default function RestaurantPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadRestaurant(id));
  });

  return (
    <div>
      <RestaurantContainer />
      <RestaurantsMenuContainer />
    </div>
  );
}
