import { useFormContext } from 'react-hook-form';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import {
  ReportPeriodType,
  SavingAmountRange,
  SavingServiceType,
  SavingTransactionType,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup, FormRadioGroup } from '@coop/shared/form';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  Icon,
  Text,
} from '@coop/shared/ui';

type IReportFilter = {
  memberId: string;
  accountId: string;
  periodType: ReportPeriodType;
  customPeriod?: {
    from: string;
    to: string;
  };
  filter?: {
    transactionType: SavingTransactionType;
    service: SavingServiceType;
    amountRange: SavingAmountRange;
  };
};

interface ReportFilterProps {
  hasShownFilter: boolean;
  setTriggerQuery: (value: boolean) => void;
}

export const SavingReportFilters = ({ hasShownFilter, setTriggerQuery }: ReportFilterProps) => {
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
      <Box display="flex" flexDir="column">
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
        <Accordion pb="s16" allowToggle allowMultiple>
          <AccordionItem border="none" borderBottom="1px" borderBottomColor="border.layout">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  borderRadius={0}
                  px="s16"
                  py="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Type of Transaction
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt={0} pb="s16" px="s16">
                  <FormRadioGroup
                    name="filter.transactionType"
                    options={[
                      { label: 'All', value: SavingTransactionType.All },
                      { label: 'Deposit', value: SavingTransactionType.Deposit },
                      { label: 'Withdraw', value: SavingTransactionType.Withdraw },
                    ]}
                    direction="column"
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem border="none" borderBottom="1px" borderBottomColor="border.layout">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  px="s16"
                  borderRadius={0}
                  py="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Service
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt="0" px="s16">
                  <FormCheckboxGroup
                    name="filter.service"
                    list={[
                      { label: 'All', value: SavingServiceType.Interest },
                      { label: 'Interest', value: SavingServiceType.Charges },
                      { label: 'Charges', value: SavingServiceType.CustomerInitiated },
                    ]}
                    orientation="column"
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          {/**
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
                    Amount Range
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel p="0">
                  <FormCheckboxGroup
                    name="filter.service"
                    list={[
                      { label: 'All', value: SavingServiceType.Interest },
                      { label: 'Interest', value: SavingServiceType.Charges },
                      { label: 'Charges', value: SavingServiceType.CustomerInitiated },
                    ]}
                    orientation="column"
                  />
                </AccordionPanel>
              </>
            )}
           </AccordionItem>
           */}
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
            setTriggerQuery(true);
          }}
        >
          Apply Filter
        </Button>
        <Button
          variant="ghost"
          shade="neutral"
          onClick={() => {
            methods.reset({
              ...methods.getValues(),
              filter: {
                ...methods.getValues()['filter'],
                service: methods?.getValues()?.['service']?.[0],
              },
            });
          }}
        >
          Reset To Default
        </Button>
      </Box>
    </Box>
  ) : null;
};
