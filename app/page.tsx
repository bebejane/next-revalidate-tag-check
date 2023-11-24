'use server'

import s from './page.module.scss'
import { apiQuery } from 'next-dato-utils'
import { StartDocument } from '@/graphql';
import { Image } from 'react-datocms';
import Link from 'next/link';

export default async function Home() {

  const tags = new Array(100).fill(0).map(tag => `tag-${Math.floor(Math.random() * 10000)}`);
  console.log('tags', tags.length, tags.join('').length)
  const res = await fetch('https://dummyjson.com/posts', {
    next: {
      revalidate: 10,
      tags,
    }
  });

  return (
    <>
      <h1>Start</h1>



    </>
  )
}
