"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

const UploadFile = () => {
  const [preview, setPreview] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles?.length) {
      setError("Please select a valid file.");
      return;
    }

    const fileArray = Array.from(selectedFiles);
    const isValidType = fileArray.every((file) =>
      ["image/jpeg", "image/png"].includes(file.type)
    );

    if (!isValidType) {
      setError("Only JPEG and PNG files are allowed.");
      return;
    }

    setFiles(fileArray);
    setPreview(fileArray.map((file) => URL.createObjectURL(file)));
    setError("");
  };

  const handleUpload = async () => {
    if (!files.length) {
      setError("Please select a file first.");
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/api/upload");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setProgress(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          setFiles([]);
          setPreview([]);
          setProgress(0);
        } else {
          setError("Upload failed");
        }
      };

      xhr.onerror = () => {
        setError("Upload failed");
      };

      xhr.send(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <Card className="w-full max-w-xl shadow-lg h-[400px]">
        <CardHeader>
          <CardTitle>Upload File</CardTitle>
        </CardHeader>
        <CardContent>
          {preview.map((url, index) => (
            <div
              className="mb-4 flex flex-row gap-4 items-center justify-between"
              key={index}
            >
              <Image
                src={url}
                alt={`File Preview ${index + 1}`}
                width={128}
                height={128}
                className="object-cover rounded"
              />
            </div>
          ))}

          <div className="flex flex-col items-center h-full">
            <input
              type="file"
              accept="image/jpeg,image/png"
              multiple
              onChange={handleFileChange}
              className="mb-4 w-full"
            />
            {files.length > 0 && (
              <div className="w-full mb-4">
                <progress
                  value={progress}
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded"
                />
                <p className="text-center">{progress}%</p>
              </div>
            )}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="button"
              onClick={handleUpload}
              disabled={isUploading || files.length === 0}
              className=" px-4 py-2  bg-blue-500 text-white rounded w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadFile;
