"use client";

import { createReviewAndRating, State4 } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function CreateReview({productId} : { productId: string }) {
	const initialState: State4 = { message: null, errors: {} };
	const [state, formAction] = useFormState(createReviewAndRating, initialState);
	
  const currentState = state || initialState;
  const errors = currentState.errors || {};

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mx-auto">
      <form
        action={formAction}
        className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700"
          >
            Rating
          </label>
          <input
            id="rating"
            name="rating"
            type="number"
            aria-describedby="rating-error"
            required
            min={1}
            max={5}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div id="rating-error" aria-live="polite" aria-atomic="true">
            {errors.rating &&
                errors.rating.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            Review
          </label>
          <textarea
            id="review"
            name="review"
            aria-describedby="review-error"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <div id="review-error" aria-live="polite" aria-atomic="true">
            {errors.review &&
                errors.review.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                </p>
            ))}
          </div>
        </div>
        <input type="hidden" name="product_id" value={productId} />

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}
