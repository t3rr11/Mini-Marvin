import fs from 'fs';
import Config from './config.json';
import * as ManifestHandler from './src/manifest.handler';
import * as Clan from './src/clan.handler';
import * as Util from './src/util.handler';
import * as Logger from './src/log.handler';
import { Client, GatewayIntentBits } from 'discord.js';
import { createMessageHandler } from './src/message.handler';
import { IClanConfig } from './interfaces/Config.interface';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

let manifestCheck: NodeJS.Timer | null = null;

async function initalChecks() {
  if (!fs.existsSync('./members')) {
    fs.mkdirSync('./members');
  }

  if (!fs.existsSync('./manifest')) {
    fs.mkdirSync('./manifest');
  }

  if (!Config) {
    throw new Error('Missing config.json file');
  }
}

client.on('ready', async () => {
  Logger.saveLog(`Bot is ready`);
  run();
});

async function test() {
  Logger.saveLog(`Testing`);
  const memberFileLocation = `./members/Terrii#5043.json`;
  const member = JSON.parse(await fs.promises.readFile(memberFileLocation, { encoding: 'utf-8' }));
  const memberClanConfig: IClanConfig = Config.clans.find((e) => e.id.toString() === member.groupId);
  createMessageHandler({ client, member, config: Config, clan: memberClanConfig, type: 'GuardianRank' });
}

async function run() {
  await initalChecks();
  await ManifestHandler.checkManifestVersion();
  Logger.saveLog(`Manifest is mounted`);

  manifestCheck = setInterval(async () => {
    Logger.saveLog(`Checking for new manifest`);
    await ManifestHandler.checkManifestVersion();
  }, 10 * 60 * 1000);

  if (Config.testing) {
    setInterval(async () => {
      test();
    }, 10000);
  }

  const groups = Config.clans;

  Logger.saveLog(`Starting the scan loop`);
  while (true) {
    try {
      await Clan.processGroups(client, groups);
    } catch (error) {
      Logger.saveError(`Error processing groups`, error);
    }

    Logger.saveLog(`Finished scanning, restarting...`);
    await Util.sleep(1000);
  }
}

client.login(Config.token);
