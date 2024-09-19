'use client'

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { fetchPosts } from '@/lib/features/post/postSlice';
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();
  let posts = useAppSelector(state => state.post.value);
  
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className='container mx-auto mt-2'>
        <div className="overflow-x-auto">
            <div className='flex items-center justify-between'>
                <Link href="/post/add">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-3">
                        Add Post
                    </button>
                </Link>
            </div>
            <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border border-gray-200 text-left">#</th>
                        <th className="px-4 py-2 border border-gray-200 text-left">Title</th>
                        <th className="px-4 py-2 border border-gray-200 text-left">Body</th>
                        <th className="px-4 py-2 border border-gray-200 text-left">User Id</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(task => (
                        <tr key={task.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border border-gray-200">{task.id}</td>
                            <td className="px-4 py-2 border border-gray-200">{task.title}</td>
                            <td className="px-4 py-2 border border-gray-200">{task.body}</td>
                            <td className="px-4 py-2 border border-gray-200">{task.userId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
</div>
  );
}
