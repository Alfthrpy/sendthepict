"use client";
import "./submit.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";


const schema = z.object({
  recipientName: z.string().min(1,{message:"Recipient name is required"}).max(50,{message:"Recipient name must be at least 50 characters"}),
  message: z.string().min(1,{message:"Please enter the message"}),
  image: z.instanceof(File), // File bisa kosong
});

export function Form() {
  const [imageURL, setImageURL] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const previewURL = URL.createObjectURL(file);
    setImageURL(previewURL); 


    setValue("image", file); 
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {

    const formData = new FormData();
    formData.append("file", data.image);
    formData.append("upload_preset", "sendthepict");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dvgaex1ox/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error uploading image:", errorData);
      return;
    }

    const uploadData = await response.json();

    // Kirim data form ke API untuk disimpan dalam database
    const submitResponse = await fetch("/api/upload-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipientName: data.recipientName,
        message: data.message,
        imageURL: uploadData.secure_url, 
      }),
    });

    if (submitResponse.ok) {
      alert("Message submitted successfully!");
      
      reset(); 
      setImageURL(""); 
    } else {
      alert("There was an error submitting your message.");
    }
  };

  return (
    <div className="form-container">
      <form id="messageForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="recipientName">Recipient Name</label>
          <Controller
            control={control}
            name="recipientName"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="recipientName"
                placeholder="Enter recipient's name"
              />
            )}
          />
          {errors.recipientName && <p className="error">{errors.recipientName.message as string}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <Controller
            control={control}
            name="message"
            render={({ field }) => (
              <textarea
                {...field}
                id="message"
                placeholder="Write your message here"
              ></textarea>
            )}
          />
          {errors.message && <p className="error">{errors.message.message as string}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/*" // Hanya menerima file gambar
            onChange={handleImageUpload}
          />
        </div>

        {imageURL && (
          <div className="preview">
            <Image src={imageURL} alt="Preview" width="500" height="500" />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
