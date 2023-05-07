export const UserPermissions = {
  /**
   * Delete a user
   */
  REMOVE_USER: 1n << 0n,

  /**
   * Change pseudo, username or avatar to user
   */
  MANAGE_USER: 1n << 1n,

  /**
   * Remove user message
   */
  MANAGE_USER_MESSAGE: 1n << 2n,

  /**
   * Remove user comment
   */
  MANAGE_USER_COMMENT: 1n << 3n,

  /**
   * Add and remove role on user
   * - The role must be below the current manager top role
   * - The manager can't auto add or remove roles
   */
  MANAGE_USER_ROLE: 1n << 4n,

  /**
   * Add and remove permission on user
   * - The manager must be upper to user in role
   * - The manager can't add permission to manage permission
   * - The manager can't add permission he don't have
   * - The manager can't auto add or remove permission
   * - The manager can't add permission the role don't have
   */
  MANAGE_USER_PERMISSION: 1n << 5n,

  /**
   * Add and remove points on user
   * - The manager can't auto add or remove points
   */
  MANAGE_USER_POINT: 1n << 6n,

  /**
   * Add and remove user react
   */
  MANAGE_USER_REACT: 1n << 7n,

  /**
   * Attribute, reply and close ticket
   */
  MANAGE_TICKET: 1n << 8n,

  /**
   * Add and remove user tarot card
   * - The manager can't auto add and remove
   */
  MANAGE_USER_TAROT_CARD: 1n << 9n,

  /**
   * Add message and remove his message
   */
  SEND_MESSAGE: 1n << 10n,

  /**
   * Can create a ticket
   */
  CREATE_TICKET: 1n << 11n,

  /**
   * Can exchange tarot card with others user
   */
  EXCHANGE_TAROT_CARD: 1n << 12n,

  /**
   * Can react and remove his react
   */
  REACT: 1n << 13n,

  /**
   * Can send comment and remove his comment
   */
  SEND_COMMENT: 1n << 14n,

  /**
   * Can gain points
   */
  HAVE_POINTS: 1n << 15n,

  /**
   * Can have tarot cards
   */
  HAVE_TAROT_CARDS: 1n << 16n,

  /**
   * Can add, update and delete tarot cards
   */
  MANAGE_TAROT_CARD: 1n << 17n,
};

export type UserPermissionType = keyof typeof UserPermissions;
export const UserPermissionArray = Object.keys(UserPermissions) as UserPermissionType[];
export const UserPermissionRegexp = new RegExp(`^${UserPermissionArray.join('|')}$`);
