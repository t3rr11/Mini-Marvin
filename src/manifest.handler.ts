import fs from 'fs';
import axios from 'axios';
import { ManifestVersionResponse } from '../interfaces/ManifestVersion.interface';
import { IManifest } from '../interfaces/Manifest.interface';
import Config from '../config.json';

const manifestLocation = './manifest';
const manifestVersionLocation = './manifest/version.json';
const manifestComponents = [
  'DestinyInventoryItemLiteDefinition',
  'DestinyRecordDefinition',
  'DestinyCollectibleDefinition',
];
export const Manifest: Partial<IManifest> = {};

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
    console.error(`Error getting manifest version`, error);
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
      console.error(`Error getting manifest component: ${comp}`, error);
    }
  }
}

async function loadManifest() {
  for (let comp of manifestComponents) {
    try {
      const fileContents = JSON.parse(
        await fs.promises.readFile(`${manifestLocation}/${comp}.json`, { encoding: 'utf-8' })
      );
      Manifest[comp] = fileContents;
    } catch (error) {
      console.error(`Error loading manifest component: ${comp}`, error);
    }
  }
}
