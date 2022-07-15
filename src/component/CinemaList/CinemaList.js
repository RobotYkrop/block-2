import React from 'react';
import PropTypes from 'prop-types';

import './CinemaList.css';
import CinemaItem from '../CinemaItem/CinemaItem';
import { Consumer } from '../CinemaContext/CinemaContext';

export default class CinemaList extends React.Component {
  render() {
    return (
      <Consumer>
        {({ movie, ratedFilm, tab, guestSession, rating }) => (
          <ul className="movieList">
            <CinemaItem movie={movie} ratedFilm={ratedFilm} tab={tab} guestSession={guestSession} rating={rating} />
          </ul>
        )}
      </Consumer>
    );
  }
}

CinemaList.defaultProps = {
  guestSession: '',
};

CinemaList.propTypes = {
  guestSession: PropTypes.string,
};
