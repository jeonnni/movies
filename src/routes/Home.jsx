import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css"

// 전체 목록 페이지
function Home (){
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        // token
        const token = process.env.REACT_APP_TMDB_TOKEN;
        // 만약 토큰이 없거나 undefined면 여기서 바로 멈추게 함
        if (!token) {
            console.error("token 찾을 수 없음.");
            return;
        }

        const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=ko-KR&page=1&sort_by=popularity.desc&vote_average.gte=7&vote_count.gte=500";
        const options = {
            method: "GET",
            headers: {
            Authorization: `Bearer ${token.trim()}`,
            accept: "application/json",
            },
        };

        try {
            const response = await fetch(url, options);
            const json = await response.json();

            console.log("결과 데이터:", json.results);

            setMovies(json.results);
            setLoading(false);
        } catch (error) {
            console.error("데이터 가져오기 실패:", error);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    console.log(movies);

    return (
      <div className={styles.container}>
        {loading ? (
          <strong>loading...</strong>
        ) : (
          <div className={styles.crad}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                title={movie.title}
                coverImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                overview={movie.overview}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
              />
            ))}
          </div>
        )}
      </div>
    );
}

export default Home;