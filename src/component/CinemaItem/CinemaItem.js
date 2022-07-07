import { Card } from 'antd';
import React from 'react';

import './CinemaItem.css';

export default class CinemaItem extends React.Component {
  render() {
    const { title, release_date, overview, poster_path } = this.props;
    let poster = `https://image.tmdb.org/t/p/original${poster_path}`;
    return (
      <Card>
        <img className="card-img" src={poster} />
        <div>
          <h1 className="card-title">{title}</h1>
          <span className="card-date">{release_date}</span>
          <div>
            <span className="card-tags">Action</span>
            <span className="card-tags">Horror</span>
          </div>
          <p className="card-overview">{overview}</p>
        </div>
      </Card>
    );
  }
}
