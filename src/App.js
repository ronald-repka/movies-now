import {useState, useEffect} from 'react';
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
      setMovies(response.results.sort((a, b) => b.popularity - a.popularity));
      setUsedGenres(getUsedGenres(movies));
    });
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(genresResponse);
      }, 100);
    }).then((response) => {
      setGenres(response.genres);
    });
  }, [movies]);

  return (
    <div className="App">
      <header className="App-header container-fluid p-4">
        <h1>Now Playing Movies</h1>
      </header>
      <main className="container-fluid">
        <section className="container-fluid mt-4 mb-4">
          <div className="form-group d-flex">
            <label className="form-check-label" htmlFor="rating">Rating</label>
            <input className="ml-2 mr-2" type="range" id="rating" name="rating"
              onChange={(e) => setFilterRating(parseFloat(e.target.value))}
              value={filterRating}
              min={0} max={10} step={0.5}
            />
            <output className="form-check-label" name="rating-output" htmlFor="rating">
              {parseFloat(filterRating).toFixed(1)}
            </output>
          </div>
          <div className="form-group">
            <FilterGenres
              genres={genres} 
              usedGenres={usedGenres} 
              filterGenres={filterGenres} 
              setFilterGenres={setFilterGenres}
            />
          </div>
        </section>
        <section className="container-fluid">
          <MovieList
            movies={movies}
            filterRating={filterRating}
            genres={genres}
            filterGenres={filterGenres}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
