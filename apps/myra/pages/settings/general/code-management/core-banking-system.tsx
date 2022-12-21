import { CbsSettingsFeatureMembers } from '@coop/cbs/settings/members';
import {
  SettingsCodeManagementLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { CoreBankingSystemCodeManagement } from 'libs/cbs/settings/feature-code-management/src';

const CBSCodeManagementPage = () => <CoreBankingSystemCodeManagement />;

export default CBSCodeManagementPage;
CBSCodeManagementPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsCodeManagementLayout>{page}</SettingsCodeManagementLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
