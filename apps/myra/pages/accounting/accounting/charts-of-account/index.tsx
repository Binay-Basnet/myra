import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import { AccountingLayout, AccountingSidebarLayout } from '@coop/accounting/ui-layouts';
import { COAListView, CoaTreeTableView } from '@coop/cbs/settings/coa';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';
import { featureCode, useTranslation } from '@coop/shared/utils';

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
        heading={`${t['settingsCoa']} - ${featureCode?.coaList}`}
        tabItems={tabList}
        // buttonLabel={t['settingsCoaNewAccount']}
        // buttonHandler={() => router.push('/settings/general/charts-of-accounts/add-new-account')}
      />
      <Box>
        {(router.query['objState'] === 'full-view' || !router.query['objState']) && (
          <CoaTreeTableView />
        )}
        {router.query['objState'] === 'account-list' && <COAListView />}
      </Box>
    </Box>
  );
};

export default ChartsOfAccounts;
ChartsOfAccounts.getLayout = function getLayout(page) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
