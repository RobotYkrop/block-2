import React from 'react';
import { Card, Rate, Tag } from 'antd';

import './CinemaItem.css';
export default class CinemaItem extends React.Component {
  minify = (text, length) => {
    return text.slice(0, text.indexOf(' ', length)) + '...';
  };

  render() {
    const { movie } = this.props;
    const elements = movie.map((movie) => {
      const { id, title, releaseDate, overview, poster, genres } = movie;
      const overviewTrunc = this.minify(overview, 150);
      let posterPath = `https://image.tmdb.org/t/p/original${poster}`;

      const filmGenres = genres.map((genre) => {
        return (
          <Tag className="tag" key={genre}>
            {genre}
          </Tag>
        );
      });
      return (
        <li key={id}>
          <Card hoverable>
            <img className="card-img" src={posterPath} alt={`Not poster(${title})`} />
            <div>
              <h1 className="card-title">{title}</h1>
              <span className="card-date">{releaseDate}</span>
              <div className="card-tags">{filmGenres}</div>
              <p className="card-overview">{overviewTrunc}</p>
              <Rate count={10} />
            </div>
          </Card>
        </li>
      );
    });
    return elements;
  }
}
