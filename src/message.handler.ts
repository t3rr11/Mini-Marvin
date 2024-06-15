import { Channel, Client, EmbedBuilder, TextChannel } from 'discord.js';
import { Member } from '../interfaces/Member.interface';
import { IConfig } from '../interfaces/Config.interface';
import { Manifest } from './manifest.handler';

export interface IMessage {
  client: Client;
  member: Member;
  config: IConfig;
  type: 'GuardianRank' | 'Item' | 'Title';
  hash?: number;
}

export async function createMessageHandler({ client, member, config, type, hash }: IMessage) {
  const channel = await client.channels.fetch(config.broadcastChannelId);

  switch (type) {
    case 'GuardianRank': {
      return sendGuardianRankMessage(channel, member);
    }
    case 'Item': {
      return sendItemMessage(channel, member, hash);
    }
    case 'Title': {
      return sendTitleMessage(channel, member, hash);
    }
  }
}

function sendGuardianRankMessage(channel: Channel, member: Member) {
  const memberName = member.destinyUserInfo.displayName;
  const description = `${memberName} has just hit Guardian Rank ${member.currentGuardianRank}`;

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Marvins Minions')
    .setDescription(description)
    .setTimestamp();

  (channel as TextChannel).send({ embeds: [embed] });
}

function sendItemMessage(channel: Channel, member: Member, hash: number) {
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
    .setTitle('Marvins Minions')
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

function sendTitleMessage(channel: Channel, member: Member, hash: number) {
  if (!hash) return;

  const memberName = member.destinyUserInfo.displayName;

  const title = Manifest.DestinyRecordDefinition[hash.toString()];
  if (!title) return;

  const titleName = title.titleInfo.titlesByGender['Male'];
  const description = `${memberName} just obtained the ${titleName} title!`;

  const embed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Marvins Minions')
    .setDescription(description)
    .addFields([{ name: 'Name', value: title.displayProperties.name || 'Unknown' }])
    .addFields([{ name: 'Source', value: title.displayProperties.description || 'Unknown' }])
    .setTimestamp();

  if (title.displayProperties?.icon) {
    embed.setThumbnail(`https://bungie.net${title.displayProperties.icon}`);
  }

  (channel as TextChannel).send({ embeds: [embed] });
}
