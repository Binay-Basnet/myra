import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

type DetailDataType = {
  detailData: {
    id: string | null | undefined;
    date: string | null | undefined;
    reference: string | null | undefined;
    note: string | null | undefined;
  };
};

export const TransactionDetails = ({ detailData }: DetailDataType) => {
  const { t } = useTranslation();
  return (
    <DetailsCard title={t['transDetailTransactionDetails']} hasThreeRows>
      <DetailCardContent title="ID" subtitle={detailData?.id} />
      <DetailCardContent title="Date" subtitle={detailData?.date} />
      <DetailCardContent title="Reference" subtitle={detailData?.reference} />
      <DetailCardContent title="Note" subtitle={detailData?.note} />
    </DetailsCard>
  );
};
