import Config from '../config.json';
import { IClanConfig } from '../interfaces/Config.interface';
import { Client } from 'discord.js';
import { Member } from '../interfaces/Member.interface';
import { exoticArmor, exoticWeapons } from './manifest.handler';
import { createMessageHandler } from './message.handler';

export async function checkForGuardianRank(client: Client, member: Member, oldMemberData: Member) {
  const previousGuardianRank = oldMemberData?.currentGuardianRank;
  const isHigherGuardianRank = member.currentGuardianRank > oldMemberData.currentGuardianRank;

  if (previousGuardianRank && isHigherGuardianRank) {
    createMessageHandler({ client, member, config: Config, type: 'GuardianRank' });
  }
}

export async function checkForItems(client: Client, member: Member, oldMemberData: Member) {
  const memberClanConfig: IClanConfig = Config.clans.find((e) => e.id.toString() === member.groupId);

  // Get new items from members recent items array
  const result = member.recentItems.filter(function (item) {
    return !oldMemberData.recentItems.includes(item);
  });

  for (let res of result) {
    const isExoticWeapon = exoticWeapons.map((e) => e.collectibleHash).includes(res);
    const isExoticArmor = exoticArmor.map((e) => e.collectibleHash).includes(res);
    const isCustomCollectible = memberClanConfig.customCollectibles.includes(res);

    if (isExoticWeapon || isExoticArmor || isCustomCollectible) {
      createMessageHandler({ client, member, config: Config, type: 'Item', hash: res });
    }
  }
}

export async function checkForTitles(client: Client, member: Member, oldMemberData: Member) {
  if (oldMemberData.titles) {
    for (let title of member.titles) {
      const oldTitleData = oldMemberData.titles.find((e) => e?.recordHash === title?.recordHash);
      const wasTitleComplete = oldTitleData?.complete === false;
      const isTitleNowComplete = title?.complete === true;

      if (wasTitleComplete && isTitleNowComplete) {
        createMessageHandler({ client, member, config: Config, type: 'Title', hash: title.recordHash });
      }
    }
  }
}
