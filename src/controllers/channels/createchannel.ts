import { FastifyReply, FastifyRequest } from "fastify";
import { channels, channel } from "../../models/channel";
import { channelCreated } from "../notificationcontroller";
import { logger } from "../../main";
import { GuildIdParam } from "../../types/guild_types";
import { CreateChannel } from "../../types/channel_types";
import { Server } from "https";
import { IncomingMessage } from "http";

export async function createChannel(
  req: FastifyRequest<
    { Params: GuildIdParam; Body: CreateChannel },
    Server,
    IncomingMessage
  >,
  res: FastifyReply
) {
  const RequestBody = req.body;
  const guild_id = req.params.guildId;

  const channel: channel = {
    channel_name: RequestBody.channel_name,
    channel_topics: RequestBody.channel_topics,
    channel_type: RequestBody.channel_type,
    channel_position: RequestBody.channel_position,
  };

  await channels
    .create(channel, guild_id)
    .then((ch) => {
      logger.info("Channel created");
      channelCreated(ch.id);
      res.status(201).send(ch);
    })
    .catch((e) => {
      logger.error(e);
      res.status(400).send("Bad Request");
    });
}
