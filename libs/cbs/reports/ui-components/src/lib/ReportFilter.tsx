import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import { ShareTransactionType } from '@coop/cbs/data-access';
import { FormRadioGroup } from '@coop/shared/form';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  Icon,
  Text,
} from '@coop/shared/ui';

type ReportFilter = {
  memberId: string;
  period: {
    from: string;
    to: string;
  };
  type: ShareTransactionType;
};

interface ReportFilterProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<ReportFilter>>;
}

export const ReportFilter = ({
  hasShownFilter,
  setFilter,
}: ReportFilterProps) => {
  const methods = useFormContext();

  return hasShownFilter ? (
    <Box
      w="320px"
      bg="white"
      color="white"
      borderLeft="1px"
      borderLeftColor="border.layout"
      display="flex"
      flexDir="column"
      flexShrink={0}
      justifyContent="space-between"
    >
      <Box display="flex" flexDir="column" gap="s16">
        <Box
          h="56px"
          px="s16"
          display="flex"
          alignItems="center"
          borderBottom="1px"
          borderBottomColor="border.layout"
        >
          <Text fontSize="r2" color="gray.800" fontWeight="600">
            Filters
          </Text>
        </Box>
        <Accordion
          px="s16"
          pb="s16"
          borderBottom="1px"
          borderBottomColor="border.layout"
          allowToggle
        >
          <AccordionItem border="none">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  p="0"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Type of Share Transaction
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel p="0">
                  <FormRadioGroup
                    name={'transaction_type'}
                    options={[
                      { label: 'All', value: ShareTransactionType.All },
                      { label: 'Issue', value: ShareTransactionType.Issue },
                      { label: 'Return', value: ShareTransactionType.Return },
                    ]}
                    direction="column"
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        </Accordion>
      </Box>

      <Box
        px="s16"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py="s8"
        borderTop="1px"
        borderTopColor="border.layout"
      >
        <Button
          onClick={() => {
            setFilter((prev) => ({
              ...prev,
              type: methods.getValues()['transaction_type'],
            }));
          }}
        >
          Apply Filter
        </Button>
        <Button
          variant="ghost"
          shade="neutral"
          onClick={() => {
            setFilter((prev) => ({
              ...prev,
              type: ShareTransactionType.All,
            }));
            methods.reset({
              ...methods.getValues(),
              transaction_type: ShareTransactionType.All,
            });
          }}
        >
          Reset To Default
        </Button>
      </Box>
    </Box>
  ) : null;
};
