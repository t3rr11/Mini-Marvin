import fs from 'fs';
import axios from 'axios';
import { ManifestVersionResponse } from '../interfaces/ManifestVersion.interface';
import { DestinyItemDefinitionLite, IManifest } from '../interfaces/Manifest.interface';
import Config from '../config.json';
import * as Logger from './log.handler';

const manifestLocation = './manifest';
const manifestVersionLocation = './manifest/version.json';
const manifestComponents = [
  'DestinyInventoryItemDefinition',
  'DestinyInventoryItemLiteDefinition',
  'DestinyRecordDefinition',
  'DestinyCollectibleDefinition',
  'DestinyPresentationNodeDefinition',
];
export const Manifest: Partial<IManifest> = {};

export let exoticWeapons: DestinyItemDefinitionLite[] = [];
export let exoticArmor: DestinyItemDefinitionLite[] = [];

export async function checkManifestVersion() {
  const currentManifest = await getManifestVersion();

  if (fs.existsSync(manifestVersionLocation)) {
    const oldManifest: ManifestVersionResponse = JSON.parse(
      await fs.promises.readFile(manifestVersionLocation, { encoding: 'utf-8' })
    );

    if (oldManifest.Response.version !== currentManifest.Response.version) {
      await getManifest(currentManifest);
    }
  } else {
    await getManifest(currentManifest);
  }

  if (Object.keys(Manifest).length === 0) {
    await loadManifest();
  }

  fs.writeFileSync(manifestVersionLocation, JSON.stringify(currentManifest, null, 2));
}

async function getManifestVersion(): Promise<ManifestVersionResponse> {
  try {
    const headers = {
      'X-API-Key': Config.bungieAPIKey,
    };
    const response = await axios.get(`https://www.bungie.net/Platform/Destiny2/Manifest`, { headers });
    const data: ManifestVersionResponse = await response.data;

    return data;
  } catch (error) {
    Logger.saveError(`Error getting manifest version`, error);
  }
}

async function getManifest(manifest: ManifestVersionResponse) {
  for (let comp of manifestComponents) {
    try {
      const headers = {
        'X-API-Key': Config.bungieAPIKey,
      };
      const response = await axios.get(
        `https://www.bungie.net${manifest.Response.jsonWorldComponentContentPaths.en[comp]}`,
        { headers }
      );
      const data = await response.data;

      fs.writeFileSync(`${manifestLocation}/${comp}.json`, JSON.stringify(data));

      // Save file
    } catch (error) {
      Logger.saveError(`Error getting manifest component: ${comp}`, error);
    }
  }
}

async function loadManifest() {
  let loadSuccessful = true;
  for (let comp of manifestComponents) {
    try {
      // Read file
      const fileContents = JSON.parse(
        await fs.promises.readFile(`${manifestLocation}/${comp}.json`, { encoding: 'utf-8' })
      );

      // Load file in to memory
      Manifest[comp] = fileContents;

      // Load exotic weapons and armor in to memory
      if (comp === 'DestinyInventoryItemLiteDefinition') {
        exoticWeapons = Object.values(Manifest.DestinyInventoryItemLiteDefinition).filter(
          (v) => v.summaryItemHash === 2673424576 && v.itemType !== 20 && v.collectibleHash
        );
        exoticArmor = Object.values(Manifest.DestinyInventoryItemLiteDefinition).filter(
          (v) => v.summaryItemHash === 715326750 && v.itemType !== 20 && v.collectibleHash
        );
      }
    } catch (error) {
      Logger.saveError(`Error loading manifest component: ${comp}`, error);
      loadSuccessful = false;
    }
  }

  if (!loadSuccessful) {
    Logger.saveError(
      'Failed to load one or more manifest files attempting to re-fetch',
      new Error('Failed to load one or more manifest files attempting to re-fetch')
    );

    const currentManifest = await getManifestVersion();
    await getManifest(currentManifest);
    await loadManifest();
  }
}
