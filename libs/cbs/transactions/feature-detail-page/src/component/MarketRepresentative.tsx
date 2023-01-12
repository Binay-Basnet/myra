import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import { useTransactionDetailHooks } from '../hooks/useTransactionDetailHooks';

export const MarketRepresentative = () => {
  const { t } = useTranslation();
  const { withdrawDetailData } = useTransactionDetailHooks();

  return (
    <DetailsCard title={t['transDetailMarketRepresentativeDetails']}>
      <DetailCardContent
        title={t['transDetailName']}
        subtitle={withdrawDetailData?.marketRepName}
      />
      <DetailCardContent title={t['transDetailId']} subtitle={withdrawDetailData?.marketRepId} />
    </DetailsCard>
  );
};
