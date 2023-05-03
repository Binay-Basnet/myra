import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useCustomerDetailsHook } from '../hooks/useCreditNote';

export const GeneralInformationCustomer = () => {
  const { detailData } = useCustomerDetailsHook();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Customer's Name" subtitle={detailData?.name} />

      <DetailCardContent title="Code" subtitle={detailData?.code} />
      <DetailCardContent title="Phone Number" subtitle={detailData?.phoneNumber} />
    </DetailsCard>
  );
};
