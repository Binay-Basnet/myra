import { AdditionalSuppliers } from '../SupplierAdditionalFields';
import { AddressDetailsSuppliers } from '../SupplierAddress';
import { BasicDetailsSuppliers } from '../SuppliersBasic';
import { ContactPersonSuppliers } from '../SuppliersContactPerson';
import { DocumentsSuppliers } from '../SuppliersDocuments';

export const AddSupplierForm = () => (
  <>
    <BasicDetailsSuppliers />
    <AddressDetailsSuppliers />
    <ContactPersonSuppliers />
    <AdditionalSuppliers />
    <DocumentsSuppliers />
  </>
);
