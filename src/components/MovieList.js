import React from 'react';
import GenreList from './GenreList';
import PropTypes from 'prop-types';
import styles from './MovieList.module.css';

const MovieList = ({movies, filterRating, genres, filterGenres}) => {
  
  let movieCounter = 0;
  
  /**
   * Check if the movie passes through filters.
   * @param {number[]} genre_ids - Array of IDs of movie genres.
   * @param {number} id - Movie ID.
   * @param {number} vote_average - Movie rating.
   * @return {(true|null)} - True: Checks passed. Null: Checks failed.
   */
  const passFilters = ({genre_ids, id, vote_average}) => {
    const ratingPassed = filterRating <= vote_average;
    const genresPassed = filterGenres.every((id) => genre_ids.includes(id));
    
    if (ratingPassed && genresPassed) {
      movieCounter += 1;
      return true;
    }

    return null;
  };

  return (
    <>
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1">
        {movies.map(movie => {
          const {genre_ids, id, poster_path, title} = movie;

          return  passFilters(movie) && (
            <div key={id} className="col mb-5">
              <div className={`card h-100 ${styles.card}`}>
                <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <GenreList
                    genre_ids={genre_ids}
                    genres={genres}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {movieCounter < 1 && <div className="alert alert-secondary" role="alert">No movie matching criteria.</div>}
    </>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number.isRequired,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number
  })),
  filterRating: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })),
  filterGenres: PropTypes.arrayOf(PropTypes.number)
};

GenreList.propTypes = {
  enre_ids: PropTypes.arrayOf(PropTypes.number),
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }))
};

export default MovieList;
