import { get, ref, push, remove, update } from "firebase/database";
import { realTimeDataBase } from "../firebase";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const addPost = createAsyncThunk("posts/addPost", async (post) => {
    const newRef = push(ref(realTimeDataBase, "posts"));
    await update(newRef, post);
    return { id: newRef.key, ...post };
  });
  
  export const getPosts = createAsyncThunk("posts/getPosts", async (post) => {
    const snapShot = await get(ref(realTimeDataBase, "posts"));
    const posts = snapShot.val(); //get  object which contain all posts in db as json data
    if (!posts) return [];
    else return Object.entries(posts).map(([id, val]) => ({ id, ...val }));
  });
  
  export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
    await remove(ref(realTimeDataBase, `posts/${id}`));
    return id;
  });
  
  export const editPost = createAsyncThunk(
    "posts/editPost",
    async ({ id, updatedPost }) => {
      await update(ref(realTimeDataBase, `posts/${id}`), updatedPost);
      return { id, ...updatedPost };
    }
  );
  
  export const getCertainPost=createAsyncThunk("posts/getCertainPost",
      async (id) => {
          const snapShot= await get(ref(realTimeDataBase,`posts/${id}`));
          if(snapShot.exists()){
              return{id,...snapShot.val()}
          }
          else {
              throw new Error("Post not found")
          }
      }
  )


