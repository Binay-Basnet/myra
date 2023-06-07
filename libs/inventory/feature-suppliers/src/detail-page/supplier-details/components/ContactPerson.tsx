import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useSupplierDetails } from '../hooks/useSuppliersDetails';

export const ContactPersonSuppliers = () => {
  const { detailData } = useSupplierDetails();

  return (
    <DetailsCard title="Contact Person" bg="white" hasThreeRows>
      <DetailCardContent title="Name" subtitle={detailData?.contactPersonName} />

      <DetailCardContent title="Phone Number" subtitle={detailData?.contactPersonPhoneNo} />
    </DetailsCard>
  );
};
