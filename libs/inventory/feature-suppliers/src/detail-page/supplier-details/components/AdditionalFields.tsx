import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useSupplierDetails } from '../hooks/useSuppliersDetails';

export const AdditionalFieldsSuppliers = () => {
  const { detailData } = useSupplierDetails();

  return (
    <DetailsCard title="Additional Fields" bg="white" hasThreeRows>
      <DetailCardContent title="Opening Balance" subtitle={detailData?.openingBalance} />

      <DetailCardContent title="Credit Terms" subtitle={detailData?.creditTerms} />
      <DetailCardContent title="Credit Limit" subtitle={detailData?.creditLimit} />
    </DetailsCard>
  );
};
