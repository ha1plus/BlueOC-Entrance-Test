'use client';

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import { addPost } from '@/lib/features/post/postSlice';
import { useAppDispatch } from '@/lib/hook';

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type Inputs = {
    title: string
    body: string
}

export default function PostForm() {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const newPost = {
                userId: Math.ceil(Math.random() * 10),
                id: Math.floor(Math.random() * 1000),
                title: data.title,
                body: data.body,
            };
            await dispatch(addPost(newPost)).unwrap();
            reset(); 
        } catch (error) {
            console.error('Failed to add task', error);
        }
    };
    return (
        <div className='container mx-auto mt-2'>
            <div className='flex items-center justify-between'>
                <Link href="/">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-3">
                        Back
                    </button>
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        type="text"
                        placeholder="Title"
                        {...register("title", { required: true })} 
                    />
                    {errors.title?.type === "required" && (
                        <p className='text-red-500'>Title is required</p>
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
                        Body
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="body"
                        placeholder="Body"
                        {...register("body", { required: true })} 
                    />
                     {errors.body?.type === "required" && (
                        <p className='text-red-500'>Body is required</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                        Add Post
                    </button>
                </div>
            </form>
        </div>
    );
}
