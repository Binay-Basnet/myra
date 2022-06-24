import { getKymCoopSection } from '../getKymCoopSection';

describe('getKymCoopSection should function as expected', () => {
  test('should give correct kym coop section when expected id is received', () => {
    expect(getKymCoopSection('totalEquityAndLiabilities')).toEqual({
      section: 'economicDetails',
      subSection: 'kymCoopAccEquityandLiabilities',
    });
    expect(getKymCoopSection('accountHoldersName')).toEqual({
      section: 'declaration',
      subSection: 'kymCoopAccDocumentDeclaration',
    });
    expect(getKymCoopSection('investments')).toEqual({
      section: 'economicDetails',
      subSection: 'kymCoopAccAssets',
    });
  });
  test('gives undefined when random unexpected id is received', () => {
    expect(getKymCoopSection('randomId')).toEqual(undefined);
  });
});
