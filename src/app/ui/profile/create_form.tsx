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
  const [imageUrl, setImageUrl] = useState<string>("/placeholder_product.png");
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
      const resizedImage = await resizeImage(file, 800, 533);
      const formData = new FormData();
      formData.append("file", resizedImage, file.name);

      const resizedImage2 = await resizeImage(file, 600, 400);
      const formData2 = new FormData();
      formData2.append("file", resizedImage2, file.name);

      const res = await axios.post(
        "https://handcrafted-haven-project.vercel.app/api/route",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const res2 = await axios.post(
        "https://handcrafted-haven-project.vercel.app/api/route",
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg m-4">Create Product</h1>
      <form
        action={formAction}
        className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <fieldset className="space-y-4">
          <div>
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select a category
              </option>
              <option value="Jewelry">Jewelry</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Toys">Toys</option>
              <option value="Art">Art</option>
              <option value="Stationery">Stationery</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <input type="hidden" name="product_image" value={imageUrl} />
          <input type="hidden" name="product_image_small" value={imageUrl2} />
        </fieldset>

        <fieldset className="space-y-4">
          <div>
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Modify Image (Recommended Sizes: 800x533 px)
            </label>
            <input
              id="fileUpload"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleUpload}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Preview Image
            </button>
          </div>
          {imageUrl && (
            <div className="mt-4">
              <NextImage
                src={imageUrl}
                width={600}
                height={400}
                alt="Uploaded Image"
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </fieldset>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
