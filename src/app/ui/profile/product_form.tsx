"use client";

import { useState, ChangeEvent } from "react";
import axios from "axios";
import NextImage from "next/image";
import {Products} from '@/app/lib/definitions'
import {State3, updateProduct} from '@/app/lib/actions'
import { useFormState } from "react-dom";

export default function ProductForm({
  productData
}: {
  productData: Products;
}) {

  const initialState: State3 = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, productData.id);
  const [state, formAction] = useFormState(updateProductWithId, initialState);

  let firstImage = productData.image_url;
  if (!firstImage.startsWith("https")){
    if (firstImage == null || firstImage == ""){
    firstImage = "/bob_profile.jpg";
  }else{
    firstImage = `/${firstImage}`
  }

  }
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(`${firstImage}`);
  const [imageUrl2, setImageUrl2] = useState<string>("");

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
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          {imageUrl && <NextImage src={imageUrl} width={800} height={600} alt="Uploaded Image" />}
          {imageUrl2 && <NextImage src={imageUrl2} width={400} height={300} alt="Uploaded Image" />}
        </fieldset>

        <fieldset>
          <input name="productName" type="text" defaultValue={productData.product_name}/>
          <input name="category" type="text" defaultValue={productData.category}/>
          <input name="price" type="number" defaultValue={productData.price}/>
          <input type="hidden" id="invisibleInput" name="product_image" value={imageUrl}/>
          <input type="hidden" id="invisibleInput" name="product_image_small" value={imageUrl2}/>
          <input name="description" type="text" defaultValue={productData.description}/>
          <input name="stock" type="number" defaultValue={productData.stock}/>
        </fieldset>

        <button type="submit">Edit Product</button>
      </form>
      
    </div>
  ); 
}
