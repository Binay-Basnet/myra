import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { AddIcon } from '@chakra-ui/icons';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Text,
} from '@chakra-ui/react';
import {
  useGetChartOfAccountsQuery,
  useGetMemberTypesQuery,
} from '@saccos/myra/graphql';
import { Box } from '@saccos/myra/ui';
export const FullView = () => {
  const { data } = useGetChartOfAccountsQuery();
  const memberTypes = data?.settings?.general?.chartsOfAccount?.class?.data;
  console.log(memberTypes);
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
              <AccordionButton bg={isExpanded ? '#E0E5EB' : ''} h="60px">
                <Box flex="1" textAlign="left">
                  <Text fontSize={'r1'} fontWeight="600" pl="s16">
                    {' '}
                    {memberType?.name}
                  </Text>
                </Box>
                {isExpanded ? (
                  <IoChevronUpOutline fontSize="18px" />
                ) : (
                  <IoChevronDownOutline fontSize="18px" />
                )}
              </AccordionButton>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};
