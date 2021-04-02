import React, { useReducer, useEffect, useState } from "react";

import Header from "./components/Header";
import Movie from "./components/Movie";
import spinner from "./assets/Ellipsis-1s-200px.gif";
import Search from "./components/Search";
import { initialState, reducer } from "./store/reducer";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

const MOVIE_API_URL = "http://www.omdbapi.com/?apikey=faf7e5bb&s=Batman&page=2";

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then((jsonResponse) => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search.slice(0, 6),
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    axios(
      `http://www.omdbapi.com/?apikey=faf7e5bb&s=${searchValue}&page=2`
    ).then((jsonResponse) => {
      if (jsonResponse.data.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.data.Search.slice(0, 6),
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: jsonResponse.data.Error,
        });
      }
    });
  };

  const { movies, errorMessage, loading, Year } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="flex-start"
          p={1}
          m={1}
          bgcolor="background.paper"
          css={{ maxWidth: 1200 }}
        >
          {movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))}
        </Box>
      </div>
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header id="list" text="HOOKED" search={search} />
        <div className="container-auto">
          <div className="container-search mx-width">
            <Autocomplete
              className="mx-width"
              id="combo-box-demo"
              options={movies}
              getOptionLabel={(option) => option.Year}
              style={{ width: 300 }}
              value={search}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Auto Year"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>

        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
