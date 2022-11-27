import { useGetAnnouncementListQuery } from '@coop/ebanking/data-access';
import { Accordion, AccordionItem, AccordionPanel } from '@myra-ui';

import { AnnouncementCard } from '../AnnouncementCard';
import { AnnouncementsAccBtn } from '../AnnouncementsAccBtn';

export const AnnouncementBasicAccordion = () => {
  const { data: announcementList } = useGetAnnouncementListQuery();

  return (
    <Accordion allowMultiple allowToggle border="none">
      <AccordionItem borderRadius={0} border="none" bg="transparent">
        {({ isExpanded }) => (
          <>
            <AnnouncementsAccBtn isExpanded={isExpanded} label="Announcements" />
            <AccordionPanel p="0">
              {announcementList?.eBanking?.notification?.announcements?.list?.map(
                (announcement) => (
                  <AnnouncementCard title={announcement?.title} subtitle={announcement?.date} />
                )
              )}
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
