export interface IConfig {
  bungieAPIKey: string;
  token: string;
  broadcastChannelId: string;
  testing: boolean;
  clans: IClanConfig[];
}

export interface IClanConfig {
  name: string;
  id: number;
  customCollectibles: number[];
}
