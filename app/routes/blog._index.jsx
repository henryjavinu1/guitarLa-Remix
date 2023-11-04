import { useLoaderData } from '@remix-run/react'
import {getPost} from '~/models/posts.server'
import ListadoPosts from '../components/listado-posts'

export function meta() {
  return [{
    title: 'GuitarLA - Nuestro blog',
    description: 'GuitarLA - Nuestra blog'
  }]
}
export async function loader(){
  const posts = await getPost()
  return posts.data
}
function Blog() {
  const posts = useLoaderData()
  return (
      <ListadoPosts
        posts={posts}
      />
  )
}

export default Blog