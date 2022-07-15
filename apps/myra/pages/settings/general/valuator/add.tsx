import { SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsFeatureValuatorAdd } from '@coop/cbs/settings/valuator';

const ValuatorAdd = () => {
  return <CbsSettingsFeatureValuatorAdd />;
};

export default ValuatorAdd;

ValuatorAdd.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
