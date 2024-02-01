import { Flags } from '../utils/Flags';

export const Languages = {
  EN: 1n << 0n,
  FR: 1n << 1n,
};

export class LanguageManager {
  flags = new Flags(Languages);
}
