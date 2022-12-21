import { Box, WIPState } from '@myra-ui';

import {
  SettingsCodeManagementLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const InventoryCodeManagementPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" pt="s60">
    <WIPState />
  </Box>
);

export default InventoryCodeManagementPage;
InventoryCodeManagementPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsCodeManagementLayout>{page}</SettingsCodeManagementLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
