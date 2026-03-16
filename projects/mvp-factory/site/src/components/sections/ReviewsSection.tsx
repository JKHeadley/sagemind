import type { ReviewItem } from "@/config/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSection({
  reviews,
  averageRating,
  totalReviews,
}: {
  reviews: ReviewItem[];
  averageRating: number;
  totalReviews: number;
}) {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-text">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-3">
            <StarRating rating={Math.round(averageRating)} />
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-text-light">({totalReviews}+ reviews)</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-surface p-6 shadow-sm"
              style={{ borderRadius: "var(--site-radius, 12px)" }}
            >
              <StarRating rating={review.rating} />
              <p className="text-text-light text-sm leading-relaxed mt-3 mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-text">
                  {review.name}
                </span>
                {review.source && (
                  <span className="text-xs text-text-light">{review.source}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
