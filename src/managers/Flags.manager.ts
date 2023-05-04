/* eslint-disable no-bitwise */
interface FlagsInterface { [key: string]: bigint }

export default class FlagsManager<T extends FlagsInterface> {
  constructor(public flags: T) { }

  public has(keys: keyof T | (keyof T)[], bit: bigint) {
    const { flags } = this;
    if (Array.isArray(keys)) return keys.every((key) => (bit & flags[key]) === flags[key]);

    const prop = flags[keys];
    return (bit & prop) === prop;
  }

  public resolve(bit: bigint) {
    const { flags } = this;
    const result = Object.entries(flags).filter((tag) => (bit & flags[tag[0]]) === tag[1]);
    return result.map(([key]) => key);
  }

  public merge(keys: (keyof T)[]) {
    const { flags } = this;
    return keys.reduce((acc, key) => acc | flags[key], 0n);
  }
}
