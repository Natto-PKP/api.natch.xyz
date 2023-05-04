import RegexpUtil from '../../src/utils/Regexp.util';

const DEFAULT_UUID = 'f0edd35d-75de-42f7-8e30-6a07b76dd6ba';

it('Check if is UUID', () => {
  expect(RegexpUtil.isUUID(DEFAULT_UUID)).toBeTruthy();
  expect(RegexpUtil.isUUID('ferret')).toBeFalsy();
});
