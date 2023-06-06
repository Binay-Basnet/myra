import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useSupplierDetails } from '../hooks/useSuppliersDetails';

export const GeneralInformationSuppliers = () => {
  const { detailData } = useSupplierDetails();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Supplier Name" subtitle={detailData?.supplierName} />

      <DetailCardContent title="Supplier Code" subtitle={detailData?.supplierCode} />
      <DetailCardContent title="PAN No" subtitle={detailData?.panNo} />
      <DetailCardContent title="Contact Number" subtitle={detailData?.contactNo} />
      <DetailCardContent title="Email" subtitle={detailData?.email} />
    </DetailsCard>
  );
};
