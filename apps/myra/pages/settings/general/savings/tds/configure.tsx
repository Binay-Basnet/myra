import { CbsSettingsFeatureDepositTDS } from '@coop/cbs/settings/deposit';
import {
  SettingsDepositLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const TDS = () => <CbsSettingsFeatureDepositTDS />;

export default TDS;

TDS.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsDepositLayout>{page}</SettingsDepositLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
