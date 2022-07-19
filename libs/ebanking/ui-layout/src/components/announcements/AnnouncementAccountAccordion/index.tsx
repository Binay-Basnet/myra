import { useGetAccountListQuery } from '@coop/shared/data-access';
import { Accordion, AccordionItem, AccordionPanel } from '@coop/shared/ui';

import { AnnouncementAccountCard } from '../AnnouncementAccountCard';
import { AnnouncementsAccBtn } from '../AnnouncementsAccBtn';

export const AnnouncementAccountAccordion = () => {
  const { data: accountsList } = useGetAccountListQuery();

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
              {accountsList?.eBanking?.account?.list?.edges?.map((account) => (
                <AnnouncementAccountCard
                  name={account.node.name}
                  balance={'NRs. ' + account.node.amount.toFixed(2)}
                  isDefault={account.node.isDefault}
                />
              ))}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};
