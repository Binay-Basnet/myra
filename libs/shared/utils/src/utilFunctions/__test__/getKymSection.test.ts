import { getKymSection } from '../getKymSection';

describe('getKymSection should function as expected', () => {
  test('should give correct kym section when expected id is received', () => {
    expect(getKymSection('temporaryLocalityId')).toEqual({
      section: 'personalDetails',
      subSection: 'Temporary Address',
    });
  });
  test('gives undefined when random unexpected id is received', () => {
    expect(getKymSection('randomId')).toEqual(undefined);
  });
});
