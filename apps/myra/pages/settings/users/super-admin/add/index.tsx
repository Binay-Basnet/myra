import { AddUser } from '@coop/cbs/settings/super-admin';
import { SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Users = () => <AddUser />;

export default Users;
Users.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
