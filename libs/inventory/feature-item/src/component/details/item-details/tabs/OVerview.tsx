import {
  AdditionalInformationItems,
  GeneralInformationItems,
  LedgerMapping,
  VariantEntries,
} from '../components';

export const Overview = () => (
  <>
    <GeneralInformationItems />
    <VariantEntries />
    <LedgerMapping />
    <AdditionalInformationItems />
  </>
);
