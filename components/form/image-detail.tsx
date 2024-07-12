"use client";

import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import Image from "next/image";

const ImageDetails: React.FC = () => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalImages(Array.from(e.target.files));
    }
  };

  const handleRemoveMainImage = () => {
    setMainImage(null);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="mainImage">Main Image</Label>
          <input
            type="file"
            id="mainImage"
            name="mainImage"
            accept="image/*"
            onChange={handleMainImageChange}
            required
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
                  type="button"
                >
                  <XIcon className="w-4 h-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="additionalImages">Additional Images</Label>
          <input
            type="file"
            id="additionalImages"
            name="additionalImages"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
          />
          <div className="grid grid-cols-3 gap-4">
            {additionalImages.map((file, index) => (
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
                  type="button"
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