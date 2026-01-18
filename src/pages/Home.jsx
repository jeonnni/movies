import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css"
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

// 전체 목록 페이지
function Home (){
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [rating, setRating] = useState(8); // 기본 평점
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const onRatingChange = (e) => {
    console.log(e.target.value);
    
    setRating(e.target.value);
    setPage(1);
  };
  const getMovies = async (currentPage, currentRating) => {
    // token
    const token = process.env.REACT_APP_TMDB_TOKEN;
    // 만약 토큰이 없거나 undefined면 여기서 바로 멈추게 함
    if (!token) {
      console.error("token 찾을 수 없음.");
      return;
    }

    // 평점 .gte ~이상 .lte ~이하
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=ko-KR&page=${currentPage}&sort_by=popularity.desc&vote_average.gte=${currentRating}&vote_count.gte=500`;
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
      // console.log("결과 데이터:", json.results);
      setMovies(json.results);
      setTotalPages(json.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getMovies(page, rating);
  }, [page, rating]);
  // console.log(movies);

  return (
    <div className={styles.container}>
      <Header onRatingChange={onRatingChange} rating={rating} />
      {loading ? (
        <strong>loading...</strong>
      ) : (
        <>
          {movies.length === 0 ? (
            <div className={styles.noMovies}>
              There are no movies that match your criteria ...
            </div>
          ) : (
            <>
              {/* 영화 목록 */}
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
              {/* 하단 버튼 */}
              <div className={styles.btn_container}>
                {/* 맨 처음으로 가기 */}
                <button
                  className={styles.page_btn}
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                >
                  First
                </button>
                {/* 2. 이전/다음 화살표 */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <button
                    className={styles.page_btn}
                    disabled={page === 1}
                    onClick={() => setPage((perv) => perv - 1)}
                  >
                    &lt;
                  </button>
                  <span className={styles.page_num}>{page}</span>
                  <button
                    className={styles.page_btn}
                    disabled={page === totalPages}
                    onClick={() => setPage((perv) => perv + 1)}
                  >
                    &gt;
                  </button>
                  <button
                    className={styles.page_btn}
                    onClick={() => setPage(totalPages)}
                    disabled={page === totalPages}
                  >
                    Last
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
      <Footer />
    </div>
  );
}

export default Home;