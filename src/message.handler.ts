import { Channel, Client, EmbedBuilder, TextChannel } from 'discord.js';
import { Member } from '../interfaces/Member.interface';
import { IClanConfig, IConfig } from '../interfaces/Config.interface';
import { Manifest } from './manifest.handler';

export interface IMessage {
  client: Client;
  member: Member;
  config: IConfig;
  clan: IClanConfig;
  type: 'GuardianRank' | 'Item' | 'Title';
  hash?: number;
}

export async function createMessageHandler({ client, member, config, clan, type, hash }: IMessage) {
  const channel = await client.channels.fetch(config.broadcastChannelId);

  switch (type) {
    case 'GuardianRank': {
      return sendGuardianRankMessage(channel, member, clan);
    }
    case 'Item': {
      return sendItemMessage(channel, member, clan, hash);
    }
    case 'Title': {
      return sendTitleMessage(channel, member, clan, hash);
    }
  }
}

function sendGuardianRankMessage(channel: Channel, member: Member, clan: IClanConfig) {
  const memberName = member.destinyUserInfo.displayName;
  const description = `${memberName} has just hit Guardian Rank ${member.currentGuardianRank}`;

  const embed = new EmbedBuilder().setColor('#0099ff').setTitle(clan.name).setDescription(description).setTimestamp();

  (channel as TextChannel).send({ embeds: [embed] });
}

function sendItemMessage(channel: Channel, member: Member, clan: IClanConfig, hash: number) {
  if (!hash) return;

  const memberName = member.destinyUserInfo.displayName;

  const collectible = Manifest.DestinyCollectibleDefinition[hash.toString()];
  if (!collectible) return;

  const item = Manifest.DestinyInventoryItemDefinition[collectible.itemHash.toString()];
  if (!item) return;

  const lightGGLink = `https://www.light.gg/db/items/${collectible.itemHash}`;
  const description = `${memberName} just obtained [${collectible.displayProperties.name}](${lightGGLink})`;

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(clan.name)
    .setDescription(description)
    .addFields([{ name: 'Source', value: collectible.sourceString || 'Unknown' }])
    .setTimestamp();

  if (item.screenshot) {
    embed.setImage(`https://bungie.net${item.screenshot}`);
  }
  if (collectible.displayProperties?.icon) {
    embed.setThumbnail(`https://bungie.net${collectible.displayProperties.icon}`);
  }

  (channel as TextChannel).send({ embeds: [embed] });
}

function sendTitleMessage(channel: Channel, member: Member, clan: IClanConfig, hash: number) {
  if (!hash) return;

  const memberName = member.destinyUserInfo.displayName;

  const title = Manifest.DestinyRecordDefinition[hash.toString()];
  if (!title) return;

  const titleName = title.titleInfo.titlesByGender['Male'];
  const description = `${memberName} just obtained the ${titleName} title!`;

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(clan.name)
    .setDescription(description)
    .addFields([{ name: 'Name', value: title.displayProperties.name || 'Unknown' }])
    .addFields([{ name: 'Source', value: title.displayProperties.description || 'Unknown' }])
    .setTimestamp();

  if (title.displayProperties?.icon) {
    embed.setThumbnail(`https://bungie.net${title.displayProperties.icon}`);
  }

  (channel as TextChannel).send({ embeds: [embed] });
}
