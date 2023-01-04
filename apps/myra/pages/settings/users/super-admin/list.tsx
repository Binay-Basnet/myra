import { UsersList } from '@coop/cbs/settings/super-admin';
import { SettingsLayout, SettingsUserLayout } from '@coop/cbs/settings/ui-layout';

const Users = () => <UsersList />;

export default Users;
Users.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsUserLayout>{page}</SettingsUserLayout>
    </SettingsLayout>
  );
};
