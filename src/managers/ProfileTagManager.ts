import { Flags } from '../utils/Flags';

export const ProfileTags = {
  DEFAULT: 1n << 0n,
  NSFW: 1n << 1n,
  PRIVATE: 1n << 2n,
};

export const ProfileTagManager = new Flags(ProfileTags);
