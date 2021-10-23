import fastify, { FastifyInstance } from "fastify";
import Log4js from "log4js";
import chalk from "chalk";
import { MainRouting } from "./routes/main.js";
import { IncomingMessage, Server, ServerResponse } from "http";
import { loadConfig } from "./config/load.js";

export const server: FastifyInstance<Server, IncomingMessage, ServerResponse> =
  fastify({
    logger: true,
  });

const { GIT_COMMIT_HASH } = process.env;
Log4js.configure("log-config.json");
export const logger = Log4js.getLogger("system");
export const Config = loadConfig();
logger.debug(Config + "123");
MainRouting(server);

console.log(
  chalk.red("Now Working On ") +
    chalk.red.bold("*DEVELOP MODE*") +
    chalk.red(". Server ") +
    chalk.red.bold("*WILL NOT* ask for an authentication token.")
);

server.listen(Config.port, async (e) => {
  console.log(
    chalk.red("░█████╗") +
      chalk.green("░░██████╗") +
      chalk.yellow("██╗░░██╗") +
      chalk.blue("░█████╗") +
      chalk.magenta("░██╗░░░██╗") +
      chalk.cyan("███████╗") +
      chalk.black("██████") +
      chalk.white("╗░██╗░░░██╗")
  );
  console.log(
    chalk.red("██╔══██╗") +
      chalk.green("██╔════╝") +
      chalk.yellow("██║░░██║") +
      chalk.blue("██╔══██╗") +
      chalk.magenta("██║░░░██║") +
      chalk.cyan("██╔════╝") +
      chalk.black("██") +
      chalk.white("╔══") +
      chalk.black("██") +
      chalk.white("╗╚██╗░██╔╝")
  );
  console.log(
    chalk.red("██║░░██║") +
      chalk.green("╚█████╗") +
      chalk.yellow("░███████║") +
      chalk.blue("███████║") +
      chalk.magenta("╚██╗░██╔╝") +
      chalk.cyan("█████╗") +
      chalk.black("░░██████") +
      chalk.white("╔╝░╚████╔╝░")
  );
  console.log(
    chalk.red("██║░░██║") +
      chalk.green("░╚═══██╗") +
      chalk.yellow("██╔══██║") +
      chalk.blue("██╔══██║") +
      chalk.magenta("░╚████╔╝") +
      chalk.cyan("░██╔══╝░░") +
      chalk.black("██") +
      chalk.white("╔══") +
      chalk.black("██") +
      chalk.white("╗░░╚██╔╝░░")
  );
  console.log(
    chalk.red("╚█████╔╝") +
      chalk.green("██████╔╝") +
      chalk.yellow("██║░░██║") +
      chalk.blue("██║░░██║") +
      chalk.magenta("░░╚██╔╝░░") +
      chalk.cyan("███████╗") +
      chalk.black("██") +
      chalk.white("║") +
      chalk.black("░░██") +
      chalk.white("║░░░██║░░░")
  );
  console.log(
    chalk.red("░╚════╝░") +
      chalk.green("╚═════╝░") +
      chalk.yellow("╚═╝░░╚═╝") +
      chalk.blue("╚═╝░░╚═╝") +
      chalk.magenta("░░░╚═╝░░░") +
      chalk.cyan("╚══════╝") +
      chalk.white("╚═╝") +
      chalk.black("░░") +
      chalk.white("╚═╝░░░╚═╝░░░")
  );

  console.log(
    `\nOshavery(alpha) Revision ${GIT_COMMIT_HASH}\n(c) 2021 Oshavery Developers\nWorks on port: ${Config.port}`
  );
  if (e) {
    logger.fatal(e);
  }
});
