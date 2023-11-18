'use server'

import s from './page.module.css'
import { apiQuery } from 'next-dato-utils'
import { StartDocument } from '@/graphql';
import { Image } from 'react-datocms';
import Link from 'next/link';

export default async function Home() {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, { tags: ['start'] });

  return (
    <>
      <h1>{start?.headline}</h1>
      {start?.posts.map(post => (
        <div className={s.post} key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <h3>
              {post.title}
            </h3>
          </Link>
        </div>
      ))}
      {start?.posts.length === 0 && 'No posts yet...'}
      <br />
      <a href="/revalidate?tags=start" target="_blank">Revalidate</a>
    </>
  )
}
