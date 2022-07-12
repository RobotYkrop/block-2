import React from 'react';

import './CinemaList.css';
import CinemaItem from '../CinemaItem/CinemaItem';

export default class CinemaList extends React.Component {
  render() {
    return (
      <ul className="movieList">
        <CinemaItem movie={this.props.movie} />
      </ul>
    );
  }
}
