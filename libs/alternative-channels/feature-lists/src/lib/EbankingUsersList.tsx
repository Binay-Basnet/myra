import { PageHeader } from '@myra-ui';

import { AlternativeChannelServiceType } from '@coop/cbs/data-access';
import { useTranslation } from '@coop/shared/utils';

import { ACTable } from '../components/ACTable';

export const EbankingUsersList = () => {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader heading={`${t['acEBanking']}`} />
      <ACTable serviceType={AlternativeChannelServiceType.Ebanking} />
    </>
  );
};

export default EbankingUsersList;
