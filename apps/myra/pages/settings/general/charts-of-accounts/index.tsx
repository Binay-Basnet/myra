import { useRouter } from 'next/router';

import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { AccountList, FullView } from '@coop/myra/components';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const ChartsOfAccounts = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const tabList = [
    {
      title: 'settingsCoaFullView',
      key: 'full-view',
    },
    {
      title: 'settingsCoaAccountList',
      key: 'account-list',
    },
  ];

  return (
    <Box width="full">
      <SettingsPageHeader
        heading={t['settingsCoa']}
        tabItems={tabList}
        buttonLabel={t['settingsCoaNewAccount']}
        buttonHandler={() =>
          router.push('/settings/general/charts-of-accounts/add-new-account')
        }
      />
      <Box>
        {(router.query['objState'] === 'full-view' ||
          !router.query['objState']) && <FullView />}
        {router.query['objState'] === 'account-list' && <AccountList />}
      </Box>
    </Box>
  );
};

export default ChartsOfAccounts;
ChartsOfAccounts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
