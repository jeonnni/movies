import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css"
import { BiSolidCameraMovie } from "react-icons/bi";

// 전체 목록 페이지
function Home (){
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

  const getMovies = async (currentPage) => {
    // token
    const token = process.env.REACT_APP_TMDB_TOKEN;
    // 만약 토큰이 없거나 undefined면 여기서 바로 멈추게 함
    if (!token) {
      console.error("token 찾을 수 없음.");
      return;
    }
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=ko-KR&page=${currentPage}&sort_by=popularity.desc&vote_average.gte=7&vote_count.gte=500`;
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
      setTotalPages(json.total_pages);
      setLoading(false);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    getMovies(page);
  }, [page]);

  console.log(movies);

  return (
    <div className={styles.container}>
      {/* 상단 */}
      <div className={styles.header}>
        <h1 className={styles.logo}>
          MOVIE
          <span className={styles.icon}>
            <BiSolidCameraMovie color="var(--blue-color)" />
          </span>
        </h1>
        <p className={styles.subtitle}>Curated Excellence: Ratings Over 7.0</p>
      </div>
      {loading ? (
        <strong>loading...</strong>
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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

      <div className={styles.footer}>
        <h1 className={styles.footerText}>
          <span>Copyright ⓒ 2026_MI. All rights reserved.</span>
        </h1>
      </div>
    </div>
  );
}

export default Home;