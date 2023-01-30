import { env } from "../env/client.mjs";

export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/file`, {
    method: "POST",
    body,
  });
  const { href } = (await response.json()) as { href: string };
  return href;
}
