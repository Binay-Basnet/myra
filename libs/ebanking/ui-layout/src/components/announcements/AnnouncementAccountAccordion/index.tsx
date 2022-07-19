import { AnnouncementAccountCard } from 'libs/ebanking/ui-layout/src/components/announcements/AnnouncementAccountCard';
import { AnnouncementsAccBtn } from 'libs/ebanking/ui-layout/src/components/announcements/AnnouncementsAccBtn';

import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

export const AnnouncementAccountAccordion = () => {
  return (
    <Accordion allowMultiple={true} allowToggle={true} border="none">
      <AccordionItem borderRadius={0} border="none" bg="transparent">
        {({ isExpanded }) => (
          <>
            <AnnouncementsAccBtn
              isExpanded={isExpanded}
              label="Accounts Summary"
            />
            <AccordionPanel p="0">
              <AnnouncementAccountCard
                name="Salary Saving Account"
                balance="NRs. 54,000"
                isDefault
              />
              <AnnouncementAccountCard
                name="NRN  Saving Deposit Account"
                balance="NRs. 1,54,000"
              />
              <AnnouncementAccountCard
                name="Nari Samman Bachat Khata"
                balance="NRs. 5.34,000"
              />
              <AnnouncementAccountCard
                name="Nagarik Bachat Khata"
                balance="NRs. 4,000"
              />
              <AnnouncementAccountCard
                name="Normal Saving Account"
                balance="NRs. 24,000"
              />
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
