import { FastifyInstance } from "fastify";
import { InstanceInfoRouter } from "./info";
import { ChannelRouter } from "./channel";
import { MediaRouter } from "./media";
import { UserRouter } from "./user";
import { GuildRouter } from "./guild";
import jwt from "jsonwebtoken";
import { logger } from "../main";
import { Login } from "../controllers/auth/login";

export class InvalidTokenError extends Error {}

export async function verifyToken(
  token: string
): Promise<string | InvalidTokenError> {
  try {
    return jwt.sign(token, "12");
  } catch (e) {
    logger.error("authencation failed");
    return new InvalidTokenError();
  }
}

export async function MainRouting(server: FastifyInstance) {
  // /version /server-info
  await InstanceInfoRouter(server);
  await ChannelRouter(server);
  await MediaRouter(server);
  await UserRouter(server);
  await GuildRouter(server);

  await Login(server);
}
