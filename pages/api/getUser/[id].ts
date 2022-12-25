// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User, UserRequest } from "../../../generated/user_pb";
import { apiClient } from "../../../lib";

export default async function handler(
  nextReq: NextApiRequest,
  nextRes: NextApiResponse
) {
  const {
    query: { id },
  } = nextReq;
  console.log(id);
  const userId = Array.isArray(id) ? Number(id[0]) : Number(id);

  const response = await new Promise((resolve, reject) => {
    // TODO: Fix getUser args
    const userRequest = new UserRequest();
    userRequest.setId(userId);
    apiClient.getUser(userRequest, (error, response) => {
      if (error) {
        console.error("getUser error:", error);
        reject({
          code: error?.code || 500,
          message: error?.message || "error",
        });
      }
      return resolve(response?.toObject());
    });
  });
  nextRes.status(200).json(response);
}
