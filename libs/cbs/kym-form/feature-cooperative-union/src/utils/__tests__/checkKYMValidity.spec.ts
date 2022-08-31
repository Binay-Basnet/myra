import { checkKYMValidity } from '../checkKYMValidity';

test('KYM Data Validity Test #1', () => {
  expect(checkKYMValidity({})).toBe(false);
});

test('KYM Data Validity Test #2', () => {
  expect(
    checkKYMValidity({
      test1: { errors: null, incomplete: null },
      test2: { errors: null, incomplete: null },
      test3: { errors: null, incomplete: null },
      test4: { errors: null, incomplete: null },
      test5: { errors: null, incomplete: null },
    })
  ).toBe(true);
});

test('KYM Data Validity Test #3', () => {
  expect(
    checkKYMValidity({
      test1: [
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
      ],
      test2: [
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
      ],
    })
  ).toBe(true);
});

test('KYM Data Validity Test #4', () => {
  expect(
    checkKYMValidity({
      test1: [
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
      ],
      test2: [
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
        { errors: null, incomplete: null },
      ],
      test3: { errors: null, incomplete: null },
      test4: { errors: null, incomplete: null },
    })
  ).toBe(true);
});

test('KYM Data Validity Test #5', () => {
  expect(
    checkKYMValidity({
      test1: {
        errors: [
          { incomplete: ['TEST'], sectionName: 'TEST' },
          { incomplete: ['TEST'], sectionName: 'TEST' },
        ],
        incomplete: [
          { incomplete: ['TEST'], sectionName: 'TEST' },
          { incomplete: ['TEST'], sectionName: 'TEST' },
        ],
      },
      test2: { errors: null, incomplete: null },
      test3: {
        errors: [
          { incomplete: ['TEST'], sectionName: 'TEST' },
          { incomplete: ['TEST'], sectionName: 'TEST' },
          { incomplete: ['TEST'], sectionName: 'TEST' },
        ],
        incomplete: [
          { incomplete: ['TEST'], sectionName: 'TEST' },
          { incomplete: ['TEST'], sectionName: 'TEST' },
        ],
      },
      test4: { errors: null, incomplete: null },
    })
  ).toBe(true);
});
