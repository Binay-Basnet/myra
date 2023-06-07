import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useSupplierDetails } from '../hooks/useSuppliersDetails';

export const AddressSuppliers = () => {
  const { detailData } = useSupplierDetails();

  return (
    <DetailsCard title="Address Details" bg="white" hasThreeRows>
      <DetailCardContent title="Province" subtitle={detailData?.location?.state?.local ?? '-'} />
      <DetailCardContent title="District" subtitle={detailData?.location?.district?.local ?? '-'} />
      <DetailCardContent
        title="Local Government"
        subtitle={detailData?.location?.localGovernment?.local ?? '-'}
      />
      <DetailCardContent title="Ward No" subtitle={detailData?.location?.wardNo ?? '-'} />
      <DetailCardContent title="Locality" subtitle={detailData?.location?.locality?.local ?? '-'} />
      <DetailCardContent title="House No" subtitle={detailData?.location?.houseNo ?? '-'} />
    </DetailsCard>
  );
};
