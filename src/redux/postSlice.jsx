import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost,editPost,deletePost,getCertainPost,getPosts } from "../Components/PostRequestsFirebase";

const postSlice = createSlice({
  name: "posts",
  initialState: { list: [], loading: false ,error:null,SelectedPost:null},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
        

      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      })

      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      .addCase(getCertainPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCertainPost.fulfilled, (state, action) => {
        state.loading = false;
        state.SelectedPost = action.payload;
      })
      .addCase(getCertainPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default postSlice.reducer;
