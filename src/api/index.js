import AuthenApi from './authentication'
import commentAPI from './comment'
import ConventionAPI from './convention'
import friendAPI from './friend'
import groupAPI from './group'
import pollAPI from './poll'
import postAPI from './post'
import postviewAPI from './postview'
import reactionAPI from './reaction'
import ResourseAPI from './resourse'
import searchAPI from './search'
import chatgptAPI from './chatgpt'
import notificationAPI from './notification'
export const API = {
  ...AuthenApi,
  ...ConventionAPI,
  ...ResourseAPI,
  ...friendAPI,
  ...postAPI,
  ...commentAPI,
  ...reactionAPI,
  ...groupAPI,
  ...searchAPI,
  ...pollAPI,
  ...postviewAPI,
  ...chatgptAPI,
  ...notificationAPI
}


