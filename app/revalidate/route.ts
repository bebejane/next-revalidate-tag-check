import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export function GET(req: Request) {
  const tags = new URLSearchParams(req.url.split('?')[1]).get('tags')?.split(',') ?? ['page']
  tags.forEach(tag => revalidateTag(tag))

  return new Response(`revalidate: ${tags.join(',')}`)

}