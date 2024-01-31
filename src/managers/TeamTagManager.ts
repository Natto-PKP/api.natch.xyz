import { Flags } from '../utils/Flags';

export const TeamTags = {
  SUPPORT: 1n << 0n,
  VERIFIED: 1n << 1n,
  NSFW: 1n << 2n,
  PRIVATE: 1n << 3n,
};

export const TeamTagManager = new Flags(TeamTags);
