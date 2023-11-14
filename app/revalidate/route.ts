import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export function GET(req: Request) {
  revalidateTag('page')
  return new Response('OK')

}