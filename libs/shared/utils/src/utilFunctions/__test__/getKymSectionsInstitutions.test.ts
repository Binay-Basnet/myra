import { getKymSectionInstitution } from '../getKymSectionsInstitutions';

describe('getKymSection should function as expected', () => {
  test('should give correct kym section when expected id is received', () => {
    expect(getKymSectionInstitution('natureOfTransaction')).toEqual({
      section: 'transactionProfile',
      subSection: 'kymInsTransactionProfile',
    });
    expect(getKymSectionInstitution('registeredAddressIfChanged')).toEqual({
      section: 'organizationInfo',
      subSection: 'kymInsRegisteredDetails',
    });
    expect(getKymSectionInstitution('institutionName')).toEqual({
      section: 'organizationInfo',
      subSection: 'kymInsBasicInformation',
    });
  });
  test('gives undefined when random unexpected id is received', () => {
    expect(getKymSectionInstitution('randomId')).toEqual(undefined);
  });
});
