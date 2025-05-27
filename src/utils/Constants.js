// const URL = 'http://192.168.1.2'
const URL = 'http://192.168.1.65'
// const URL = 'http://192.168.101.65'
// const URL = 'http://10.0.4.117'
const PORT = '8080'
const SERVER_POST = `${URL}:${PORT}`
export const SERVER_ADDRESS = `${URL}:${PORT}`

const MESSAGE_TYPE = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  NOTIFY: 'NOTIFY',
  POLL: 'POLL',
  MIX: 'MIX'
}

const MESSAGE_ACTION = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE',
  DELETE: 'DELETE'
}

const POST_ACTION = {
  UPDATE_CONTENT: 'UPDATE_CONTENT',
  UPDATE_ATTACHMENT: 'UPDATE_ATTACHMENT',
  UPDATE_ALL: 'UPDATE_ALL',
  DELETE: 'DELETE',
  TRASH: 'TRASH'
}

const MESSAGE_NOTIFY_TYPE = {
  CHANGE_AVATAR: 'CHANGE_AVATAR',
  CHANGE_AKA: 'CHANGE_AKA',
  POLL: 'POLL',
  CHANGE_CONVENTION_NAME: 'CHANGE_CONVENTION_NAME'
}

const MESSAGE_NOTIFY_STATUS = {
  UPDATE: 'UPDATE',
  CLEAR: 'CLEAR'
}

const POST_ATTACHMENT = {
  TEXT: 'TEXT',
  IMAGE: 'image/jpeg',
  VIDEO: 'video/mp4',
  NOTIFY: 'NOTIFY',
  MIX: 'MIX'
}

const POST_TYPE = {
  PERSONAL: 'PERSONAL',
  SHARE: 'SHARE',
  GROUP: 'GROUP'
}

const RESPONSE_STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
}

const CHAT_ITEM_TYPE = {
  OWNER_MESSAGE: 'OWNER_MESSAGE',
  USER_MESSAGE: 'USER_MESSAGE'
}

const FRIEND_STATUS = {
  NONE: 'NONE',
  PENDING: 'PENDING',
  ACCEPTING: 'ACCEPTING',
  REFUSING: 'REFUSING',
  CANCELING: 'CANCELING',
  FRIEND: 'FRIEND'
}

const MEMBER_ROLE = {
  ADMIN: 'ADMIN',
  CENSOR: 'CENSOR',
  MEMBER: 'MEMBER'
}

const MEMBER_STATUS = {
  PENDING: 'PENDING',
  BLOCK: 'BLOCK',
  ACCEPT: 'ACCEPT'
}

const preURL = 'socialapp://open/'

const TYPE_SCREEN = {
  PROFILE: 'PROFILE',
  FRIEND: 'FRIEND',
  POST: 'POST',
  CONVENTION: 'CONVENTION',
  CALL: 'CALL'
}

const OPEN_SCREEN = {
  profile: (userID) => `${preURL}profile/${userID}`,
  convention: (conventionID, ownerID) => `${preURL}convention/${conventionID}/${ownerID}`,
  home: () => `${preURL}home`,
  post: (ownerId, postId) => `${preURL}post/${postId}/${ownerId}`,
  call: (ownerId, targetId, meetingId) => `${preURL}call/${ownerId}/${targetId}/${meetingId}/true`
}

export const SHARE_TYPE = {
  PROFILE: 'PROFILE',
  POST: 'POST'
}

const SCOPE = {
  PUBLIC: 'PUBLIC',
  FRIEND: 'FRIEND',
  PRIVATE: 'PRIVATE',
  OWNER: 'OWNER'
}

const CONVENTION_TYPE = {
  PRIVATE: 'private',
  GROUP: 'group'
}

const NOTIFY_CONVENTION_STATUS = {
  ALLOW: 'ALLOW',
  NOT_ALLOW: 'NOT_ALLOW',
  CUSTOM: 'CUSTOM'
}

const POLL_STATUS = {
  DOING: 'DOING',
  DONE: 'DONE'
}

const POLL_TYPE = {
  CONVENTION: 'CONVENTION',
  POST: 'POST'
}

const REACTION_TYPE = {
  POST: 'POST',
  COMMENT: 'COMMENT'
}

const WEBSITE = {
  SINHVIEN: 'https://online.hcmute.edu.vn/student',
  DKMH: 'https://dkmh.hcmute.edu.vn/',
  GROUP_HOC_TAP: 'https://www.facebook.com/groups/utethacmachoctap',
  DAY_HOC_SO: 'https://utexlms.hcmute.edu.vn/'
}

const NOTIFICATION_TYPE = {
  POST_REACTION: 'POST_REACTION',
  POST_COMMENT: 'POST_COMMENT',
  POST_TAG: 'POST_TAG',

  COMMENT_REACTION: 'COMMENT_REACTION',
  COMMENT_REPLY: 'COMMENT_REPLY',
  COMMENT_TAG: 'COMMENT_TAG',

  FRIEND_REQUEST: 'FRIEND_REQUEST',
  FRIEND_ACCEPT: 'FRIEND_ACCEPT',

  GROUP_REQUEST: 'GROUP_REQUEST',
  GROUP_ACCEPT: 'GROUP_ACCEPT'
}

export {
  SERVER_POST,
  POST_ATTACHMENT,
  MESSAGE_NOTIFY_TYPE,
  MESSAGE_NOTIFY_STATUS,
  NOTIFICATION_TYPE,
  MESSAGE_TYPE,
  MESSAGE_ACTION,
  POST_ACTION,
  POST_TYPE,
  CHAT_ITEM_TYPE,
  FRIEND_STATUS,
  RESPONSE_STATUS,
  MEMBER_ROLE,
  MEMBER_STATUS,
  SCOPE,
  OPEN_SCREEN,
  TYPE_SCREEN,
  CONVENTION_TYPE,
  NOTIFY_CONVENTION_STATUS,
  POLL_STATUS,
  POLL_TYPE,
  REACTION_TYPE,
  WEBSITE
}
