import { useState, useEffect } from "react";
import { fetchMoviesBySearch } from "../../services/api";
import MoviesList from "../../components/MoviesList/MoviesList";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { ReactComponent as SearchIcon } from "../../images/search.svg";

import s from "./MoviesPage.module.css";
Notify.init({
  className: "notiflix-notify",
  width: "280px",
  position: "right-top",
  distance: "10px",
  opacity: 1,
});
const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query) {
      return;
    }
    fetchMoviesBySearch(query).then((data) => {
      if (data.results.length === 0) {
        Notify.failure("Write the correct Movie name, please!", {
          position: "center-top",
          distance: "155px",
          fontSize: "20px",
          timeout: 2500,
          width: "27%",
        });
        return;
      }
      setMovies(data.results);
    });
  }, [query]);

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(input);
    if (input.trim() === "") {
      Notify.failure("Write the name of the movie, please!", {
        position: "center-top",
        distance: "155px",
        fontSize: "20px",
        timeout: 2500,
        width: "27%",
      });
      return;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.form}>
        <button type="submit" className={s.formBtn}>
          <SearchIcon />
        </button>
        <input
          onInput={handleInput}
          value={input}
          className={s.formInput}
          placeholder="Search movies"
        ></input>
      </form>
      {movies && movies.length > 0 ? (
        <MoviesList moviesList={movies} />
      ) : (
        <div className={s.containerGif}></div>
      )}
    </>
  );
};

export default MoviesPage;
