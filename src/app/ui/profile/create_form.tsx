"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";
import NextImage from "next/image";
import { State3, createProduct } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { useSearchParams } from "next/navigation";

export default function CreateForm() {
  const searchParams = useSearchParams();
  const userId = searchParams?.get("userId") || "";

  const initialState: State3 = { message: null, errors: {} };
  const createProductWithId = createProduct.bind(null, userId);
  const [state, formAction] = useFormState(createProductWithId, initialState);

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("/placeholder_product.jpg");
  const [imageUrl2, setImageUrl2] = useState<string>(
    "/placeholder_product.jpg"
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const resizeImage = (
    file: File,
    width: number,
    height: number
  ): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas is empty"));
            }
          }, "image/jpeg");
        };
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const resizedImage = await resizeImage(file, 800, 600);
      const formData = new FormData();
      formData.append("file", resizedImage, file.name);

      const resizedImage2 = await resizeImage(file, 400, 300);
      const formData2 = new FormData();
      formData2.append("file", resizedImage2, file.name);

      const res = await axios.post(
        "http://localhost:3000/api/route",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const res2 = await axios.post(
        "http://localhost:3000/api/route",
        formData2,
        {
          headers: {
            "Content-Type": "multipart/form-data2",
          },
        }
      );
      setImageUrl(res.data.url);
      setImageUrl2(res2.data.url);
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };

  return (
    <div>
      <form action={formAction}>
        <fieldset>
          <label>Name:</label>
          <input name="productName" type="text" required />

          <label>Category:</label>
          <input name="category" type="text" required />

          <label>Price:</label>
          <input name="price" type="number" required />

          <input type="hidden" name="product_image" value={imageUrl} />
          <input type="hidden" name="product_image_small" value={imageUrl2} />

          <label>Description:</label>
          <textarea name="description" required></textarea>

          <label>Stock:</label>
          <input name="stock" type="number" required />
        </fieldset>

        <fieldset>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {imageUrl && (
            <NextImage
              src={imageUrl}
              width={400}
              height={300}
              alt="Uploaded Image"
            />
          )}
        </fieldset>

        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
