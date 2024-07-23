import Image from "next/image";
import { getReviewsAndRatingsByProduct } from "@/app/lib/data";

export default async function ReviewsAndRatings({productId}: { productId: string;}) {

	const reviewsAndRatings = await getReviewsAndRatingsByProduct(productId);

  return (
    <div className="container mx-auto p-8 flex flex-col items-center justify-center">
      <ul className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-center text-3xl font-bold mb-8 text-gray-900">
          Reviews and Ratings
        </h1>
        {reviewsAndRatings?.map((reviewAndRating) => (
          <li
            key={reviewAndRating.product_id}
            className="flex flex-col sm:flex-row items-center bg-gray-50 rounded-lg p-6 mb-6 shadow-sm"
          >
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <Image
                src={reviewAndRating.user_profile_image}
                width={200}
                height={300}
                alt={`${reviewAndRating.user_name}'s profile picture`}
                className="rounded-lg border border-gray-200 shadow-sm"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
              <div className="mb-4 sm:mb-0 sm:mr-6">
                <p className="text-lg font-semibold text-gray-700">
									{reviewAndRating.user_name}
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  {reviewAndRating.review}
                </p>
                <p className="text-lg font-semibold text-gray-700">
                  Rating: {reviewAndRating.rating}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
