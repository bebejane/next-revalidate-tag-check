'use server'

import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils'
import { StartDocument } from '@/graphql';
import { Image } from 'react-datocms';
import Link from 'next/link';

export default async function Home() {

  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
    revalidate: 10,
    tags: ['start']
  });

  return (
    <>
      <a href="/revalidate?tags=start" target="_blank">Revalidate</a>
      <br />
      <br />

      {start?.posts.map(post => (
        <div className={s.post} key={post.id}>
          <Link href={`/posts/${post.slug}`}>
            <h3>
              {post.title}
            </h3>
          </Link>
          {post?.image?.responsiveImage &&
            <Image
              data={post?.image?.responsiveImage}
              className={s.image}
              pictureClassName={s.picture}
            />
          }
        </div>
      ))}
      {start?.posts.length === 0 && 'No posts yet...'}

    </>
  )
}
