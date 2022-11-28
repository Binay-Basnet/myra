import { AlternativeChannelServiceType } from '@coop/cbs/data-access';
import { PageHeader } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { ACTable } from '../components/ACTable';

export const MobileBankingUsersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader heading={`${t['acUsers']}`} />
      <ACTable serviceType={AlternativeChannelServiceType.MobileBanking} />
    </>
  );
};

export default MobileBankingUsersList;
