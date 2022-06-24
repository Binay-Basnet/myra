import { getKymSection } from '../getKymSection';

describe('getKymSection should function as expected', () => {
  test('should give correct kym section when expected id is received', () => {
    expect(getKymSection('temporaryLocalityId')).toEqual({
      section: 'personalDetails',
      subSection: 'kymAccIndTemporaryAddress',
    });
    expect(getKymSection('middleName')).toEqual({
      section: 'personalDetails',
      subSection: 'kymAccIndBasicInformation',
    });
    expect(getKymSection('estimatedAnnualDepositAmount')).toEqual({
      section: "COOPmembership",
     subSection: "kymAccIndEstimatedWithdrawDepositAmountintheInstitureion",
    });
  });
  test('gives undefined when random unexpected id is received', () => {
    expect(getKymSection('randomId')).toEqual(undefined);
  });
});
