import { Star, StarHalf } from "lucide-react";

const renderStars = (rating, id) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`star-${i}`}
        size={16}
        className="fill-yellow-400 text-yellow-400"
      />
    );
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push(
      <StarHalf
        key={`half-star-${id}`}
        size={16}
        className="fill-yellow-400 text-yellow-400"
      />
    );
  }

  // Add empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-star-${i}`}
        size={16}
        className="text-gray-300"
      />
    );
  }

  return stars;
};

export default renderStars;
