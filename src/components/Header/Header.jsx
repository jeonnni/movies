import styles from "./Header.module.css";
import { BiSolidCameraMovie } from "react-icons/bi";

const Header = ({ onRatingChange, rating }) => {
  return (
    <div className={styles.header}>
      <h1 className={styles.logo}>
        MOVIE
        <span className={styles.icon}>
          <BiSolidCameraMovie color="var(--blue-color)" />
        </span>
      </h1>
      <p className={styles.subtitle}>
        {rating === "0"
          ? "All Movies"
          : `Curated Collection: Ratings ${rating}.0`}
      </p>

      {/* 평점 필터 */}
      <div className={styles.filter_container}>
        <select
          id="rating"
          value={rating}
          onChange={onRatingChange}
          className={styles.select}
        >
          <option value="9">9.0+</option>
          <option value="8">8.0+</option>
          <option value="7">7.0+</option>
          <option value="6">6.0+</option>
          <option value="5">5.0+</option>
          <option value="0">All</option>
        </select>
      </div>
    </div>
  );
};

export default Header;