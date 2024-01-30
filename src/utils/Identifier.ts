const numbers = '0123456789'.split('');
const lowers = 'abcdefghijklmnopqrstuvwxyz'.split('');
const uppers = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
const specials = '!@#$%^&*()_+~`|}{[]:;?><,./-='.split('');

const DEFAULT_LENGTH = 8;
const DEFAULT_CHARACTERS = ['lower', 'upper'];

type BaseOptions = {
  characters: ('number' | 'lower' | 'upper' | 'special')[];
  length: number;
};

export class Identifier {
  static generate(options?: Partial<BaseOptions>) {
    const length = options?.length || DEFAULT_LENGTH;
    const characters = (options?.characters?.length && options.characters) || DEFAULT_CHARACTERS;

    const arr: string[] = [];
    if (characters.includes('lower')) arr.push(...lowers);
    if (characters.includes('upper')) arr.push(...uppers);
    if (characters.includes('number')) arr.push(...numbers);
    if (characters.includes('special')) arr.push(...specials);

    const result = Array.from({ length }, () => arr[Math.floor(Math.random() * arr.length)]);
    return result.join('');
  }

  static batch(count: number, options?: Partial<BaseOptions>) {
    return Array.from({ length: count }, () => Identifier.generate(options));
  }
}
