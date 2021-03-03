import React from 'react';
import PropTypes from 'prop-types';

const FilterGenres = ({genres, usedGenres, filterGenres, setFilterGenres}) => {
  
  /**
   * Handler for onchange checbox event.
   * @param {SyntheticEvent} event - The react `SyntheticEvent`.
   * @return {void}
   */
  const onChange = (event) => {
    let newFilterGenres = [];

    if (event.target.checked) {
      newFilterGenres = [...filterGenres, parseInt(event.target.value)];
    } else {
      newFilterGenres = filterGenres.filter((elem) => elem !== parseInt(event.target.value));
    }
    setFilterGenres(newFilterGenres);
  }

  return (
    <fieldset>
      <legend>Genre</legend>
      <div className="row row-cols-lg-4 row-cols-md-3 row-cols-2">
      {genres.map(({id, name}) =>
        usedGenres.includes(id) && (
          <div className="col form-check" key={id}>
            <input className="mr-2" type="checkbox" id={`genre-${id}`} name={`genre-${id}`}
              onChange={onChange} 
              defaultChecked={filterGenres.includes(id)} 
              value={id}
            />
            <label className="form-check-label" htmlFor={`genre-${id}`}>{name}</label>
          </div>
        )
      )}
      </div>
    </fieldset>
  );
};

FilterGenres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  })),
  usedGenres: PropTypes.arrayOf(PropTypes.number),
  filterGenres: PropTypes.arrayOf(PropTypes.number),
  setFilterGenres: PropTypes.func.isRequired
};

export default FilterGenres;
