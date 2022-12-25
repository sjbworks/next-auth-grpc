import { credentials } from "@grpc/grpc-js";
import { UserManageClient } from "../generated/user_grpc_pb";

const serverURL = "localhost:8000";
export const apiClient = new UserManageClient(
  serverURL,
  credentials.createInsecure()
);
