function Movie({ data }) {
  return (
    <div key={data.id}>
      <h1>{data.title}</h1>
      <img src={data.medium_cover_image} />
      <p>{data.summary}</p>
      <p>{data.rating}점</p>
      <p>{data.year}년 개봉</p>
      <ul>
        {data.genres.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default Movie;