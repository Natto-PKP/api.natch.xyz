import FlagsManager from '../../src/managers/Flags.manager';

const flags = {
  BASIC: 1n << 0n,
  PREMIUM: 2n << 0n,
  SUPER_PREMIUM: 3n << 0n,
};

const StatusManager = new FlagsManager(flags);

it('Has a specific flag', () => {
  expect(StatusManager.has('BASIC', flags.BASIC | flags.PREMIUM)).toBeTruthy();
  expect(StatusManager.has('SUPER_PREMIUM', flags.BASIC)).toBeFalsy();
});

it('Get flags from a bigint', () => {
  const currentFlags = StatusManager.resolve(flags.PREMIUM | flags.BASIC);
  expect(currentFlags).toContain('BASIC');
  expect(currentFlags).toContain('PREMIUM');
});

it('Create bigint from flags', () => {
  const bit = StatusManager.merge(['BASIC', 'PREMIUM']);
  expect(bit).toBe(flags.BASIC | flags.PREMIUM);
});
