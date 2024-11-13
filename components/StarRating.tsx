import { Star } from "lucide-react";
import { useState } from "react";

function StarRating({
  ratingCount,
  ratingSum,
  onRate,
}: {
  ratingCount: number;
  ratingSum: number;
  onRate: (selectedRating: number) => void;
}) {
  const averageRating =
    ratingCount > 0 ? Math.round(ratingSum / ratingCount) : 0;

  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(averageRating);

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  const handleClick = (rating: number) => {
    setSelectedRating(rating);
    onRate(rating);
  };

  return (
    <div className="flex space-x-2 justify-center items-center mb-4">
      {[1, 2, 3, 4, 5].map((star) => {
        // Determine whether the star should be filled based on hover, selected, or average rating
        const isFilled = hoverRating
          ? hoverRating >= star
          : selectedRating >= star;

        return (
          <span
            key={star}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
            className="cursor-pointer"
          >
            <Star
              className={`text-bluegreen-500 ${
                isFilled ? "fill-current" : "stroke-current"
              }`}
            />
          </span>
        );
      })}
    </div>
  );
}
export default StarRating;
