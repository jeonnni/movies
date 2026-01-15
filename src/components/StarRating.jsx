import { Rating } from "react-simple-star-rating";

// 별점 컴포넌트
const StarRating = ({ rating }) => {
    return (
        <Rating
        initialValue={rating / 2} // 10점 만점을 5점으로 변환
        readonly={true} // 클릭 안 되게 (표시 전용)
        size={20} // 별 크기
        fillColor="gold" // 채워진 색
        emptyColor="gray" // 빈 별 색
        allowFraction={true} // 7.8점 같은 소수점 별점 허용
        />
    );
};

export default StarRating;