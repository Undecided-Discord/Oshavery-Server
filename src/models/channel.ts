import { PrismaClient } from "@prisma/client";
import { logger } from "../main";

const prisma = new PrismaClient();

// post時のbodyの型
// /guilds/:guildId/channels
// ToDo: Prismaの型を使う
export type channel = {
  channel_name: string;
  channel_topics: string;
  channel_type: string;
  channel_position: number;
};

// ギルドが存在しないときに返すエラーを定義
export class GuildNotFoundError extends Error {}

// ToDo: 命名がややこしいので要検討
export const channels = {
  // GET
  // /guilds/:guildId/channels
  async get(guild_id: string) {
    let res;

    try {
      res = await prisma.channels.findMany({
        where: {
          guildId: guild_id,
        },
      });
    } catch (e) {
      logger.error(e);
    }

    // エラー時には何も返ってこないのでその時はエラーを投げる
    if (!res) {
      throw new GuildNotFoundError();
    } else {
      return res;
    }
  },

  // 現在は使っていない関数

  // async getOneChannel(id: string) {
  //   return await prisma.channels.findUnique({
  //     where: {
  //       id: id
  //     }
  //   })
  // },

  // POST
  // /guilds/:guildId/channel
  async create(data: {
    name: string;
    topics: string;
    type: string;
    position: number;
    guildId: string;
  }) {
    // チャンネルを先に作る
    const res = await prisma.channels.create({
      data: {
        latest_message_id: "",
        guilds: { connect: { id: data.guildId } },
        name: data.name,
        topic: data.topics,
        type: data.type,
        position: data.position,
      },
    });

    // チャンネルの作成通知のシステムメッセージを登録する
    const systemmessage = await prisma.messages.create({
      data: {
        content: `チャンネルが作成されました ここが${res.name}のはじまりです`,
        ip: "SYSTEM",
        channels: { connect: { id: res.id } },
        user: { connect: { id: "00000000-0000-0000-0000-000000000000" } },
        // システムアカウントのIDは 00000000-0000-0000-0000-000000000000 で完全固定 (初期設定で自動生成されている
      },
    });

    // チャンネルの最新メッセージを更新
    await prisma.channels.update({
      where: {
        id: res.id,
      },
      data: {
        latest_message_id: systemmessage.id,
      },
    });

    return res;
  },
};
