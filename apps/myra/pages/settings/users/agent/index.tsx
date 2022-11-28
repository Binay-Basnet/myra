import { SettingsLayout, SettingsUserLayout } from '@coop/cbs/settings/ui-layout';
import { Box, WIPState } from '@myra-ui';

const AgentList = () => (
  //   return <AgentListList />;

  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);
export default AgentList;
AgentList.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsUserLayout>{page}</SettingsUserLayout>
    </SettingsLayout>
  );
};
