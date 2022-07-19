import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

import { AnnouncementCard } from '../AnnouncementCard';
import { AnnouncementsAccBtn } from '../AnnouncementsAccBtn';

export const AnnouncementBasicAccordion = () => {
  return (
    <Accordion allowMultiple={true} allowToggle={true} border="none">
      <AccordionItem borderRadius={0} border="none" bg="transparent">
        {({ isExpanded }) => (
          <>
            <AnnouncementsAccBtn
              isExpanded={isExpanded}
              label="Announcements"
            />
            <AccordionPanel p="0">
              <AnnouncementCard
                title="Interest rate has been changed from 5.6% to 7%."
                subtitle="2079-02-16, 4:21 PM"
              />
              <AnnouncementCard
                title="We’ve listened to your feedback and added the option to hide account balance. See all the changes in the update log."
                subtitle="2079-01-10, 10:00 AM"
              />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

      <AccordionItem border="none" bg="transparent">
        {({ isExpanded }) => (
          <>
            <AnnouncementsAccBtn isExpanded={isExpanded} label="Offers" />
            <AccordionPanel p="0">
              <AnnouncementCard
                title="Get 5% cashback on every NTC topup. Offer Valid till end of Shrawan."
                subtitle="2079-02-16, 4:21 PM"
              />
              <AnnouncementCard
                title="Get a chance to win VIVO smartphone with Yeti Airlines. "
                subtitle="2079-01-10, 10:00 AM"
              />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
