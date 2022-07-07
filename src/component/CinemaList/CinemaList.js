import React from 'react';

import './CinemaList.css';
import CinemaItem from '../CinemaItem/CinemaItem';

export default class CinemaList extends React.Component {
  render() {
    const { movie } = this.props;
    const elements = movie.map((movie) => {
      const { id, ...items } = movie;
      return (
        <li key={id}>
          <CinemaItem {...items} />
        </li>
      );
    });
    return <ul className="movieList">{elements}</ul>;
  }
}
