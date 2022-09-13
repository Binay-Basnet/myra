import { CbsSettingsFeatureDepositIROSetup } from '@coop/cbs/settings/deposit';
import {
  SettingsDepositLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const IROSetup = () => <CbsSettingsFeatureDepositIROSetup />;

export default IROSetup;

IROSetup.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsDepositLayout>{page}</SettingsDepositLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
