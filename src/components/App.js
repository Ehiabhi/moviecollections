import React, { useState, useEffect } from "react";
import MovieStack from "./MovieStack";
import Search from "./Search";
import Main from "./Main";
import Header from "./Header";

function App() {
  let [movieName, setMovieName] = useState("");
  let [movieCollection, setMovieCollection] = useState([]);
  let [error, setError] = useState({
    state: false,
    message: "",
  });

  useEffect(() => {
    function updateMovieCollections() {
      let frame1 = document.getElementById("frame1");
      let frame2 = document.getElementById("frame2");
      frame1.innerHTML = "";
      let movieIndex = 0;
      while (movieIndex < movieCollection.length / 2) {
        frame1.innerHTML += `<div class="movie" style="order: ${movieIndex} ;background-image: url(${movieCollection[movieIndex].Poster})" >${movieCollection[movieIndex].Title}</div>`;
        movieIndex++;
      }
      frame2.innerHTML = "";
      while (movieIndex < movieCollection.length) {
        frame2.innerHTML += `<div class="movie" style="order: ${
          movieIndex - 10
        } ;background-image: url(${movieCollection[movieIndex].Poster})" >${
          movieCollection[movieIndex].Title
        }</div>`;
        movieIndex++;
      }
    }
    movieCollection.length > 0 && updateMovieCollections();
    error.state &&
      setTimeout(
        () =>
          setError((prev) => {
            return { ...prev, state: false };
          }),
        10000
      );
  }, [movieCollection, error.state]);

  const finishedTypingInterval = 4000;
  let finishTypingId;

  function movieSearchActions() {
    setMovieCollection([]);
    movieSearch();
  }

  function keyUp() {
    clearTimeout(finishTypingId);
    if (movieName.length === 0) return;
    finishTypingId = setTimeout(movieSearchActions, finishedTypingInterval);
  }

  function keyDown() {
    clearTimeout(finishTypingId);
  }

  function changeHandler(e) {
    let value = e.target.value;
    setMovieName(value);
  }

  async function movieSearch() {
    let page = 1;
    while (page < 4) {
      fetch(
        `https://www.omdbapi.com/?s=${movieName}&page=${page}&apikey=97e5c07b`
      )
        .then((response) => {
          return response.json();
        })
        .then((rawData) => {
          if (rawData.Response === "False") {
            setError({
              state: true,
              message:
                rawData.Error +
                " Enter more characters to narrow down the search results.",
            });
          } else {
            setMovieCollection((prev) => [...prev, ...rawData.Search]);
          }
        })
        .catch((error) => {
          console.log("Request was not successful. " + { error });
        });
      page++;
    }
  }

  return (
    <>
      <div className="App">
        <Header />
        <Main />
        <Search
          value={movieName}
          onChangeHandler={changeHandler}
          keyDownListener={keyDown}
          keyUpListener={keyUp}
          err={error}
        />
        <MovieStack
          section_id="movie1"
          frame_id="frame1"
          caption="Movie Category 1"
          content={movieCollection.length === 0}
        />
        <MovieStack
          section_id="movie2"
          frame_id="frame2"
          caption="Movie Category 2"
          content={movieCollection.length === 0}
        />
      </div>
    </>
  );
}

export default App;
