'use server'

import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils'
import { StartDocument } from '@/graphql';
import { Image } from 'react-datocms';
import Link from 'next/link';

export default async function Home() {

  const tags = new Array(70).fill(0).map(tag => `tag-${Math.floor(Math.random() * 10000)}`);
  console.log('tags', tags.length, tags.join('').length)
  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
    revalidate: 10,
    generateTags: false,
    tags: [...tags],
    logs: true
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
