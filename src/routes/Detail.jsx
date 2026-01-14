import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import styles from "./Home.module.css";

function Detail (){
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    console.log(id);


    const getMovies = async () => {
      // token
      const token = process.env.REACT_APP_TMDB_TOKEN;
      // 만약 토큰이 없거나 undefined면 여기서 바로 멈추게 함
      if (!token) {
        console.error("token 찾을 수 없음.");
        return;
      }

      const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
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
        setMovie(json);
        setLoading(false);
      } catch (error) {
        console.error("상세 정보 가져오기 실패:", error);
      }
    }
    useEffect(() => {
        getMovies();      
    }, [id]);

    console.log(movie);
    
    return (
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            <h1>{movie.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              style={{ width: "100%" }}
            />
            <h1>{movie.title}</h1>
            <h3>{movie.tagline}</h3>
            <p>{movie.overview}</p>
            <ul>
              {movie.genres &&
                movie.genres.map((g) => <li key={g.id}>{g.name}</li>)}
            </ul>
            <p>평점: {movie.vote_average}</p>
            <p>러닝타임: {movie.runtime}분</p>
            {/* <p>{movie.title_long}</p>
            <p>{movie.description_full}</p>
            <p>{movie.rating}</p>
            <p>
              {movie.year}/{movie.runtime}
            </p>
            <ul>
              {movie.genres.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul> */}
          </div>
        )}
      </div>
    );
}

export default Detail;