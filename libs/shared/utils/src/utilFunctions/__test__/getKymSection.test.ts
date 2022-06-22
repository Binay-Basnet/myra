import { getKymSection } from '../getKymSection';

describe('getKymSection should function as expected', () => {
  test('when a node gets deleted its connected edge also gets deleted', () => {
    expect(getKymSection('temporaryLocalityId')).toEqual({
      section: 'personalDetails',
      subSection: 'Temporary Address',
    });
  });
});
