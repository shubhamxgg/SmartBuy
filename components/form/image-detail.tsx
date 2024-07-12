"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { XIcon, UploadIcon } from "lucide-react";
import Image from "next/image";

const ImageDetails = () => {
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
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-auto flex flex-col items-center justify-center cursor-pointer overflow-hidden"
              onClick={() => document.getElementById('mainImage')?.click()}
            >
              {mainImage ? (
                <Image
                  src={URL.createObjectURL(mainImage)}
                  alt="Main Product Image"
                  width={100}
                  height={100}
                  className="object-cover"
                />
              ) : (
                <>
                  <UploadIcon className="h-6 w-6 mb-2" />
                  <span>Upload Image</span>
                </>
              )}
            </Button>
            {mainImage && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={handleRemoveMainImage}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
          <input
            id="mainImage"
            name="mainImage"
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="hidden"
            required
          />
        </div>
        <div className="grid gap-2 ">
          <Label htmlFor="additionalImages">Additional Images</Label>
          <div className="grid grid-cols-3 gap-4">
            {additionalImages.map((file, index) => (
              <div key={index} className="relative group">
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`Additional Product Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-cover w-full h-32 rounded-md o"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveAdditionalImage(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full h-32 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => document.getElementById('additionalImages')?.click()}
            >
              <UploadIcon className="h-6 w-6 mb-2" />
              <span>Add Images</span>
            </Button>
          </div>
          <input
            id="additionalImages"
            name="additionalImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDetails;