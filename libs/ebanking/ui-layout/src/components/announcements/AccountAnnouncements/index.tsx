import { Box } from '@coop/shared/ui';

import { AnnouncementAccountAccordion } from '../AnnouncementAccountAccordion';
import { AnnouncementFooter } from '../AnnouncementFooter';

export const AccountAnnouncements = () => {
  return (
    <Box display="flex" flexDir="column" gap="s16">
      <AnnouncementAccountAccordion />
      <AnnouncementFooter />
    </Box>
  );
};
