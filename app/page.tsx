'use server'

import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils'
import { StartDocument } from '@/graphql';
import { Image } from 'react-datocms';
import Link from 'next/link';

export default async function Home() {

  const tags = new Array(100).fill(0).map(tag => `tag-${Math.floor(Math.random() * 10000)}`);
  console.log('tags', tags.length, tags.join('').length)
  const { start, draftUrl } = await apiQuery<StartQuery, StartQueryVariables>(StartDocument, {
    revalidate: 10,
    generateTags: false,
    tags: [...tags],
    logs: true
  });

  return (
    <>
      <h1>Start</h1>

      {start?.posts.length === 0 && 'No posts yet...'}

    </>
  )
}
