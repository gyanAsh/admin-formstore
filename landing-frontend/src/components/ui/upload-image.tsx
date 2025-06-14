import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";

import { useCallback, useEffect, useState } from "react";
import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/cropper";

// Define type for pixel crop area
type Area = { x: number; y: number; width: number; height: number };

// --- Start: Copied Helper Functions ---
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // Needed for canvas Tainted check
    image.src = url;
  });

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  outputWidth: number = pixelCrop.width, // Optional: specify output size
  outputHeight: number = pixelCrop.height
): Promise<Blob | null> {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    // Set canvas size to desired output size
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      outputWidth, // Draw onto the output size
      outputHeight
    );

    // Convert canvas to blob
    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg"); // Specify format and quality if needed
    });
  } catch (error) {
    console.error("Error in getCroppedImg:", error);
    return null;
  }
}
// --- End: Copied Helper Functions ---

export default function UploadImage({
  returnUrl,
  oldImageUrl,
}: {
  returnUrl: (url: string) => void;
  oldImageUrl: string;
}) {
  const maxSizeMB = 2;
  const maxSize = maxSizeMB * 1024 * 1024; // 2MB default

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/svg+xml,image/png,image/jpeg,image/jpg,image/webp",
    maxSize,
  });
  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;
  const ORIGINAL_IMAGE_URL = previewUrl || "";
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  // Callback to update crop area state
  const handleCropChange = useCallback((pixels: Area | null) => {
    setCroppedAreaPixels(pixels);
  }, []);

  // Function to handle the crop button click
  const handleCrop = async () => {
    if (!croppedAreaPixels) {
      console.error("No crop area selected.");
      return;
    }

    try {
      const croppedBlob = await getCroppedImg(
        ORIGINAL_IMAGE_URL,
        croppedAreaPixels
      );
      if (!croppedBlob) {
        throw new Error("Failed to generate cropped image blob.");
      }

      // Create a new object URL
      const newCroppedUrl = URL.createObjectURL(croppedBlob);

      // Revoke the old URL if it exists
      if (oldImageUrl) {
        URL.revokeObjectURL(oldImageUrl);
      }
      if (ORIGINAL_IMAGE_URL) {
        URL.revokeObjectURL(ORIGINAL_IMAGE_URL);
      }
      returnUrl(newCroppedUrl);
      // Set the new URL
    } catch (error) {
      console.error("Error during cropping:", error);
      // Optionally: Clear the old image URL on error
      if (oldImageUrl) {
        URL.revokeObjectURL(oldImageUrl);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        {/* Drop area */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-[input:focus]:ring-[3px]"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload image file"
          />
          {previewUrl ? (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Cropper
                className="h-64 md:flex-1"
                image={ORIGINAL_IMAGE_URL}
                aspectRatio={16 / 9}
                onCropChange={handleCropChange}
              >
                <CropperDescription />
                <CropperImage />
                <CropperCropArea />
              </Cropper>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                aria-hidden="true"
              >
                <ImageIcon className="size-4 opacity-60" />
              </div>
              <p className="mb-1.5 text-sm font-medium">Drop your image here</p>
              <p className="text-muted-foreground text-xs">
                SVG, PNG, JPG or WEBP (max. {maxSizeMB}MB)
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={openFileDialog}
              >
                <UploadIcon
                  className="-ms-1 size-4 opacity-60"
                  aria-hidden="true"
                />
                Select image
              </Button>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={() => removeFile(files[0]?.id)}
              aria-label="Remove image"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <Button
        onClick={handleCrop}
        className="hover:scale-[1.02]"
        disabled={!croppedAreaPixels}
      >
        Upload Image
      </Button>
      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
