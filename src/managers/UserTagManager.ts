import { Flags } from '../utils/Flags';

export const UserTags = {
  OWNER: 1n << 0n,
  BOT: 1n << 1n,
  APP_DEVELOPER: 1n << 2n,
  CONTRIBUTOR: 1n << 3n,
  TRANSLATOR: 1n << 4n,
  DONATOR: 1n << 5n,
  SYSTEM: 1n << 6n,
  VERIFIED: 1n << 7n,
};

export const UserTagManager = new Flags(UserTags);
