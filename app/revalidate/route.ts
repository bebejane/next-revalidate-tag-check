import { revalidateTag, revalidatePath } from 'next/cache';

export async function GET(req: Request) {

  const searchParams = new URLSearchParams(req.url.split('?')[1])
  const tag = searchParams.get('tag') as string ?? 'home'
  console.log('revalidate tag', tag)
  revalidateTag(tag)
  return new Response(`ok ${tag}`)
}