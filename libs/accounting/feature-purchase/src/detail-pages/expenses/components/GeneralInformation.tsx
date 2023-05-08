import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';

import { useExpensesDetailsHook } from '../hooks/useExpensesDetailsHook';

export const GeneralInformationExpenses = () => {
  const { detailData } = useExpensesDetailsHook();

  return (
    <DetailsCard title="General Information" bg="white" hasThreeRows>
      <DetailCardContent title="Bill No" subtitle={detailData?.billNo} />

      <DetailCardContent title="Customer Name" subtitle={detailData?.supplierName} />
      <DetailCardContent
        title="Supplier Invoice Reference"
        subtitle={detailData?.invoiceReference}
      />
      <DetailCardContent title="Invoice Date" subtitle={localizedDate(detailData?.invoiceDate)} />
      <DetailCardContent title="Due Date" subtitle={localizedDate(detailData?.dueDate)} />
    </DetailsCard>
  );
};
