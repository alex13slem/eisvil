import type { Context } from "@netlify/functions";

export function post<T>(fn: (data: T) => Promise<Response>) {
  return async (request: Request, context: Context) => {
    try {
      if (request.method.toUpperCase() !== "POST") {
        return Response.json("Method Not Allowed", {
          status: 405,
          statusText: "Method Not Allowed",
        });
      }
      const data = await request.json();

      await fn(data);
    } catch (error: any) {
      if (error.status) {
        const { status, statusText } = error;
        return Response.json(statusText, { status, statusText });
      }

      return Response.json(error.message || error, {
        status: 500,
        statusText: error.message || error,
      });
    }
  };
}
