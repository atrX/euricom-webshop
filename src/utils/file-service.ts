export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch("/api/file", {
    method: "POST",
    body,
  });
  const { href } = (await response.json()) as { href: string };
  return href;
}
