export interface Task {
  lineType: number;
  aceHash: number;
  isWontFix: boolean;
  rev: number;
  lineNumber: number;
  zoneId: string;
  taskCreated: string; // date string
  taskCompleted: null;
  textline: string;
  aline: string;
  dueDate: null | string; // date string
  usuallyUniqueId: string;
  startDate: null | string; // date string
  type: number;
  mentionCreated: null;
  mentionUsuallyUniqueId: string;
  localPadId: string;
  title: string;
  lastEditedDate: string; // date string
  lastViewed: string; // date string
  encryptedId: string;
  padUrl: string;
  encryptedMentioneeId: string;
  mentioneeName: string;
  mentioneePic: string;
  mentioneeEmail: string;
  mentionerName: string;
  mentionerEmail: string;
  mentionerPic: string;
}

export interface DeleteState {
  isArchivedLegacy: boolean;
  isArchived: boolean;
  isTrashed: boolean;
}

export interface Folder {
  folder: {
    encryptedId: string;
    encryptedParentFolderId: string;
    encryptedTopFolderId: string;
    encryptedDomainId: string;
    name: string;
    guestPolicy: number;
    isDeleted: boolean;
    isProject: boolean;
    createdDate: string; // Date string
    lastActivityDate: string; // Date string
    numPads: number;
    numSubFolders: number;
  };
  inSidebar: boolean;
  subscriptionLevel: number;
  isCreator: boolean;
  isMember: boolean;
  teamName: string;
  members: string[];
  folderView: {
    folderViewCount: number;
    recentFolderViewCount: number;
    padViewCount: number;
    recentPadViewCount: number;
    firstViewedFolderTime: string; // Date string
    lastViewedFolderTime: string; // Date string
    firstViewedPadTime: string; // Date string
    lastViewedPadTime: string; // Date string
  };
}

export interface PadListDoc extends DeleteState {
  id: string;
  title: string;
  url: string;
  docStatus: number;
  team: {
    id: string;
    name: string;
    isDeleted: boolean;
    config: {
      isPersonalTeam: boolean;
    };
  };
  lastEditor: {
    id: string;
    name: string;
  };
  lastEditedDate: string; // Date string
  editors: [
    {
      id: string;
      name: string;
    },
  ];
  creator: {
    id: string;
    name: string;
  };
  owner: {
    id: string;
    name: string;
  };
  activeUsers: string[];
  docView: {
    firstViewedDate: string; // Date string
    lastViewedDate: string; // Date string
    lastEditedDate: string; // Date string
    lastOpenedRev: number;
    lastClosedRev: number;
    totalViewCount: number;
    recentViewCount: number;
  };
  docPreferences: {
    subscriptionLevel: number;
    isFavorite: boolean;
  };
  type: number;
  globalRev: number;
  isCloudDoc: boolean;
  createdDate: string; // Date string
  templateColor: string; // Hex color string
  shareableMobilePadUrl: string;
  folder?: {
    guestPolicy: number;
    id: string;
    isArchived: boolean;
    isProject: boolean;
    name: string;
  };
}

export interface PadListFolder {
  id: string;
  name: string;
  createdDate: string; // Date string
  lastActivityDate: string; // Date string
  isArchived: boolean;
  isProject: boolean;
  guestPolicy: number;
  numSubFolders: number;
  numDocs: number;
  canPermanentlyDeleteFolder: boolean;
  parentFolders: {
    id: string;
    name: string;
    isArchived: boolean;
    isProject: boolean;
    guestPolicy: number;
    team: {
      id: string;
      name: string;
    };
  }[];
  team: {
    id: string;
    name: string;
  };
  docs: PadListDoc[];
  isFavorite: boolean; // custom data
}

const FRAGMENT_DELETED_STATE: string = `
fragment DeletedState on Doc {
  isArchivedLegacy,
  isArchived,
  isTrashed,
}
`;

const FRAGMENT_USER_IDENTITY: string = `
fragment UserIdentity on User {
  id,
  name,
}
`;

const FRAGMENT_PAD_LIST_DOC: string = `
fragment PadListDoc on Doc {
  id,
  title,
  url,
  docStatus,
  team {
    id,
    dropboxTeamId,
    name,
    isDeleted,
    config {
      isPersonalTeam,
    },
  },
  lastEditor {
    ...UserIdentity,
  },
  lastEditedDate,
  editors {
    ...UserIdentity,
  },
  creator {
    ...UserIdentity,
  },
  owner {
    ...UserIdentity,
  },
  myinvite {
    invitee {
      name,
    },
    inviter {
      name,
    },
    permissionSource,
    permissionLevel,
    createdDate,
  },
  activeUsers {
    id,
    name,
    pic,
    colorId,
    isConnected,
  },
  docView {
    firstViewedDate,
    lastViewedDate,
    lastEditedDate,
    lastOpenedRev,
    lastClosedRev,
    totalViewCount,
    recentViewCount,
  },
  docPreferences {
    subscriptionLevel,
    isFavorite,
  },
  dataSourceId,
  type,
  globalRev,
  ...DeletedState,
  isCloudDoc,
  cloudDocId,
  fileObjId,
  createdDate,
  users(excludeCreator:true, excludeOwner:false) {
    count,
    firstInvitedUser {
      name,
    },
  },
  purgeDate,
  tasks {
    taskUsuallyUniqueId
  },
  templateColor,
  templateLastUsedDate,
  shareableMobilePadUrl: url(trafficSource: "paper_link_on_mobile"),
}
${FRAGMENT_USER_IDENTITY}
`;

const FRAGMENT_PAD_LIST_FOLDER: string = `
fragment PadListFolder on Folder {
  id,
  name,
  createdDate,
  lastActivityDate,
  isArchived,
  isProject,
  guestPolicy,
  numSubFolders,
  numDocs,
  canPermanentlyDeleteFolder,
  parentFolders {
    id,
    name,
    createdDate,
    lastActivityDate,
    isArchived,
    isProject,
    guestPolicy,
    numSubFolders,
    numDocs,
    canPermanentlyDeleteFolder,
    team {
      id,
      name
    },
  },
  team {
    id,
    name
  },
}
`;

const FRAGMENT_PAD_LIST_DOC_WITH_FOLDER: string = `
fragment PadListDocWithFolder on Doc {
  ...PadListDoc
  folder {
      ...PadListFolder
  }
}
${FRAGMENT_DELETED_STATE}
${FRAGMENT_PAD_LIST_DOC}
${FRAGMENT_PAD_LIST_FOLDER}
`;

export const PAD_LIST: string = `
query PadList($filter:Int, $limit:Int) {
  docs(filter:$filter, limit:$limit) {
    ...PadListDocWithFolder
  },
}
${FRAGMENT_PAD_LIST_DOC_WITH_FOLDER}
`;

export const PAD_LIST_FOLDER: string = `
query PadListFolder($encryptedFolderId:String) {
  folders(folderIds:[$encryptedFolderId]) {
    ...PadListFolder
    docs {
      ...PadListDoc
    },
  }
}
${FRAGMENT_DELETED_STATE}
${FRAGMENT_PAD_LIST_DOC}
${FRAGMENT_PAD_LIST_FOLDER}
`;
