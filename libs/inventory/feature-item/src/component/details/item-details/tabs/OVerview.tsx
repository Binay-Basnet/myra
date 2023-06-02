import { DetailPageQuickLinks } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import {
  AdditionalInformationItems,
  GeneralInformationItems,
  LedgerMapping,
  VariantEntries,
} from '../components';

const links = [
  {
    title: 'New Item',
    link: `${ROUTES.INVENTORY_ITEMS_ADD}`,
  },
];
export const Overview = () => (
  <>
    <DetailPageQuickLinks links={links} />
    <GeneralInformationItems />
    <VariantEntries />
    <LedgerMapping />
    <AdditionalInformationItems />
  </>
);
