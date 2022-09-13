import {
  SettingsLayout,
  SettingsUserLayout,
} from '@coop/cbs/settings/ui-layout';
import { Box, WIPState } from '@coop/shared/ui';

const RoleReferences = () =>
  //   return <RoleReferencesList />;

   (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  )
;

export default RoleReferences;
RoleReferences.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsUserLayout>{page}</SettingsUserLayout>
    </SettingsLayout>
  );
};
