import Image from "next/image";

interface ProductImagesProps {
  product: any;
}

const ProductImages = ({ product }: ProductImagesProps) => (
  <div className="w-full lg:w-1/2 flex flex-col border bg-card p-5 rounded-sm">
    <div className="w-full border rounded-sm max-w-xl mx-auto">
      <Image
        alt={product.title}
        src={product.imageUrl}
        height={500}
        width={300}
        className="w-full max-h-[500px] h-[100%] object-contain rounded-sm border shadow-lg bg-white"
      />
    </div>
    <div className="border flex gap-2 mt-2 p-2 rounded-sm">
      {product.images.length > 0 ? (
        product.images.map((img: any) => (
          <Image
            key={img.id}
            alt="item_image"
            src={img.url}
            height={100}
            width={100}
            className="border rounded-sm"
          />
        ))
      ) : (
        <div className="bg-transparent w-24 h-24 flex items-center justify-center rounded-sm border">
          <span className="text-white">No Image</span>
        </div>
      )}
    </div>
  </div>
);

export default ProductImages;
