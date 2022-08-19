import { CbsSettingsFeatureServiceCenterNew } from '@coop/cbs/settings/branches';
import { SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Branches = () => {
  return <CbsSettingsFeatureServiceCenterNew />;
};

export default Branches;
Branches.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
