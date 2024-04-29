import { createApi } from '@reduxjs/toolkit/query/react'

import { blogAPI } from 'api'
import { axiosBaseQuery } from 'utils'
import { Post } from 'types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi', // Tên field trong Redux state
  tagTypes: ['Posts'], // Những kiểu tag cho phép dùng trong blogApi
  keepUnusedDataFor: 10, // Giữ data trong 10s sẽ xóa (mặc định 60s)
  baseQuery: axiosBaseQuery(),
  endpoints: (build) => ({
    // Generic type theo thứ tự là kiểu response trả về và argument
    getPosts: build.query<Post[], void>({
      queryFn: () => blogAPI.getAll(),
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }

        return [{ type: 'Posts', id: 'LIST' }]
      }
    }),

    addPost: build.mutation<Post, Omit<Post, 'id'>>({
      queryFn: (data) => blogAPI.add(data),
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Posts', id: 'LIST' }])
    }),

    getPost: build.query<Post, string>({
      queryFn: (id) => blogAPI.get(id)
    }),

    updatePost: build.mutation<Post, { id: string; body: Post }>({
      queryFn: (data) => blogAPI.update(data),
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts', id: data.id }])
    }),

    deletePost: build.mutation<{}, string>({
      queryFn: (id) => blogAPI.delete(id),
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation, useGetPostQuery, useUpdatePostMutation, useDeletePostMutation } =
  blogApi
