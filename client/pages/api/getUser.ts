// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  User,
  UserRequest,
  UserResponse,
} from "../../../server/generated/user_pb";
import { credentials, ServiceError } from "@grpc/grpc-js";
import { UserManageClient } from "../../../server/generated/user_grpc_pb";
import { apiClient } from "../../lib";

// export type UserApiResponse =
//   | { ok: true; user: UserResponse.AsObject["user"] }
//   | { ok: false; error: ServiceError };

export default async function handler(
  nextReq: NextApiRequest,
  nextRes: NextApiResponse
) {
  const { id } = JSON.parse(nextReq.body);
  console.log("id:", id);
  const userId = Array.isArray(id) ? Number(id[0]) : Number(id);
  console.log("userId:", userId);
  // const userRequest = new UserRequest();
  // userRequest.setId(id);
  // apiClient.getUser(userRequest, (error, response) => {
  //   if (error) {
  //     nextRes.status(500).json({ ok: false, error });
  //   } else {
  //     const { user } = response.toObject();
  //     nextRes.status(200).json({ ok: true, user });
  //   }
  // });

  // FIXME: TypeError: Channel credentials must be a ChannelCredentials object
  const response = await new Promise((resolve, reject) => {
    const userRequest = new UserRequest();
    userRequest.setId(userId);
    apiClient.getUser(userRequest, (error, response) => {
      console.log(error);
      console.log(response);
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
