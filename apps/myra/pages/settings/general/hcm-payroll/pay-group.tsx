import { PayGroup } from '@coop/cbs/settings/feature-hcm';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsPayrollLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

export const PayGroupPage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_HCM_EMPLOYEE" showError isErrorCentered>
    <PayGroup />
  </Can>
);

PayGroupPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsPayrollLayout>{page}</SettingsPayrollLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default PayGroupPage;
