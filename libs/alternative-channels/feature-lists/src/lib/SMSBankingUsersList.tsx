import { PageHeader } from '@myra-ui';

import { AlternativeChannelServiceType } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { ACTable } from '../components/ACTable';

export const SMSBankingUsersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader heading={`${t['acSMSBanking']}`} />
      <ACTable serviceType={AlternativeChannelServiceType.SmsBanking} />
    </>
  );
};

export default SMSBankingUsersList;
