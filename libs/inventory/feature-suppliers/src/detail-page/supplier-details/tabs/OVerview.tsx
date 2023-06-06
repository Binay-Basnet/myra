import { DetailPageQuickLinks } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

import {
  AdditionalFieldsSuppliers,
  AddressSuppliers,
  ContactPersonSuppliers,
  DocumentPage,
  GeneralInformationSuppliers,
} from '../components';

const links = [
  {
    title: 'New Supplier',
    link: `${ROUTES.INVENTORY_SUPPLIERS_ADD}`,
  },
];
export const Overview = () => (
  <>
    <DetailPageQuickLinks links={links} />
    <GeneralInformationSuppliers />
    <AddressSuppliers />
    <ContactPersonSuppliers />
    <AdditionalFieldsSuppliers />
    <DocumentPage />
  </>
);
