import fs from 'fs';
import Config from './config.json';
import * as ManifestHandler from './src/manifest.handler';
import * as Clan from './src/clan.handler';
import * as Util from './src/util.handler';
import * as Logger from './src/log.handler';
import { Client, GatewayIntentBits } from 'discord.js';

export const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

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

async function run() {
  await initalChecks();
  await ManifestHandler.checkManifestVersion();
  Logger.saveLog(`Manifest is mounted`);
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
