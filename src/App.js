// import styles from "./App.module.css"
import { useEffect, useState } from "react";
import Movie from "./Movie";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState("");

  const getMovies = async () => {
    // 1. 서버에 데이터 요청함 (비동기 시작)
    const response = await fetch(
      `https://yts.bz/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    );
    // 2. 응답이 올 때까지 getMovies 함수 내부만 "잠시 일시정지"
    // 3. 응답이 오면 아래 코드를 실행
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
        <div>
          {movies.map((movie) => (
            <Movie data={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
