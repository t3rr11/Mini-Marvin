export interface Member {
  memberType: number;
  isOnline: boolean;
  lastOnlineStatusChange: string;
  groupId: string;
  destinyUserInfo: {
    LastSeenDisplayName: string;
    LastSeenDisplayNameType: number;
    iconPath: string;
    crossSaveOverride: number;
    applicableMembershipTypes: number[];
    isPublic: boolean;
    membershipType: number;
    membershipId: string;
    displayName: string;
    bungieGlobalDisplayName: string;
    bungieGlobalDisplayNameCode: number;
  };
  bungieNetUserInfo: {
    supplementalDisplayName: string;
    iconPath: string;
    crossSaveOverride: number;
    isPublic: boolean;
    membershipType: number;
    membershipId: string;
    displayName: string;
    bungieGlobalDisplayName: string;
    bungieGlobalDisplayNameCode: number;
  };
  joinDate: string;
  isPrivate: boolean;
  recentItems: number[];
  currentGuardianRank: number;
  titles: {
    recordHash: number;
    complete: boolean;
  }[];
}
