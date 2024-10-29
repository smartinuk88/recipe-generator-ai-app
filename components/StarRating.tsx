import { Star } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex space-x-2 justify-center items-center mb-4">
      {[1, 2, 3, 4, 5].map((star, i) => {
        return (
          <span key={i}>
            <Star
              className={`text-bluegreen-500 ${
                rating >= star ? "fill-current" : "stroke-current"
              }`}
            />
          </span>
        );
      })}
    </div>
  );
}
export default StarRating;
