import React from 'react';
import { FaStar } from 'react-icons/fa';

// TODO: rating is still dummy
const rating = 4.7;
const count = 100;

function PropertyRating({ inPage }: { inPage: boolean }) {
  const className = `flex gap-1 items-center ${inPage ? 'text-md' : 'text-sm'}`;
  const countText = count > 1 ? 'reviews' : 'review';
  const countValue = `(${count}) ${inPage ? countText : ''}`;

  return (
    <span className={className}>
      <FaStar className="w-3 h-5" /> {rating} {countValue}
    </span>
  );
}

export default PropertyRating;
