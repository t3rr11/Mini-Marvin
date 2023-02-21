export interface GroupMembersResponse {
  Response: {
    results: MemberResponse[];
    totalResults: number;
    hasMore: boolean;
    query: {
      itemsPerPage: number;
      currentPage: number;
    };
    useTotalResults: boolean;
  };
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: any;
}

export interface MemberResponse {
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
}

export interface MemberProfileResponse {
  Response: {
    responseMintedTimestamp: string;
    secondaryComponentsMintedTimestamp: string;
    profileRecords: {
      data: {
        score: number;
        activeScore: number;
        legacyScore: number;
        lifetimeScore: number;
        records: {
          [key: string]: {
            state: number;
            intervalsRedeemedCount: number;
            rewardVisibilty?: boolean[];
            objectives?: any[];
          };
        };
        recordCategoriesRootNodeHash: number;
        recordSealsRootNodeHash: number;
      };
    };
    profileCollectibles: {
      data: {
        recentCollectibleHashes: number[];
        collectibles: {
          [key: string]: {
            state: number;
          };
        }[];
        collectionCategoriesRootNodeHash: number;
        collectionBadgesRootNodeHash: number;
      };
      privacy: number;
    };
  };
  ErrorCode: number;
  ThrottleSeconds: number;
  ErrorStatus: string;
  Message: string;
  MessageData: any;
}
