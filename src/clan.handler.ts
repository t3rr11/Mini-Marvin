import axios from 'axios';
import Config from '../config.json';
import { Group } from '../interfaces/Group.interface';
import { Member } from '../interfaces/Member.interface';
import { MemberResponse, GroupMembersResponse } from '../interfaces/Responses.interface';
import * as Util from './util.handler';
import * as User from './user.handler';
import { Client } from 'discord.js';

export async function processGroups(client: Client, groups: Group[]) {
  for (const group of groups) {
    await processGroup(client, group);
  }
}

async function processGroup(client: Client, group: Group) {
  const members = await getMembersForGroup(group.id);

  for (const member of members) {
    // call a function for each member
    try {
      User.processMember(client, member as Member);
    } catch (err) {
      console.error(`Failed to scan member: ${member.destinyUserInfo.displayName}`);
    }

    await Util.sleep(1000);
  }
}

async function getMembersForGroup(groupId: number): Promise<MemberResponse[]> {
  try {
    const headers = {
      'X-API-Key': Config.bungieAPIKey,
    };
    const response = await axios.get(`https://www.bungie.net/Platform/GroupV2/${groupId}/Members/`, { headers });
    const data: GroupMembersResponse = await response.data;

    // Check for error conditions
    if (data.ErrorCode === 1 && data.Response.totalResults === 0) {
      throw new Error('No members found for group');
    }

    return data.Response.results;
  } catch (error) {
    console.error('Error getting members for group:', error);
  }
}
