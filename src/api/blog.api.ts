import { Post } from 'types/blog.type'
import axiosClient from 'utils'

export const blogAPI = {
  getAll() {
    const url = '/posts'
    return axiosClient.get<Post[]>(url)
  },

  get(id: string) {
    const url = `/posts/${id}`
    return axiosClient.get<Post>(url)
  },

  add(data: Omit<Post, 'id'>) {
    const url = '/posts'
    return axiosClient.post<Post>(url, data)
  },

  update(data: { id: string; body: Post }) {
    const url = `/posts/${data.id}`
    return axiosClient.put<Post>(url, data.body)
  },

  delete(id: string) {
    const url = `/posts/${id}`
    return axiosClient.delete<{}>(url)
  }
}
