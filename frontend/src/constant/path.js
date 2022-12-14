export const PATH = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PRESENTATION: {
    ROOT: '/presentation',
    MANAGE: '/presentation/:presentationId'
  },
  GROUP: {
    ROOT: '/group',
    NEW: '/group/new',
    LIST: '/group/list',
    JOINED: '/group/joined',
    JOIN: '/group/join'
  },
  MANAGE_GROUP: {
    ROOT: '/group/manage',
    GENERAL: '/group/manage/:groupId',
    DELETE: '/group/manage/:groupId/delete',
    LEAVE: '/group/manage/:groupId/leave',
    MEMBERS: '/group/manage/:groupId/members',
    NEWS: '/group/manage/:groupId/news',
    PRACTICES: '/group/manage/:groupId/practices'
  },
  SETTINGS: {
    ROOT: '/settings',
    PROFILE: '/settings/profile',
    UPDATE_PASSWORD: '/settings/update-password',
    ACTIVATION: '/settings/activation',
    PROFILE: '/settings/profile'
  },
  NOTFOUND: '/not-found'
};
