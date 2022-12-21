import { PageHeader } from '@myra-ui';

import { AlternativeChannelServiceType } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { ACTable } from '../components/ACTable';

export const MobileBankingUsersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader heading={`${t['acMBanking']}`} />
      <ACTable serviceType={AlternativeChannelServiceType.MobileBanking} />
    </>
  );
};

export default MobileBankingUsersList;
