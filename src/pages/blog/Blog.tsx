import { CreatePost, PostList } from 'pages/blog/components'

export default function Blog() {
  return (
    <div className='p-5'>
      <CreatePost />
      <PostList />
    </div>
  )
}
