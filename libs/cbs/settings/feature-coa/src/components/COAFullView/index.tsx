import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import {
  CoaView,
  useGetChartOfAccountsQuery,
  useGetCoaFullViewQuery,
} from '@coop/cbs/data-access';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@coop/shared/ui';

import Tree from '../Tree';
import { arrayToTreeCOA } from '../../utils/arrayToTree';

export const COAFullView = () => {
  const { data } = useGetChartOfAccountsQuery();
  const memberTypes = data?.settings?.general?.chartsOfAccount?.class?.data;

  const { data: fullView } = useGetCoaFullViewQuery();

  const coaFullView =
    fullView?.settings?.chartsOfAccount?.fullView.data?.filter(
      (account) => account?.accountClass === 'EQUITY_AND_LIABILITIES'
    ) ?? [];

  const coaTree = arrayToTreeCOA(coaFullView as CoaView[]);

  return (
    <Box
      p="10px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Accordion allowMultiple allowToggle mb="0" border="none">
        {memberTypes?.map((memberType) => (
          <AccordionItem key={memberType?.id} mt="s8">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  p="s12"
                  bg={isExpanded ? '#E0E5EB' : ''}
                  h="60px"
                >
                  <Box flex="1" textAlign="left">
                    <Text fontSize="r1" fontWeight="SemiBold">
                      {memberType?.name}
                    </Text>
                  </Box>
                  {isExpanded ? (
                    <IoChevronUpOutline fontSize="18px" />
                  ) : (
                    <IoChevronDownOutline fontSize="18px" />
                  )}
                </AccordionButton>
                <AccordionPanel display="flex" flexDir="column" gap="s16">
                  {coaTree.map((account) => (
                    <Tree current={account} data={account.children} />
                  ))}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
