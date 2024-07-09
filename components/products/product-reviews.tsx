import { Button } from "@/components/ui/button";

interface CustomerReviewsProps {
  reviews: { id: number; rating: number; comment: string }[];
}

const ProductReviews = ({ reviews }: CustomerReviewsProps) => (
  <div className="lg:w-2/3 w-full bg-card p-5 rounded-sm border ">
    <h1 className="font-bold text-lg mb-4">Customer Reviews</h1>
    <div className="flex flex-col items-center justify-center w-full">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="w-full mb-4 p-4 border rounded">
            <div className="font-bold">{review.rating} Stars</div>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <>
          <h1>Be the first to review this product</h1>
          <Button className="my-4">Write a review</Button>
        </>
      )}
    </div>
  </div>
);

export default ProductReviews;
