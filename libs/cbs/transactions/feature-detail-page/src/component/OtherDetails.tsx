import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

type OtherDetailProps = {
  branch: string;
  teller: string;
};

export const OtherDetails = ({ branch, teller }: OtherDetailProps) => {
  const { t } = useTranslation();

  return (
    <DetailsCard title={t['transDetailOtherDetails']} hasThreeRows>
      <DetailCardContent title={t['transDetailTransactionBranch']} subtitle={branch} />
      <DetailCardContent title="User" subtitle={teller} />
    </DetailsCard>
  );
};
