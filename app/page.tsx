'use server'

import styles from './page.module.css'

export default async function Home() {

  const res = await fetch('https://random-data-api.com/api/v2/users?response_type=json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: {
      revalidate: 120,
      tags: ['page']
    }
  })

  const data = await res.json()

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {data.username}
      </div>
    </main>
  )
}
