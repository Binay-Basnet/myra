import { AlternativeChannelServiceType } from '@coop/cbs/data-access';
import { PageHeader } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { ACTable } from '../components/ACTable';

export const SMSBankingUsersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader heading={`${t['acUsers']}`} />
      <ACTable serviceType={AlternativeChannelServiceType.SmsBanking} />
    </>
  );
};

export default SMSBankingUsersList;
