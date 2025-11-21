function RoomReview({ reviewDistribution, renderStars }) {
  return (
    <div className="border-t border-gray-200 mt-8 pt-8">
      <h3 className="text-2xl font-bold mb-4">Reviews</h3>
      <div className="flex flex-wrap gap-x-12 gap-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-4xl font-black">4.5</p>
          <div className="flex gap-0.5">{renderStars(4.5)}</div>
          <p className="text-gray-500">120 reviews</p>
        </div>

        <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3">
          {reviewDistribution.map((review) => (
            <>
              <p key={`star-${review.stars}`} className="text-sm">
                {review.stars}
              </p>
              <div
                key={`bar-${review.stars}`}
                className="flex h-2 flex-1 overflow-hidden rounded-full bg-gray-200"
              >
                <div
                  className="rounded-full bg-gray-900"
                  style={{ width: `${review.percentage}%` }}
                ></div>
              </div>
              <p
                key={`pct-${review.stars}`}
                className="text-gray-500 text-sm text-right"
              >
                {review.percentage}%
              </p>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomReview;
