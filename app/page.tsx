export default async function Home() {

  const count = 100
  const tags = new Array(count).fill(0).map((_, i) => `tag-${i}`);
  const res = await fetch('https://dummyjson.com/posts', {
    next: {
      revalidate: 10,
      tags,
    }
  });

  const { posts } = await res.json();

  return (
    <>
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
