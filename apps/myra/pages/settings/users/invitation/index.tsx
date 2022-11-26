import { SettingsLayout, SettingsUserLayout } from '@coop/cbs/settings/ui-layout';
import { Box, WIPState } from '@myra-ui';

const InvitationList = () => (
  //   return <InvitationListList />;

  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);
export default InvitationList;
InvitationList.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsUserLayout>{page}</SettingsUserLayout>
    </SettingsLayout>
  );
};
