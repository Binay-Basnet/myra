import { SettingsLayout, SettingsUserLayout } from '@coop/cbs/settings/ui-layout';
import { Box, WIPState } from '@myra-ui';

const ServiceCenterManager = () => (
  //   return <ServiceCenterManagerList />;

  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);
export default ServiceCenterManager;
ServiceCenterManager.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsUserLayout>{page}</SettingsUserLayout>
    </SettingsLayout>
  );
};
