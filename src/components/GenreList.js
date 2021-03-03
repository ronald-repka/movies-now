import React from 'react';
import PropTypes from 'prop-types';

const GenreList = ({genre_ids, genres}) => (
  <ul className="m-0 p-0">
    {genre_ids.map((id) => 
      <li key={id} className="badge badge-primary badge-pill mr-2">
        {(genres.find((genre) => genre.id === id))?.name}
      </li>
    )}
  </ul>
);

GenreList.propTypes = {
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }))
};

export default GenreList;
