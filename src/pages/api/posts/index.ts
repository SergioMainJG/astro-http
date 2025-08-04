import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

const createResponse = (body: any, status: number) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET: APIRoute = async ({ params, request }) => {

  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    const post = await getEntry('blog', id);
    return post
      ? createResponse(post, 200)
      : createResponse({ message: 'Post not found' }, 404);
  }


  const posts = await getCollection('blog');
  return createResponse(posts, 201);
};