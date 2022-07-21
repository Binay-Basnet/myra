import { Box } from '@coop/shared/ui';

import { AnnouncementBasicAccordion } from '../AnnouncementBasicAccordion';
import { AnnouncementFooter } from '../AnnouncementFooter';

export const DefaultAnnouncements = () => {
  return (
    <Box display="flex" flexDir="column" gap="s16">
      <AnnouncementBasicAccordion />
      <AnnouncementFooter />
    </Box>
  );
};
