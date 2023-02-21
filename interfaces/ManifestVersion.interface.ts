export interface ManifestVersionResponse {
  Response: Response;
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: MessageData;
}

export interface MessageData {}

export interface Response {
  version: string;
  mobileAssetContentPath: string;
  mobileGearAssetDataBases: MobileGearAssetDataBase[];
  mobileWorldContentPaths: WorldContentPaths;
  jsonWorldContentPaths: WorldContentPaths;
  jsonWorldComponentContentPaths: JSONWorldComponentContentPaths;
  mobileClanBannerDatabasePath: string;
  mobileGearCDN: MobileGearCDN;
  iconImagePyramidInfo: any[];
}

export interface JSONWorldComponentContentPaths {
  en: { [key: string]: string };
  fr: { [key: string]: string };
  es: { [key: string]: string };
  'es-mx': { [key: string]: string };
  de: { [key: string]: string };
  it: { [key: string]: string };
  ja: { [key: string]: string };
  'pt-br': { [key: string]: string };
  ru: { [key: string]: string };
  pl: { [key: string]: string };
  ko: { [key: string]: string };
  'zh-cht': { [key: string]: string };
  'zh-chs': { [key: string]: string };
}

export interface WorldContentPaths {
  en: string;
  fr: string;
  es: string;
  'es-mx': string;
  de: string;
  it: string;
  ja: string;
  'pt-br': string;
  ru: string;
  pl: string;
  ko: string;
  'zh-cht': string;
  'zh-chs': string;
}

export interface MobileGearAssetDataBase {
  version: number;
  path: string;
}

export interface MobileGearCDN {
  Geometry: string;
  Texture: string;
  PlateRegion: string;
  Gear: string;
  Shader: string;
}
