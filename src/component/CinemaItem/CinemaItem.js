import React from 'react';
import { Card } from 'antd';

import './CinemaItem.css';
export default class CinemaItem extends React.Component {
  minify = (text, length) => {
    return text.slice(0, text.indexOf(' ', length)) + '...';
  };
  render() {
    const { title, releaseDate, overview, poster } = this.props;
    const overviewTrunc = this.minify(overview, 150);
    let posterPath = `https://image.tmdb.org/t/p/original${poster}`;
    return (
      <Card hoverable>
        <img className="card-img" src={posterPath} alt={`${title}`} />
        <div>
          <h1 className="card-title">{title}</h1>
          <span className="card-date">{releaseDate}</span>
          <div className="card-tags">
            <span className="tag">Action</span>
            <span className="tag">Horror</span>
          </div>
          <p className="card-overview">{overviewTrunc}</p>
        </div>
      </Card>
    );
  }
}
