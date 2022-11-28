import { Box } from '@myra-ui';

import { AnnouncementAccountAccordion } from '../AnnouncementAccountAccordion';
import { AnnouncementFooter } from '../AnnouncementFooter';

export const AccountAnnouncements = () => (
  <Box display="flex" flexDir="column" gap="s16">
    <AnnouncementAccountAccordion />
    <AnnouncementFooter />
  </Box>
);
