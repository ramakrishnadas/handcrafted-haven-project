"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";
import NextImage from "next/image";
import {User} from '@/app/lib/definitions'
import {State2, updateUser} from '@/app/lib/actions'
import { useFormState } from "react-dom";

export default function ProfileForm({
  userData
}: {
  userData: User;
}) {

  const initialState: State2 = { message: null, errors: {} };
  const updateProfileWithId = updateUser.bind(null, userData.id);
  const [state, formAction] = useFormState(updateProfileWithId, initialState);


  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

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
      const resizedImage = await resizeImage(file, 300, 400);
      const formData = new FormData();
      formData.append("file", resizedImage, file.name);


      const res = await axios.post(
        "http://localhost:3000/api/route",
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
    <div>
      <form action={formAction}>
        <fieldset>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {imageUrl && <NextImage src={imageUrl} width={300} height={400} alt="Uploaded Image" />}
        </fieldset>

        <fieldset>
          <input id="userName" name="userName" type="text" defaultValue={userData.name}/>
          <label>Password<input name="userPassword" type="password" required/></label>
          <input name="userEmail" type="email" defaultValue={userData.email}/>
          <input name="userStory" type="area" defaultValue={userData.user_story}/>
          <input type="hidden" id="invisibleInput" name="userProfile" value={imageUrl}/>
        </fieldset>

        <button type="submit">Edit User</button>
      </form>
      
    </div>
  ); 
}
