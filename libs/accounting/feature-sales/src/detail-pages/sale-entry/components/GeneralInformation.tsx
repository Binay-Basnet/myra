import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useSalesDetailsHooks } from '../hooks/useSalesEntry';

export const GeneralInformationSalesNote = () => {
  const { detailData } = useSalesDetailsHooks();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Order No" subtitle={detailData?.invoiceNo} />

      <DetailCardContent title="Customer Name" subtitle={detailData?.customerName} />
      <DetailCardContent title="Refrence NO" subtitle={detailData?.reference} />
      <DetailCardContent title="Invoice Date" subtitle={localizedDate(detailData?.invoiceDate)} />
      <DetailCardContent title="Due Date" subtitle={localizedDate(detailData?.dueDate)} />
    </DetailsCard>
  );
};
