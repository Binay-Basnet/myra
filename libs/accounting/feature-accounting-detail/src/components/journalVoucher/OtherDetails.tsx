import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

type OtherDataProps = {
  otherData: { tellerName: string | undefined | null; serviceCenter: string | undefined | null };
};

export const OtherDetails = ({ otherData }: OtherDataProps) => {
  const { t } = useTranslation();
  return (
    <DetailsCard title={t['transDetailOtherDetails']} hasThreeRows>
      <DetailCardContent title="User" subtitle={otherData?.tellerName} />
      <DetailCardContent title="Transaction Service Center" subtitle={otherData?.serviceCenter} />
    </DetailsCard>
  );
};
