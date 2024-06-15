import * as Logger from './log.handler';
import * as Broadcast from './broadcast.handler';
import fs from 'fs';
import axios from 'axios';
import Config from '../config.json';
import { Member } from '../interfaces/Member.interface';
import { MemberProfileResponse } from '../interfaces/Responses.interface';
import { Client } from 'discord.js';
import { Manifest } from './manifest.handler';

export async function processMember(client: Client, member: Member) {
  const memberFileLocation = `./members/${member.bungieNetUserInfo.supplementalDisplayName}.json`;

  // Get additional member information
  await getMemberAdditionalDetails(member)
    .then(async () => {
      // If existing user, check for broadcasts
      if (fs.existsSync(memberFileLocation) && !Config.testing) await processExistingMember(client, member);

      // Write to file
      fs.writeFileSync(memberFileLocation, JSON.stringify(member, null, 2));
    })
    .catch((err) => {});
}

async function processExistingMember(client: Client, member: Member) {
  const memberFileLocation = `./members/${member.bungieNetUserInfo.supplementalDisplayName}.json`;

  try {
    // Do checks for broadcasts by comparing old data to new data
    const oldMemberData: Member = JSON.parse(await fs.promises.readFile(memberFileLocation, { encoding: 'utf-8' }));

    // Catch if user has recentItems if not then ignore.
    if (oldMemberData.recentItems) {
      await Broadcast.checkForGuardianRank(client, member, oldMemberData);
      await Broadcast.checkForItems(client, member, oldMemberData);
      await Broadcast.checkForTitles(client, member, oldMemberData);
    }
  } catch (error) {
    Logger.saveError(`Failed to read file: ${memberFileLocation}`, error);
  }
}

async function getMemberAdditionalDetails(member: Member) {
  if (member.destinyUserInfo) {
    try {
      const headers = {
        'X-API-Key': Config.bungieAPIKey,
      };
      const response = await axios.get(
        `https://www.bungie.net/Platform/Destiny2/${member.destinyUserInfo.membershipType}/Profile/${member.destinyUserInfo.membershipId}/?components=100,800,900`,
        { headers }
      );
      const data: MemberProfileResponse = await response.data;

      // Check for error conditions
      if (data.ErrorCode === 1 && !data.Response.profileRecords.data.records) {
        Logger.saveLog(`No records found, more than likely on private: ${member.destinyUserInfo.displayName}`);
        member.isPrivate = true;
        member.recentItems = [];
        member.titles = [];
      } else {
        member.isPrivate = false;
      }

      // Check for items
      if (!member.isPrivate) {
        member.currentGuardianRank = data.Response.profile.data.currentGuardianRank;
        member.recentItems = data.Response.profileCollectibles.data.recentCollectibleHashes;

        // Titles
        member.titles = Manifest.DestinyPresentationNodeDefinition[
          data.Response.profileRecords.data.recordSealsRootNodeHash
        ].children.presentationNodes.map((presso) => {
          if (Manifest.DestinyPresentationNodeDefinition[presso.presentationNodeHash]?.completionRecordHash) {
            const hash = Manifest.DestinyPresentationNodeDefinition[presso.presentationNodeHash]?.completionRecordHash;
            return {
              recordHash: hash,
              complete: data.Response.profileRecords.data.records[hash]?.objectives[0]?.complete ? true : false,
            };
          }
        });
      }

      return true;
    } catch (error) {
      Logger.saveError(`Error getting member: ${member.destinyUserInfo.displayName}`, error);
      throw error;
    }
  }
}
