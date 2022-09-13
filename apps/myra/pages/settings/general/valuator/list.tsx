import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureValuatorList } from '@coop/cbs/settings/valuator';

const ValuatorList = () => <CbsSettingsFeatureValuatorList />;

export default ValuatorList;

ValuatorList.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
