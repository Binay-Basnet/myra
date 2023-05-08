import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { usePurchaseDetailsHook } from '../hooks/usePurchaseEntry';

export const GeneralInformationPurchaseEntry = () => {
  const { detailData } = usePurchaseDetailsHook();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Bill No" subtitle={detailData?.billNo} />

      <DetailCardContent title="Supplier Name" subtitle={detailData?.supplierName} />
      <DetailCardContent
        title="Supplier Invoice Reference"
        subtitle={detailData?.invoiceReference}
      />
      <DetailCardContent title="Invoice Date" subtitle={localizedDate(detailData?.invoiceDate)} />
      <DetailCardContent title="Due Date" subtitle={localizedDate(detailData?.dueDate)} />
    </DetailsCard>
  );
};
