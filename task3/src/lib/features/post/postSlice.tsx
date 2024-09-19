import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useAxiosInstance from '@/tools/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostState {
  value: Post[];
}

const initialState: PostState = {
  value: [],
};

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.get<Post[]>('/posts');
    // console.log('API Response Data:', response.data); 
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch posts');
  }
});

export const addPost = createAsyncThunk('post/addPost', async (newPost: Post) => {
  const axiosInstance = useAxiosInstance();
  try {
    const response = await axiosInstance.post<Post>('/posts', newPost);
    // console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add task');
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
      // console.log('Redux State Update:', action.payload); 
      state.value = action.payload; 
    })
    .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
      // console.log('Redux State Update:', action.payload);
      state.value.push(action.payload);
      toast.success('Post added successfully');
    });
    
  },
});

export default postSlice.reducer;