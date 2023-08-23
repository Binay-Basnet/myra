import { Box } from '@myra-ui';

import { CoaTreeTableView } from '@coop/cbs/settings/coa';
import {
  SettingsGlobalLayout,
  SettingsLayout,
  SettingsPageHeader,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';
import { featureCode, useTranslation } from '@coop/shared/utils';

const ChartsOfAccounts = () => {
  const { t } = useTranslation();
  // const router = useRouter();

  // const tabList = [
  //   {
  //     title: 'settingsCoaFullView',
  //     key: 'full-view',
  //   },
  //   {
  //     title: 'settingsCoaAccountList',
  //     key: 'account-list',
  //   },
  // ];

  return (
    <Can I="SHOW_IN_MENU" a="SETTINGS_COA" showError isErrorCentered>
      <Box width="full">
        <SettingsPageHeader
          heading={`${t['settingsCoa']} - ${featureCode?.coaList}`}
          // tabItems={tabList}
          // buttonLabel={t['settingsCoaNewAccount']}
          // buttonHandler={() => router.push('/settings/general/charts-of-accounts/add-new-account')}
        />
        <Box>
          <CoaTreeTableView />
          {/* {(router.query['objState'] === 'full-view' ||
            (!router.query['objState'] && !router.query['search'])) && <CoaTreeTableView />}
          {(router.query['objState'] === 'account-list' || router.query['search']) && (
            <COAListView />
          )} */}
        </Box>
      </Box>
    </Can>
  );
};

export default ChartsOfAccounts;
ChartsOfAccounts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGlobalLayout>{page}</SettingsGlobalLayout>
    </SettingsLayout>
  );
};