import { SettingsBranchesTable } from '@coop/myra/components';

import GeneralLayout from '../../../../components/SettingsLayout/GeneralLayout';
const Branches = () => {
  return <SettingsBranchesTable />;
};

export default Branches;
Branches.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};
