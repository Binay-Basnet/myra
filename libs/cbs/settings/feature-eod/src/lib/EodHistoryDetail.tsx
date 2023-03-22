import { Box, DetailPageTabs, Scrollable } from '@myra-ui';

import { SettingsCard } from '@coop/cbs/settings/ui-components';
import { SettingsPageHeader } from '@coop/cbs/settings/ui-layout';

/* eslint-disable-next-line */
export interface EodHistoryDetailProps {}

export const EodHistoryDetail = () => (
  <>
    <SettingsPageHeader heading="Day End" />

    <Box display="flex">
      <Box
        bg="gray.0"
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        borderRight="1px"
        borderRightColor="border.layout"
      >
        <DetailPageTabs
          tabs={[
            'Daily Interest Booking',
            'Account List',
            'Active Accounts',
            'Inactive Accounts',
            'Interest Update',
            // 'ACTIVITY', 'DOCUMENTS', 'TASKS'
          ]}
        />
      </Box>

      <Scrollable detailPage>
        <Box ml="320px" p="s16" display="flex" flexDir="column" gap="s16">
          <SettingsCard title="Share" subtitle="Change how share code are generated">
            Day end detail
          </SettingsCard>
        </Box>
      </Scrollable>
    </Box>
  </>
);

export default EodHistoryDetail;
