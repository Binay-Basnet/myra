import { DetailCardContent, DetailsCard } from '@myra-ui';

import { localizedDate } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

type DetailDataType = {
  detailData: {
    id: string | null | undefined;
    dueDate: Record<'local' | 'en' | 'np', string> | null | undefined;
    reference: string | null | undefined;
    note?: string | null | undefined;
  };
};

export const TransactionDetails = ({ detailData }: DetailDataType) => {
  const { t } = useTranslation();
  return (
    <DetailsCard title={t['transDetailTransactionDetails']} hasThreeRows>
      <DetailCardContent title="ID" subtitle={detailData?.id} />
      <DetailCardContent title="Due Date" subtitle={localizedDate(detailData?.dueDate)} />
      <DetailCardContent title="Reference" subtitle={detailData?.reference} />
      {detailData?.note && <DetailCardContent title="Note" subtitle={detailData?.note} />}
    </DetailsCard>
  );
};
