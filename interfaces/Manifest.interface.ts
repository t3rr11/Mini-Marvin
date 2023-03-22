export interface IManifest {
  DestinyInventoryItemLiteDefinition: {
    [key: string]: DestinyItemDefinitionLite;
  };
  DestinyCollectibleDefinition: {
    [key: string]: DestinyCollectibleDefinition;
  };
  DestinyPresentationNodeDefinition: {
    [key: string]: DestinyPresentationNodeDefinition;
  };
  DestinyRecordDefinition: {
    [key: string]: DestinyRecordDefinition;
  };
}

export interface DestinyItemDefinitionLite {
  displayProperties: {
    description: string;
    name: string;
    hasIcon: boolean;
  };
  tooltipNotifications: any[];
  itemTypeDisplayName: string;
  uiItemDisplayStyle: string;
  itemTypeAndTierDisplayName: string;
  displaySource: string;
  inventory: {
    maxStackSize: number;
    bucketTypeHash: number;
    recoveryBucketTypeHash: number;
    tierTypeHash: number;
    isInstanceItem: boolean;
    nonTransferrableOriginal: boolean;
    tierTypeName: string;
    tierType: number;
    expirationTooltip: string;
    expiredInActivityMessage: string;
    expiredInOrbitMessage: string;
    suppressExpirationWhenObjectivesComplete: boolean;
  };
  acquireRewardSiteHash: number;
  acquireUnlockHash: number;
  perks: any[];
  allowActions: boolean;
  doesPostmasterPullHaveSideEffects: boolean;
  nonTransferrable: boolean;
  itemCategoryHashes: number[];
  specialItemType: number;
  itemType: number;
  itemSubType: number;
  classType: number;
  breakerType: number;
  equippable: boolean;
  defaultDamageType: number;
  isWrapper: boolean;
}

export interface DestinyCollectibleDefinition {
  displayProperties: {
    description: string;
    name: string;
    icon: string;
    hasIcon: boolean;
  };
  scope: number;
  sourceString: string;
  sourceHash: number;
  itemHash: number;
  acquisitionInfo: { runOnlyAcquisitionRewardSite: boolean };
  stateInfo: { requirements: { entitlementUnavailableMessage: string } };
  presentationNodeType: number;
  traitIds: any[];
  traitHashes: any[];
  parentNodeHashes: number[];
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
}

export interface DestinyPresentationNodeDefinition {
  displayProperties: {
    description: string;
    name: string;
    hasIcon: boolean;
  };
  nodeType: number;
  scope: number;
  objectiveHash: number;
  children: {
    presentationNodes: {
      presentationNodeHash: number;
      nodeDisplayPriority: number;
    }[];
    collectibles: any[];
    records: any[];
    metrics: any[];
    craftables: any[];
  };
  displayStyle: number;
  screenStyle: number;
  requirements: {
    entitlementUnavailableMessage: string;
  };
  disableChildSubscreenNavigation: boolean;
  categoryScoreUnlockValueHash: number;
  maxCategoryRecordScore: number;
  presentationNodeType: number;
  traitIds: any[];
  traitHashes: any[];
  parentNodeHashes: any[];
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
  completionRecordHash?: number;
}

export interface DestinyRecordDefinition {
  displayProperties: {
    description: string;
    name: string;
    hasIcon: boolean;
  };
  scope: number;
  objectiveHashes: Array<number>;
  recordValueStyle: number;
  forTitleGilding: boolean;
  shouldShowLargeIcons: boolean;
  titleInfo: {
    hasTitle: boolean;
    titlesByGender: {
      Male: string;
      Female: string;
    };
    titlesByGenderHash: {
      '2204441813': string;
      '3111576190': string;
    };
  };
  completionInfo: {
    partialCompletionObjectiveCountThreshold: number;
    ScoreValue: number;
    shouldFireToast: boolean;
    toastStyle: number;
  };
  stateInfo: {
    featuredPriority: number;
    completeUnlockHash: number;
    claimedUnlockHash: number;
    completedCounterUnlockValueHash: number;
  };
  requirements: {
    entitlementUnavailableMessage: string;
  };
  expirationInfo: {
    hasExpiration: boolean;
    description: string;
  };
  intervalInfo: {
    intervalObjectives: Array<any>;
    intervalRewards: Array<any>;
    originalObjectiveArrayInsertionIndex: number;
    isIntervalVersionedFromNormalRecord: boolean;
  };
  rewardItems: Array<any>;
  anyRewardHasConditionalVisibility: boolean;
  presentationNodeType: number;
  traitIds: Array<any>;
  traitHashes: Array<any>;
  parentNodeHashes: Array<any>;
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
}
