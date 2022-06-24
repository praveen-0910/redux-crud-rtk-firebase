import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const blogsApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["blogs"],
  endpoints: (buidler) => ({
    getBlogs: buidler.query({
      async queryFn() {
        try {
          const blogRef = collection(db, "blogs");
          const querySnapshot = await getDocs(blogRef);
          let blogs = [];
          querySnapshot?.forEach((doc) => [
            blogs.push({
              id: doc.id,
              ...doc.data(),
            }),
          ]);
          return { data: blogs };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["blogs"],
    }),
    getSingleBlog: buidler.query({
      async queryFn(id) {
        try {
          const docRef = doc(db, "blogs", id);
          const snapshot = await getDoc(docRef);
          return { data: snapshot.data() };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["blogs"],
    }),
    addbBlog: buidler.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...data,
            timestamp: serverTimestamp(),
          });
        } catch (err) {
          return { error: err };
        }
        return { data: "ok" };
      },
      invalidatesTags: ["blogs"],
    }),
    deleteBlog: buidler.mutation({
      async queryFn(id) {
        try {
          await deleteDoc(doc(db, "blogs", id));
          return { data: "deleted" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["blogs"],
    }),
    updateBlog: buidler.mutation({
      async queryFn({ id, data }) {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: "updated" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useAddbBlogMutation,
  useDeleteBlogMutation,
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} = blogsApi;
