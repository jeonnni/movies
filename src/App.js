// import styles from "./App.module.css"
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState("");

  const getMovies = async () => {
    const response = await fetch(
      `https://yts.bz/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(()=>{
    getMovies()
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
