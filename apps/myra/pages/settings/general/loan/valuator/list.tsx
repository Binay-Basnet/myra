import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsLoanLayout,
} from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureValuatorList } from '@coop/cbs/settings/valuator';

const ValuatorPage = () => <CbsSettingsFeatureValuatorList />;

export default ValuatorPage;

ValuatorPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsLoanLayout>{page}</SettingsLoanLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
