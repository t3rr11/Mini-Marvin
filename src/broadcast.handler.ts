import { Member } from '../interfaces/Member.interface';
import { Manifest } from './manifest.handler';
import { Client, TextChannel } from 'discord.js';
import Config from '../config.json';

export async function checkForGuardianRank(client: Client, member: Member, oldMemberData: Member) {
  if (oldMemberData?.currentGuardianRank) {
    if (member.currentGuardianRank > oldMemberData.currentGuardianRank) {
      const channel = await client.channels.fetch(Config.broadcastChannelId);
      (channel as TextChannel).send(
        `${member.destinyUserInfo.displayName} has just hit Guardian Rank ${member.currentGuardianRank}`
      );
    }
  }
}

export async function checkForItems(client: Client, member: Member, oldMemberData: Member) {
  const memberClanConfig = Config.clans.find((e) => e.id.toString() === member.groupId.toString());
  const result = member.recentItems.filter(function (item) {
    return !oldMemberData.recentItems.includes(item);
  });

  for (let res of result) {
    if (memberClanConfig.items.includes(res)) {
      const channel = await client.channels.fetch(Config.broadcastChannelId);
      (channel as TextChannel).send(
        `${member.destinyUserInfo.displayName} just obtained ${
          Manifest.DestinyCollectibleDefinition[res.toString()].displayProperties.name
        }`
      );
    }
  }
}
