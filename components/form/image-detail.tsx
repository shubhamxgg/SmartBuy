import React from "react";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";

interface ImageUploadProps {
  mainImage: File | null;
  setMainImage: React.Dispatch<React.SetStateAction<File | null>>;
  additionalImages: FileList | null;
  setAdditionalImages: React.Dispatch<React.SetStateAction<FileList | null>>;
}

const ImageDetails: React.FC<ImageUploadProps> = ({
  mainImage,
  setMainImage,
  additionalImages,
  setAdditionalImages,
}) => {
  const handleRemoveMainImage = () => {
    setMainImage(null);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    if (additionalImages) {
      const updatedImages = Array.from(additionalImages);
      updatedImages.splice(index, 1);
      const dataTransfer = new DataTransfer();
      updatedImages.forEach((file) => dataTransfer.items.add(file));
      setAdditionalImages(dataTransfer.files);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="main-image">Main Image</Label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setMainImage(e.target.files ? e.target.files[0] : null)
            }
          />
          <div className="grid grid-cols-3 gap-4">
            {mainImage && (
              <div className="relative group">
                <Image
                  alt="Main Product Image"
                  className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                  height={150}
                  src={URL.createObjectURL(mainImage)}
                  width={150}
                />
                <Button
                  className="absolute top-2 right-2 bg-white dark:bg-gray-950 rounded-full"
                  size="icon"
                  variant="ghost"
                  onClick={handleRemoveMainImage}
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="additional-images">Additional Images</Label>
          <input
            type="file"
            id="additionalImages"
            accept="image/*"
            multiple
            onChange={(e) => setAdditionalImages(e.target.files)}
          />
          <div className="grid grid-cols-3 gap-4">
            {additionalImages &&
              Array.from(additionalImages).map((file, index) => (
                <div key={index} className="relative group mt-2">
                  <Image
                    alt={`Additional Product Image ${index + 1}`}
                    className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                    height={150}
                    src={URL.createObjectURL(file)}
                    width={150}
                  />
                  <Button
                    className="absolute top-2 right-2 bg-white dark:bg-gray-950 rounded-full"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveAdditionalImage(index)}
                  >
                    <XIcon className="w-4 h-4" />
                    <span className="sr-only">Remove image</span>
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDetails;
