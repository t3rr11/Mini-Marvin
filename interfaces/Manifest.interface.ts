export interface IManifest {
  DestinyInventoryItemDefinition: {
    [key: string]: DestinyItemDefinition;
  };
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

export interface DestinyItemDefinition {
  displayProperties: {
    description: string;
    name: string;
    icon: string;
    hasIcon: boolean;
  };
  tooltipNotifications: {
    displayString: string;
    displayStyle: string;
  }[];
  collectibleHash: number;
  iconWatermark: string;
  backgroundColor: {
    colorHash: number;
    red: number;
    green: number;
    blue: number;
    alpha: number;
  };
  screenshot: string;
  itemTypeDisplayName: string;
  flavorText: string;
  uiItemDisplayStyle: string;
  itemTypeAndTierDisplayName: string;
  displaySource: string;
  action: {
    verbName: string;
    verbDescription: string;
    isPositive: boolean;
    requiredCooldownSeconds: number;
    requiredItems: Array<any>;
    progressionRewards: Array<any>;
    actionTypeLabel: string;
    rewardSheetHash: number;
    rewardItemHash: number;
    rewardSiteHash: number;
    requiredCooldownHash: number;
    deleteOnAction: boolean;
    consumeEntireStack: boolean;
    useOnAcquire: boolean;
  };
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
    recipeItemHash: number;
  };
  stats: {
    disablePrimaryStatDisplay: boolean;
    statGroupHash: number;
    stats: {
      [key: string]: {
        statHash: number;
        value: number;
        minimum: number;
        maximum: number;
        displayMaximum: number;
      };
    };
    hasDisplayableStats: boolean;
    primaryBaseStatHash: number;
  };
  equippingBlock: {
    uniqueLabelHash: number;
    equipmentSlotTypeHash: number;
    attributes: number;
    equippingSoundHash: number;
    hornSoundHash: number;
    ammoType: number;
    displayStrings: Array<string>;
  };
  translationBlock: {
    weaponPatternHash: number;
    defaultDyes: Array<{
      channelHash: number;
      dyeHash: number;
    }>;
    lockedDyes: Array<any>;
    customDyes: Array<any>;
    arrangements: Array<{
      classHash: number;
      artArrangementHash: number;
    }>;
    hasGeometry: boolean;
  };
  preview: {
    screenStyle: string;
    previewVendorHash: number;
    previewActionString: string;
  };
  quality: {
    itemLevels: Array<any>;
    qualityLevel: number;
    infusionCategoryName: string;
    infusionCategoryHash: number;
    infusionCategoryHashes: Array<number>;
    progressionLevelRequirementHash: number;
    currentVersion: number;
    versions: Array<{
      powerCapHash: number;
    }>;
    displayVersionWatermarkIcons: Array<string>;
  };
  acquireRewardSiteHash: number;
  acquireUnlockHash: number;
  sockets: {
    detail: string;
    socketEntries: Array<{
      socketTypeHash: number;
      singleInitialItemHash: number;
      reusablePlugItems: Array<{
        plugItemHash: number;
      }>;
      preventInitializationOnVendorPurchase: boolean;
      preventInitializationWhenVersioning: boolean;
      hidePerksInItemTooltip: boolean;
      plugSources: number;
      reusablePlugSetHash?: number;
      overridesUiAppearance: boolean;
      defaultVisible: boolean;
      randomizedPlugSetHash?: number;
    }>;
    intrinsicSockets: Array<{
      plugItemHash: number;
      socketTypeHash: number;
      defaultVisible: boolean;
    }>;
    socketCategories: Array<{
      socketCategoryHash: number;
      socketIndexes: Array<number>;
    }>;
  };
  talentGrid: {
    talentGridHash: number;
    itemDetailString: string;
    hudDamageType: number;
  };
  investmentStats: Array<{
    statTypeHash: number;
    value: number;
    isConditionallyActive: boolean;
  }>;
  perks: Array<{
    requirementDisplayString: string;
    perkHash: number;
    perkVisibility: number;
  }>;
  summaryItemHash: number;
  allowActions: boolean;
  doesPostmasterPullHaveSideEffects: boolean;
  nonTransferrable: boolean;
  itemCategoryHashes: Array<number>;
  specialItemType: number;
  itemType: number;
  itemSubType: number;
  classType: number;
  breakerType: number;
  equippable: boolean;
  damageTypeHashes: Array<number>;
  damageTypes: Array<number>;
  defaultDamageType: number;
  defaultDamageTypeHash: number;
  isWrapper: boolean;
  traitIds: Array<string>;
  traitHashes: Array<number>;
  hash: number;
  index: number;
  redacted: boolean;
  blacklisted: boolean;
}

export interface DestinyItemDefinitionLite {
  displayProperties: {
    description: string;
    name: string;
    icon: string;
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
  summaryItemHash: number;
  collectibleHash: number;
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
    icon?: string;
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
