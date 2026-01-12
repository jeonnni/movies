// import styles from "./App.module.css"
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState("");

  useEffect(()=>{
    fetch(`https://yts.bz/api/v2/list_movies.json?minimum_rating=9&sort_by=year`)
      .then(response => response.json())
      .then(json => {
        setMovies(json.data.movies);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      })
  },[])
  console.log(movies);
  
  return (
    <div>
      {loading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {movies.map((movie) => {
            return <li key={movie.id}>{movie.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
