import React from 'react';
import { Card, Tag } from 'antd';
import { uniqueId } from 'lodash';
import classNames from 'classnames';

import './CinemaItem.css';
import RateSystem from '../RateSystem/Rate';

export default class CinemaItem extends React.Component {
  minify = (text, length) => {
    return text.slice(0, text.indexOf(' ', length)) + '...';
  };

  render() {
    const { movie, ratedFilm, tab, guestSession } = this.props;
    const movieData = tab === '1' ? movie : ratedFilm;

    const elements = movieData.map((movie) => {
      const { id, title, releaseDate, overview, poster, genres, rating, popularity } = movie;
      const overviewTrunc = this.minify(overview, 150);
      let posterPath = `https://image.tmdb.org/t/p/original${poster}`;

      let сlasses = classNames({
        'card-popularity-count': true,
        orange: popularity >= 3 && popularity < 5,
        yellow: popularity >= 5 && popularity < 7,
        green: popularity >= 7,
      });

      const filmGenres = genres.map((tag) => {
        return (
          <Tag className="tag" key={tag}>
            {tag}
          </Tag>
        );
      });
      return (
        <li key={uniqueId()}>
          <Card hoverable>
            <img className="card-img" src={posterPath} alt={`Not poster(${title})`} />
            <span className={сlasses}>{popularity.toFixed(1)}</span>
            <div>
              <h1 className="card-title">{title}</h1>
              <span className="card-date">{releaseDate}</span>
              <div className="card-tags">{filmGenres}</div>
              <p className="card-overview">{overviewTrunc}</p>
            </div>
            <RateSystem id={id} guestSession={guestSession} rating={rating} />
          </Card>
        </li>
      );
    });
    return elements;
  }
}
