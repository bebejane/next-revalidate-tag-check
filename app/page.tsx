export default async function Home() {

  const count = 200
  const tags = new Array(count).fill(0).map((_, i) => `tag-${i}`);
  const now = Date.now();
  const res = await fetch('https://dummyjson.com/posts', {
    next: {
      revalidate: 3600,
      tags,
    }
  });

  const { posts } = await res.json();

  return (
    <>
      <h1>Now: {now}</h1>
      <h1>Tags</h1>
      <ul>
        {tags.map(tag => <li key={tag}>{tag}</li>)}
      </ul>
      <h1>Posts</h1>
      <ul>
        {posts.map((post: any) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </>
  )
}
