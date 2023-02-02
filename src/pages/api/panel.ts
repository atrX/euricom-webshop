import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { renderTrpcPanel } from "trpc-panel";
import { env } from "../../env/client.mjs";
import { appRouter } from "../../server/api/root";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get((_, res) => {
  res.status(200).send(
    renderTrpcPanel(appRouter, {
      url: `${env.NEXT_PUBLIC_API_URL}/trpc`,
      transformer: "superjson",
    })
  );
});

export default handler;
