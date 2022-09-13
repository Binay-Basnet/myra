import {
  SettingsLayout,
  SettingsUserLayout,
} from '@coop/cbs/settings/ui-layout';
import { Box, WIPState } from '@coop/shared/ui';

const OtherUsers = () =>
  //   return <OtherUsersList />;

   (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  )
;

export default OtherUsers;
OtherUsers.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsUserLayout>{page}</SettingsUserLayout>
    </SettingsLayout>
  );
};
