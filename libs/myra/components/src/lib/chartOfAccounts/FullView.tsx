import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';

import { useGetChartOfAccountsQuery } from '@coop/shared/data-access';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@coop/shared/ui';

import Tree from './Tree';

export const FullView = () => {
  const { data } = useGetChartOfAccountsQuery();
  const memberTypes = data?.settings?.general?.chartsOfAccount?.class?.data;

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
                <AccordionPanel>
                  <Tree code="10" title="Share Capital" isExtensible={false} />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
