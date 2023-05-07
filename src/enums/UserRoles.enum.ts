export const UserRoles = {
  /**
   * me
   * Have all
   */
  OWNER: 1n << 0n,

  /**
   * REMOVE_USER,
   * MANAGE_USER,
   * MANAGE_USER_MESSAGE,
   * MANAGE_USER_COMMENT,
   * MANAGE_USER_ROLE,
   * MANAGE_USER_PERMISSION,
   * MANAGE_USER_POINT,
   * MANAGE_USER_REACT,
   * MANAGE_TICKET,
   * MANAGE_USER_TAROT_CARD,
   */
  ADMINISTRATOR: 1n << 1n,

  /**
   * MANAGE_USER,
   * MANAGE_USER_MESSAGE,
   * MANAGE_USER_COMMENT,
   * MANAGE_USER_REACT,
   */
  MODERATOR: 1n << 2n,

  /**
   * MANAGE_TICKET
   */
  SUPPORT: 1n << 3n,

  /**
   * Role given 3days after the account is created
   * EXCHANGE_TAROT_CARD
   */
  COMMUNITY_USER: 1n << 4n,

  /**
   * Basic role, everyone have
   * SEND_COMMENT,
   * SEND_MESSAGE,
   * CREATE_TICKET,
   * HAVE_POINTS,
   * HAVE_TAROT_CARDS,
   * REACT,
   */
  BASIC_USER: 1n << 5n,

  /**
   * Contributor roles
   * No use for this moment
   */
  CONTRIBUTOR: 1n << 6n,
};

export type UserRoleType = keyof typeof UserRoles;
export const UserRoleArray = Object.keys(UserRoles) as UserRoleType[];
export const UserRoleRegexp = new RegExp(`^${UserRoleArray.join('|')}$`);
