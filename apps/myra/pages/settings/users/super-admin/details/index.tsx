import { SettingsLayout, SettingsUserLayout } from '@coop/cbs/settings/ui-layout';
import { CbsSettingsUserDetailsPage } from '@coop/settings/users/details';

const Users = () => <CbsSettingsUserDetailsPage />;

export default Users;
Users.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsUserLayout>{page}</SettingsUserLayout>
    </SettingsLayout>
  );
};
