// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../generated/user_pb";
import { apiClient } from "../../../lib";

export default async function handler(
  nextReq: NextApiRequest,
  nextRes: NextApiResponse
) {
  const {
    query: { id },
  } = nextReq;
  const userId = Array.isArray(id) ? id[0] : id || "";

  const response = await new Promise((resolve, reject) => {
    // TODO: Fix getUser args
    apiClient.getUser({ id: userId }, (error, response) => {
      if (error) {
        console.error("getUser error:", error);
        reject({
          code: error?.code || 500,
          message: error?.message || "error",
        });
      }
      return resolve(response?.toObject);
    });
  });
  nextRes.status(200).json(response);
}
