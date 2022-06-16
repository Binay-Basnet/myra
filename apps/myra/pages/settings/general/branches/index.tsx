import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';
import { SettingsBranchesTable } from '@coop/myra/components';

const Branches = () => {
  return <SettingsBranchesTable />;
};

export default Branches;
Branches.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
