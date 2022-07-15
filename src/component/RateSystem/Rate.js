import React from 'react';
import { Rate } from 'antd';
import store from 'store';

import './Rate.css';
import CinemaApi from '../CinemaApi/CinemaApi';

export default class RateSystem extends React.Component {
  state = {
    rating: store.get(`${this.props.id}`) || 0,
  };

  setMovieRating = (rate) => {
    const { guestSession, id } = this.props;
    const getApi = new CinemaApi();
    this.setState({
      rating: rate,
    });
    if (rate === 0) getApi.deleteRate(id, guestSession);
    getApi.setRating(id, guestSession, rate);
    store.set(`${id}`, `${rate}`);
  };
  render() {
    return (
      <Rate
        count={10}
        value={this.state.rating}
        onChange={(rate) => {
          this.setMovieRating(rate);
        }}
      />
    );
  }
}
