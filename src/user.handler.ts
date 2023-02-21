import fs from 'fs';
import axios from 'axios';
import * as Broadcast from './broadcast.handler';
import { Member } from '../interfaces/Member.interface';
import { MemberProfileResponse } from '../interfaces/Responses.interface';
import { Client } from 'discord.js';
import Config from '../config.json';
import * as Logger from './log.handler';

export async function processMember(client: Client, member: Member) {
  const memberFileLocation = `./members/${member.bungieNetUserInfo.supplementalDisplayName}.json`;

  // Get additional member information
  await getMemberAdditionalDetails(member);

  // If existing user, check for broadcasts
  if (fs.existsSync(memberFileLocation)) await processExistingMember(client, member);

  // Write to file
  fs.writeFileSync(memberFileLocation, JSON.stringify(member, null, 2));
}

async function processExistingMember(client: Client, member: Member) {
  const memberFileLocation = `./members/${member.bungieNetUserInfo.supplementalDisplayName}.json`;

  try {
    // Do checks for broadcasts by comparing old data to new data
    const oldMemberData: Member = JSON.parse(await fs.promises.readFile(memberFileLocation, { encoding: 'utf-8' }));

    // Catch if user has recentItems if not then ignore.
    if (oldMemberData.recentItems) {
      await Broadcast.checkForItems(client, member, oldMemberData);
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
        `https://www.bungie.net/Platform/Destiny2/${member.destinyUserInfo.membershipType}/Profile/${member.destinyUserInfo.membershipId}/?components=800,900`,
        { headers }
      );
      const data: MemberProfileResponse = await response.data;

      // Check for error conditions
      if (data.ErrorCode === 1 && !data.Response.profileRecords.data.records) {
        Logger.saveLog(`No records found, more than likely on private: ${member.destinyUserInfo.displayName}`);
        member.isPrivate = true;
        member.recentItems = [];
      } else {
        member.isPrivate = false;
      }

      // Check for items
      if (!member.isPrivate) {
        member.recentItems = data.Response.profileCollectibles.data.recentCollectibleHashes;
      }
    } catch (error) {
      Logger.saveError(`Error getting member: ${member.destinyUserInfo.displayName}`, error);
    }
  }
}
