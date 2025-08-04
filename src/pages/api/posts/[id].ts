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

export const GET: APIRoute = async ({ params, request, cookies }) => {

  const { id } = params;

  const post = await getEntry('blog', id as any);

  return !post
    ? createResponse({ message: 'Post not found' }, 404)
    : createResponse(post, 200);
};

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return createResponse(body, 201);
}
export const PUT: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return createResponse(body, 201);
}
export const PATCH: APIRoute = async ({ params, request }) => {
  const body = await request.json();

  return createResponse(body, 201);
}
export const DELETE: APIRoute = async ({ params, request }) => {
  const {id} = params;

  return createResponse({message: `${id} deleted`}, 201);
}
