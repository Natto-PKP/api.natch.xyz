import Identifier from '../../src/utils/Identifier.util';

const DEFAULT_LENGTH = 8;
const DEFAULT_LOWERCASE_IDENTIFIER = 'azertyui';
const DEFAULT_UPPERCASE_IDENTIFIER = 'AZERTYUI';
const DEFAULT_NUMBER_IDENTIFIER = '01234567';
const DEFAULT_IDENTIFIER = 'azERtY01';

it('Generate identifiers', () => {
  const lowercaseIdentifier = Identifier.generate({ characters: ['lower'], length: DEFAULT_LENGTH });
  expect(lowercaseIdentifier).toMatch(new RegExp(`^[a-z]{${DEFAULT_LENGTH}}$`));
  const uppercaseIdentifier = Identifier.generate({ characters: ['upper'], length: DEFAULT_LENGTH });
  expect(uppercaseIdentifier).toMatch(new RegExp(`^[A-Z]{${DEFAULT_LENGTH}}$`));
  const numberIdentifier = Identifier.generate({ characters: ['number'], length: DEFAULT_LENGTH });
  expect(numberIdentifier).toMatch(new RegExp(`^[0-9]{${DEFAULT_LENGTH}}$`));
  const identifier = Identifier.generate({ characters: ['number', 'lower', 'upper'], length: DEFAULT_LENGTH });
  expect(identifier).toMatch(new RegExp(`^[0-9a-zA-Z]{${DEFAULT_LENGTH}}$`));
});

it('Check if is identifiers', () => {
  const lowercaseIdentifierCheck = Identifier.isIdentifier(DEFAULT_LOWERCASE_IDENTIFIER, { characters: ['lower'], length: DEFAULT_LENGTH });
  expect(lowercaseIdentifierCheck).toBeTruthy();
  const uppercaseIdentifierCheck = Identifier.isIdentifier(DEFAULT_UPPERCASE_IDENTIFIER, { characters: ['upper'], length: DEFAULT_LENGTH });
  expect(uppercaseIdentifierCheck).toBeTruthy();
  const numberIdentifierCheck = Identifier.isIdentifier(DEFAULT_NUMBER_IDENTIFIER, { characters: ['number'], length: DEFAULT_LENGTH });
  expect(numberIdentifierCheck).toBeTruthy();
  const identifierCheck = Identifier.isIdentifier(DEFAULT_IDENTIFIER, { characters: ['lower', 'number', 'upper'], length: DEFAULT_LENGTH });
  expect(identifierCheck).toBeTruthy();
});
