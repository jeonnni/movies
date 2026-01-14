import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

function Movie({
  id,
  title,
  coverImage,
  overview,
  vote_average,
  release_date,
}) {
  return (
    <div className={styles.movie_card}>
      <Link to={`/movie/${id}`}>
        {/* 포스터 */}
        <img src={coverImage} alt={title} title={title} />
      </Link>

      <div>
        {/* 제목 & 연도 (연도는 2025-11-05에서 앞 4자리만 자르기) */}
        <h2>
          {title} ({release_date ? release_date.split("-")[0] : "정보없음"})
        </h2>

        {/* 평점 (소수점 첫째자리까지) */}
        <h4>⭐ {vote_average.toFixed(1)}</h4>

        {/* 줄거리 요약 */}
        <p>
          {overview.length > 150 ? `${overview.slice(0, 150)}...` : overview}
        </p>
      </div>
    </div>
  );
}

// 위에서 정의한 변수명과 타입을 정확히 일치시킴
Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // overview: PropTypes.arrayOf(PropTypes.string).isRequired,
  overview: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
};
export default Movie;