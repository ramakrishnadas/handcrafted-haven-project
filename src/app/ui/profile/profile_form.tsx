"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";
import NextImage from "next/image";
import { User } from "@/app/lib/definitions";
import { State2, updateUser } from "@/app/lib/actions";
import { useFormState } from "react-dom";

export default function ProfileForm({ userData }: { userData: User }) {
  const initialState: State2 = { message: null, errors: {} };
  const updateProfileWithId = updateUser.bind(null, userData.id);
  const [state, formAction] = useFormState(updateProfileWithId, initialState);

  let firstImage = userData.profile_image;
  if (!firstImage?.startsWith("https")) {
    firstImage = "/placeholder_profile.png";
  }

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(`${firstImage}`);

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
      const resizedImage = await resizeImage(file, 500, 500);
      const formData = new FormData();
      formData.append("file", resizedImage, file.name);

      const res = await axios.post(
        "https://handcrafted-haven-project.vercel.app/api/route",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageUrl(res.data.url);
    } catch (error) {
      console.error("Error uploading the image", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg m-4">Edit Profile</h1>
      <form
        action={formAction}
        className="max-w-md w-full bg-white shadow-md rounded-lg p-8 space-y-6"
      >
        <fieldset className="space-y-4">
          <div>
            <label
              htmlFor="fileUpload"
              className="block text-sm font-medium text-gray-700"
            >
              Modify Image (Recomended Sizes: 500x500 px)
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
                width={500}
                height={500}
                alt="Uploaded Image"
                className="rounded-lg shadow-md"
              />
            </div>
          )}
        </fieldset>

        <fieldset className="space-y-4">
          <div>
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              defaultValue={userData.name}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="userPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="userPassword"
              name="userPassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="userEmail"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="userEmail"
              name="userEmail"
              type="email"
              defaultValue={userData.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="userStory"
              className="block text-sm font-medium text-gray-700"
            >
              Your Story
            </label>
            <textarea
              id="userStory"
              name="userStory"
              defaultValue={userData.user_story ?? ""}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <input
            type="hidden"
            id="invisibleInput"
            name="userProfile"
            value={imageUrl}
          />
        </fieldset>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Apply Changes
        </button>
      </form>
    </div>
  );
}
