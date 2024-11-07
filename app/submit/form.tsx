"use client";
import "./submit.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import toast from "react-hot-toast";

const schema = z.object({
  recipient: z
    .string()
    .min(1, { message: "Recipient name is required" })
    .max(50, { message: "Recipient name must be at least 50 characters" }),
  message: z.string().min(1, { message: "Please enter the message" }),
  image: z.instanceof(File).optional(),
});

interface FormValues {
  recipient: string; // Field untuk nama penerima
  message: string; // Field untuk pesan
  image?: File | null; // Field untuk gambar, opsional
}

export function Form() {
  const [imageURL, setImageURL] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      recipient: "",
      message: "",
      image: undefined,
    },
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", data.image);
      formData.append("upload_preset", "sendthepict");

      // Upload gambar ke Cloudinary
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error uploading image:", errorData);
        throw new Error("Failed to upload image");
      }

      const uploadData = await response.json();

      // Kirim data form ke API untuk disimpan dalam database
      const submitResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient: data.recipient,
          message: data.message,
          urlImage: uploadData.secure_url,
        }),
      });

      if (!submitResponse.ok) {
        throw new Error("Failed to submit form data");
      }

      // Jika berhasil, tampilkan notifikasi sukses
      toast.success("Message submitted successfully!");
      reset();
      setImageURL("");
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("There was an error submitting your message.");
    } finally {
      // Ubah loading menjadi false di akhir proses
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form id="messageForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="recipientName">Recipient Name</label>
          <Controller
            control={control}
            name="recipient"
            render={({ field }) => (
              <input
                {...field}
                type="text"
                id="recipient"
                placeholder="Enter recipient's name"
              />
            )}
          />
          {errors.recipient && (
            <p className="error">{errors.recipient.message as string}</p>
          )}
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
          {errors.message && (
            <p className="error">{errors.message.message as string}</p>
          )}
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
          {loading ? <div className="spinner"></div> : "Submit"}
        </button>
      </form>
    </div>
  );
}
