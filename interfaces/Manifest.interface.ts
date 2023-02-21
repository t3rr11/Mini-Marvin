export interface IManifest {
  DestinyInventoryItemLiteDefinition: {
    [key: string]: DestinyItemDefinitionLite;
  };
  DestinyCollectibleDefinition: {
    [key: string]: DestinyCollectibleDefinition;
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
