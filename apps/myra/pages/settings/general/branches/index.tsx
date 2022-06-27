import { CbsSettingsFeatureBranches } from '@coop/cbs/settings/branches';
import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const Branches = () => {
  return <CbsSettingsFeatureBranches />;
};

export default Branches;
Branches.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
