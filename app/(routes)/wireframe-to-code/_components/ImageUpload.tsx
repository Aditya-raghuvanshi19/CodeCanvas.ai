"use client";

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CloudUpload, Loader2Icon, WandSparkles, X } from 'lucide-react'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { useAuthContext } from '@/app/provider'
import { useRouter } from 'next/navigation'
import Constants from '@/data/Constants'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'
import { motion } from "framer-motion"

function ImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [model, setModel] = useState<string>()
  const [description, setDescription] = useState<string>()
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFile(files[0]);
      setPreviewUrl(imageUrl);
    }
  }

  const OnConverToCodeButtonClick = async () => {
    if (!file || !model || !description) {
      toast.error("Please select all fields before continuing.");
      return;
    }

    try {
      setLoading(true);
      const authResponse = await fetch("/api/imagekit-auth");
      const { token, expire, signature } = await authResponse.json();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", Date.now() + ".png");
      formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
      formData.append("signature", signature);
      formData.append("expire", expire.toString());
      formData.append("token", token);

      const uploadResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const err = await uploadResponse.json();
        console.error("Upload failed:", err);
        toast.error(err?.message || "Image upload failed!");
        setLoading(false);
        return;
      }

      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult.url;

      toast.success("Image uploaded successfully!");
      const uid = uuidv4();

      const result = await axios.post('/api/wireframe-to-code', {
            uid: uid,
            description: description,
            imageUrl: imageUrl,
            model: model,
            email: user?.email
      });

      if (result.data?.error) {
        toast.error("Not enough credits!");
        setLoading(false);
        return;
      }

      toast.success("Image uploaded & code generated!");
      router.push('/view-code/' + uid);

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mt-16">
      {/* Floating 3D Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full bg-indigo-500/20 blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {/* Upload Section */}
        {!previewUrl ? (
          <motion.div
            whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-7 border-2 border-dashed rounded-2xl shadow-xl flex flex-col items-center justify-center bg-white/5 backdrop-blur-lg"
          >
            <CloudUpload className="h-12 w-12 text-blue-400 mb-3" />
            <h2 className="font-bold text-xl">Upload Image</h2>
            <p className="text-gray-400 mt-1 text-sm">Select a wireframe to start</p>

            <div className="mt-5">
              <label
                htmlFor="imageSelect"
                className="cursor-pointer px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-md font-medium shadow hover:scale-105 transition"
              >
                Choose File
              </label>
              <input
                type="file"
                id="imageSelect"
                className="hidden"
                accept="image/*"
                onChange={OnImageSelect}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-5 rounded-2xl shadow-lg border relative bg-white/5 backdrop-blur-md"
          >
            <Image
              src={previewUrl}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[260px] object-contain rounded-lg"
            />
            <X
              className="absolute top-3 right-3 cursor-pointer bg-gray-800/60 rounded-full p-1 text-white"
              onClick={() => {
                setPreviewUrl(null);
                setFile(null);
              }}
            />
          </motion.div>
        )}

        {/* Options Section */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="p-7 rounded-2xl border shadow-lg bg-white/5 backdrop-blur-md"
        >
          <h2 className="font-bold text-lg mb-4">Select AI Model</h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full bg-white/10">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {Constants?.AiModelList.map((model, index) => (
                <SelectItem value={model.name} key={index}>
                  <div className="flex items-center gap-2">
                    <Image src={model.icon} alt={model.name} width={24} height={24} />
                    <span>{model.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">Project Description</h2>
          <Textarea
            onChange={(event) => setDescription(event.target.value)}
            className="mt-3 h-[150px] bg-white/10"
            placeholder="Describe your webpage idea..."
          />
        </motion.div>
      </motion.div>

      {/* CTA Button */}
      <div className="mt-10 flex items-center justify-center">
        <Button
          onClick={OnConverToCodeButtonClick}
          disabled={loading}
          className="px-6 py-3 rounded-lg text-white font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:scale-105 transition"
        >
          {loading ? <Loader2Icon className="animate-spin" /> : <WandSparkles />}
          <span className="ml-2">{loading ? "Processing..." : "Convert to Code"}</span>
        </Button>
      </div>
    </div>
  )
}

export default ImageUpload
