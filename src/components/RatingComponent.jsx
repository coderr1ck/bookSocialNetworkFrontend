import React, { useState } from "react";
import { Star } from "lucide-react";

const RatingComponent = ({ 
  rating = 0, 
  onChange,      // function to set rating (for input mode)
  readOnly = false, // true → only display, false → allow input
  max = 5        // number of stars
}) => {
  const [hovered, setHovered] = useState(null);

  const displayRating = hovered ?? rating;
  const fullStars = Math.floor(displayRating);
  const hasHalfStar = displayRating % 1 !== 0;
  const emptyStars = max - Math.ceil(displayRating);

  const handleClick = (index) => {
    if (readOnly || !onChange) return;
    onChange(index + 1);
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          className="w-6 h-6 cursor-pointer fill-yellow-400 text-yellow-400"
          onClick={() => handleClick(i)}
          onMouseEnter={() => !readOnly && setHovered(i + 1)}
          onMouseLeave={() => !readOnly && setHovered(null)}
        />
      ))}

      {hasHalfStar && (
        <div className="relative">
          <Star className="w-6 h-6 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      )}

      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          className="w-6 h-6 cursor-pointer text-gray-300"
          onClick={() => handleClick(fullStars + i)}
          onMouseEnter={() => !readOnly && setHovered(fullStars + i + 1)}
          onMouseLeave={() => !readOnly && setHovered(null)}
        />
      ))}

      <span className="ml-2 text-sm text-gray-600">({rating})</span>
    </div>
  );
};

export default RatingComponent;
