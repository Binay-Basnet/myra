import { useGetAccountListQuery } from '@coop/ebanking/data-access';
import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

import { AnnouncementAccountCard } from '../AnnouncementAccountCard';
import { AnnouncementsAccBtn } from '../AnnouncementsAccBtn';

export const AnnouncementAccountAccordion = () => {
  const { data: accountsList } = useGetAccountListQuery();

  return (
    <Accordion allowMultiple allowToggle border="none">
      <AccordionItem borderRadius={0} border="none" bg="transparent">
        {({ isExpanded }) => (
          <>
            <AnnouncementsAccBtn isExpanded={isExpanded} label="Accounts Summary" />
            <AccordionPanel p="0">
              {accountsList?.eBanking?.account?.list?.accounts?.map((account) => (
                <AnnouncementAccountCard
                  name={account?.name as string}
                  balance={`NRs. ${Number(account?.balance).toFixed(2)}`}
                  isDefault={account?.isDefault as boolean}
                />
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
