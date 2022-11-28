import { Box } from '@myra-ui';

import { AnnouncementBasicAccordion } from '../AnnouncementBasicAccordion';
import { AnnouncementFooter } from '../AnnouncementFooter';

export const DefaultAnnouncements = () => (
  <Box display="flex" flexDir="column" gap="s16">
    <AnnouncementBasicAccordion />
    <AnnouncementFooter />
  </Box>
);
