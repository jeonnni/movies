import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import StarRating from "../components/StarRating";
import { IoArrowBackCircle } from "react-icons/io5";

// 상세 정보 페이지
function Detail (){
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);  
        
        const getMovies = async () => {
          // token
          const token = process.env.REACT_APP_TMDB_TOKEN;
          // 만약 토큰이 없거나 undefined면 여기서 바로 멈추게 함
          if (!token) {
            console.error("token 찾을 수 없음.");
            return;
          }

          const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR&append_to_response=videos`;
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
        };  
        getMovies();

        return () => {
          document.body.style.overflow = "";
        }
    }, [id]);

    const showYouTube = () => {
      if (!movie || !movie.videos || movie.videos.results.length === 0) {
        alert("제공되는 YouTube 예고편이 없습니다.");
        return;
      }
      const results = movie.videos.results;
      // console.log(results.key);
      const video =
        results.find((v) => v.type === "Trailer") || // 1순위: 공식 예고편
        results.find((v) => v.type === "Teaser") || // 2순위: 티저
        results.find((v) => v.type === "Featurette") || // 3순위: 특별 영상
        results[0]; // 4순위: 그 외 첫 번째 영상
      // console.log("최종 선택된 영상:", video);
      if (video && video.site === "YouTube") {
        // 찾은 비디오의 key값을 사용해 유튜브로 이동
        window.open(`https://www.youtube.com/watch?v=${video.key}`, "_blank");
      } else {
        alert("YouTube 영상을 찾을 수 없습니다.");
      }
    }
    // console.log(movie);
    
    
    return (
      <div className={styles.container}>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <div
            className={styles.detail}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <Link to="/" className={styles.back}>
              <IoArrowBackCircle
                size={50}
                style={{
                  filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))",
                }}
              />
            </Link>
            <div className={styles.overlay}>
              <div className={styles.box}>
                <h1 className={styles.title}>{movie.title}</h1>
                <button onClick={showYouTube} className={styles.trailer_btn}>
                  예고편 보기
                </button>
              </div>
              <h3 className={styles.tagline}>{movie.tagline}</h3>
              <p className={styles.overview}>{movie.overview}</p>
              <ul className={styles.genres}>
                {movie.genres &&
                  movie.genres.map((g) => <li key={g.id}>{g.name}</li>)}
              </ul>
              <div className={styles.meta}>
                <p>
                  평점:{" "}
                  <StarRating rating={Number(movie.vote_average.toFixed(1))} />
                </p>
                <p>러닝타임: {movie.runtime}분</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default Detail;