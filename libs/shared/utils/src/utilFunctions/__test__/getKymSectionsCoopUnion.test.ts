import { getKymSectionCoOperativeUnion } from '../getKymSectionsCoopUnion';

describe('getKymSection should function as expected', () => {
  test('should give correct kym section when expected id is received', () => {
    expect(getKymSectionCoOperativeUnion('incomeFromSales')).toEqual({
      section: 'economicDetails',
      subSection: 'kymCoopUnionAccIncomeDetails',
    });
    expect(getKymSectionCoOperativeUnion('shareCapitalCurrent')).toEqual({
      section: 'economicDetails',
      subSection: 'kymCoopUnionAccEquityandLiailibities',
    });
    expect(getKymSectionCoOperativeUnion('vatOrPan')).toEqual({
      section: 'organizationInfo',
      subSection: 'kymCoopUnionAccBasicInformation',
    });
  });
  test('gives undefined when random unexpected id is received', () => {
    expect(getKymSectionCoOperativeUnion('randomId')).toEqual(undefined);
  });
});
