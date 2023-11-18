'use server'

import { cache } from 'react'
import styles from './page.module.css'

const getData = cache(async (): Promise<any> => {
  const res = await fetch('https://random-data-api.com/api/v2/users?response_type=json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: {
      revalidate: 120,
      tags: ['page', 'test', 'hello']
    }
  })
  return res.json()
})

export default async function Home() {

  const data = await getData()

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {data.username}
      </div>
      <a href="/revalidate?tags=page" target="_blank">Revalidate</a>
    </main>
  )
}
