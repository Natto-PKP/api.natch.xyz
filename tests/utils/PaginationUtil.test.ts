import Pagination from '../../src/utils/Pagination.util';

const DEFAULT_LIMIT = 100;
const DEFAULT_MIN_LIMIT = 0;
const DEFAULT_MAX_LIMIT = 200;

it('Get records limit', () => {
  const minLimit = Pagination.getLimit(DEFAULT_MIN_LIMIT - 1, DEFAULT_MIN_LIMIT, DEFAULT_MAX_LIMIT);
  expect(minLimit).toBe(DEFAULT_MIN_LIMIT);
  const maxLimit = Pagination.getLimit(DEFAULT_MAX_LIMIT + 1, DEFAULT_MIN_LIMIT, DEFAULT_MAX_LIMIT);
  expect(maxLimit).toBe(DEFAULT_MAX_LIMIT);
  const limit = Pagination.getLimit(DEFAULT_LIMIT, DEFAULT_MIN_LIMIT, DEFAULT_MAX_LIMIT);
  expect(limit).toBe(DEFAULT_LIMIT);
});

it('Get page', () => {
  expect(Pagination.getPage(-1)).toBe(0);
  expect(Pagination.getPage(12)).toBe(12);
});

it('Calculate offset', () => {
  expect(Pagination.calcOffset(12, DEFAULT_LIMIT)).toBe(12 * DEFAULT_LIMIT);
});
