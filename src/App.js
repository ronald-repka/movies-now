import React, {useState, useEffect} from 'react';
import moviesResponse from './data/moviesResponse';
import genresResponse from './data/genresResponse';
import FilterGenres from './components/FilterGenres';
import MovieList from './components/MovieList';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filterRating, setFilterRating] = useState(3);
  const [filterGenres, setFilterGenres] = useState([]);
  const [usedGenres, setUsedGenres] = useState([]);

  /**
   * Reduce genres only to those present in loaded movies.
   * @param {Object[]} movies - List of loaded movies.
   * @param {number[]} movies[].genre_ids - List of genre IDs of a movie.
   * @param {number} movies[].id - ID a movie.
   * @param {number} movies[].popularity - Popularity score of a movie.
   * @param {string} movies[].poster_path - Path of a poster image of a movie.
   * @param {string} movies[].title - Title of a movie.
   * @param {number} movies[].vote_average - User rating score of a movie.
   * @return {number[]} - List of present movie genre IDs.
   */
  const getUsedGenres = (movies) => {
    const usedGenres = new Set();
    movies.forEach(movie => movie.genre_ids.forEach(genre => usedGenres.add(genre)));

    return [...usedGenres];
  };

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(moviesResponse);
      }, 100);
    }).then((response) => {
      setUsedGenres(getUsedGenres(response.results));
      setMovies(response.results.sort((a, b) => b.popularity - a.popularity));
    });
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(genresResponse);
      }, 100);
    }).then((response) => {
      setGenres(response.genres);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header container-fluid p-4">
        <h1>Now Playing Movies</h1>
      </header>
      <nav className="App-filters container-fluid pt-4 pb-1 mb-3">
        <section className="form-group d-flex">
          <label className="form-check-label" htmlFor="rating">Rating</label>
          <input className="ml-2 mr-2" type="range" id="rating" name="rating"
            onChange={(e) => setFilterRating(parseFloat(e.target.value))}
            value={filterRating}
            min={0} max={10} step={0.5}
          />
          <output className="form-check-label" name="rating-output" htmlFor="rating">
            {parseFloat(filterRating).toFixed(1)}
          </output>
        </section>
        <section className="form-group">
          <FilterGenres
            genres={genres} 
            usedGenres={usedGenres} 
            filterGenres={filterGenres} 
            setFilterGenres={setFilterGenres}
          />
        </section>
      </nav>
      <main className="container-fluid">
        <MovieList
          movies={movies}
          filterRating={filterRating}
          genres={genres}
          filterGenres={filterGenres}
        />
      </main>
    </div>
  );
}

export default App;
