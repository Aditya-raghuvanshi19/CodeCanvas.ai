"use client"
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

// ✅ use official uuid package
import { v4 as uuidv4 } from 'uuid';

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

            // 🔑 Get signature from backend
            const authResponse = await fetch("/api/imagekit-auth");
            const { token, expire, signature } = await authResponse.json();

            const formData = new FormData();
            formData.append("file", file);
            formData.append("fileName", Date.now() + ".png");
            formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
            formData.append("signature", signature);
            formData.append("expire", expire);
            formData.append("token", token);

            // ✅ Upload directly from browser
            const uploadResponse = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
                method: "POST",
                body: formData,
            });

            if (!uploadResponse.ok) {
                toast.error("Image upload failed!");
                setLoading(false);
                return;
            }

            const uploadResult = await uploadResponse.json();
            const imageUrl = uploadResult.url;

            toast.success("Image uploaded successfully!");

            const uid = uuidv4();

            // Save Info To Database
            const result = await axios.post('/api/wireframe-to-code', {
                uid,
                description,
                imageUrl,
                model,
                email: user?.email,
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
        <div className='mt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {!previewUrl ? (
                    <div className='p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center'>
                        <CloudUpload className='h-10 w-10 text-primary' />
                        <h2 className='font-bold text-lg'>Upload Image</h2>
                        <p className='text-gray-400 mt-2'>Click button to select a wireframe image</p>

                        <div className='p-5 border border-dashed w-full flex mt-4 justify-center'>
                            <label htmlFor='imageSelect'>
                                <h2 className='p-2 bg-gray-100 font-bold text-black rounded-md px-5'>
                                    Select Image
                                </h2>
                            </label>
                        </div>
                        <input
                            type="file"
                            id='imageSelect'
                            className='hidden'
                            accept="image/*"
                            onChange={OnImageSelect}
                        />
                    </div>
                ) : (
                    <div className='p-5 border border-dashed relative'>
                        <Image
                            src={previewUrl}
                            alt='preview'
                            width={500}
                            height={500}
                            className='w-full h-[250px] object-contain'
                        />
                        <X
                            className='absolute top-2 right-2 cursor-pointer'
                            onClick={() => {
                                setPreviewUrl(null);
                                setFile(null);
                            }}
                        />
                    </div>
                )}

                <div className='p-7 border shadow-md rounded-lg'>
                    <h2 className='font-bold text-lg'>Select AI Model</h2>
                    <Select onValueChange={(value) => setModel(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select AI Model" />
                        </SelectTrigger>
                        <SelectContent>
                            {Constants?.AiModelList.map((model, index) => (
                                <SelectItem value={model.name} key={index}>
                                    <div className='flex items-center gap-2'>
                                        <Image src={model.icon} alt={model.name} width={25} height={25} />
                                        <h2>{model.name}</h2>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <h2 className='font-bold text-lg mt-7'>Enter Description about your webpage</h2>
                    <Textarea
                        onChange={(event) => setDescription(event.target.value)}
                        className='mt-3 h-[150px]'
                        placeholder='Write about your web page'
                    />
                </div>
            </div>

            <div className='mt-10 flex items-center justify-center'>
                <Button onClick={OnConverToCodeButtonClick} disabled={loading}>
                    {loading ? <Loader2Icon className='animate-spin' /> : <WandSparkles />}
                    Convert to Code
                </Button>
            </div>
        </div>
    )
}

export default ImageUpload
