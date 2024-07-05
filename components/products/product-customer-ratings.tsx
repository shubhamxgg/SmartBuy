interface CustomerRatingsProps {
  ratings: any;
}

const ProductCustomerRatings = ({ ratings }: CustomerRatingsProps) => (
  <div className="lg:w-1/3 w-full bg-card p-5 rounded-sm">
    <h1 className="mb-2 font-bold">Customer Ratings</h1>
    <div className="mb-4">⭐️</div>
    <div className="mb-2">0 customer ratings</div>

    <div className="flex flex-col gap-2">
      {ratings.length > 0 ? (
        <div>
          {ratings.map((rating: any, index: any) => (
            <div key={index} className="flex gap-2 w-full">
              <div>{rating.stars} Stars</div>
              <div>-</div>
              <div>{rating.percentage}%</div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Rating Found </div>
      )}
    </div>
  </div>
);

export default ProductCustomerRatings;
