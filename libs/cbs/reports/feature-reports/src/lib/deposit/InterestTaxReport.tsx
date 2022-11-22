import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import {
  InterestTaxReportEntry,
  InterestTaxReportFilter,
  useGetInterestTaxReportQuery,
} from '@coop/cbs/data-access';
import {
  InterestTaxInputs,
  InterestTaxReportTable,
  ReportHeader,
  ReportOrganization,
  ReportOrganizationHeader,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { FormAmountFilter } from '@coop/shared/form';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  Divider,
  Icon,
  Loader,
  NoDataState,
  Text,
} from '@coop/shared/ui';

export const InterestTaxReport = () => {
  const methods = useForm<InterestTaxReportFilter>({
    defaultValues: {},
  });

  const [hasShownFilter, setHasShownFilter] = useState(false);
  const [filter, setFilter] = useState<InterestTaxReportFilter | null>(null);

  const { watch } = methods;

  const taxDeductDatePeriod = watch('period');

  const { data: interestTaxReportData, isFetching: reportLoading } = useGetInterestTaxReportQuery(
    {
      data: filter as InterestTaxReportFilter,
    },
    { enabled: !!filter }
  );
  const interestTaxReport = interestTaxReportData?.report?.interestTaxReport?.data;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!taxDeductDatePeriod}
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Interest Tax Report',
              link: '/reports/cbs/interest-tax/new',
            },
          ]}
        />
        <InterestTaxInputs
          setFilter={setFilter}
          hasShownFilter={hasShownFilter}
          setHasShownFilter={setHasShownFilter}
        />
        <Box display="flex" minH="calc(100vh - 260.5px)" w="100%" overflowX="auto">
          <Box w="100%">
            {(() => {
              if (reportLoading) {
                return (
                  <Box
                    h="200px"
                    w="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Loader />
                  </Box>
                );
              }

              if (interestTaxReport && interestTaxReport.length !== 0) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.DEPOSIT_INTEREST_REPORT} />
                    {filter?.period && <ReportOrganization statementDate={filter?.period} />}
                    <Box px="s32">
                      <Divider />
                    </Box>
                    {/* <ReportMember */}
                    {/*  member={savingStatementData.report.savingStatementReport?.member} */}
                    {/* /> */}
                    <InterestTaxReportTable
                      taxReport={interestTaxReport as InterestTaxReportEntry[]}
                    />
                  </Box>
                );
              }

              if (filter) {
                return (
                  <NoDataState
                    custom={{
                      title: 'No Reports Found',
                      subtitle:
                        'Please select a different member or a different filter to get reports',
                    }}
                  />
                );
              }

              return null;
            })()}
          </Box>
          <InterestTaxReportFilters setFilter={setFilter} hasShownFilter={hasShownFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

interface InterestTaxReportFilterProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<InterestTaxReportFilter | null>>;
}

export const InterestTaxReportFilters = ({
  hasShownFilter,
  setFilter,
}: InterestTaxReportFilterProps) => {
  const methods = useFormContext<InterestTaxReportFilter>();

  if (!hasShownFilter) return null;

  return (
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
                    Saving Balance
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt={0} pb="s16" px="s16">
                  <FormAmountFilter name="filter.savingBalance" />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
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
                    Interest Amount
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt={0} pb="s16" px="s16">
                  <FormAmountFilter name="filter.interestAmount" />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
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
                    Tax Amount
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt={0} pb="s16" px="s16">
                  <FormAmountFilter name="filter.taxAmount" />
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
            setFilter((prev) =>
              prev
                ? {
                    ...prev,
                    filter: methods.getValues()['filter'],
                  }
                : null
            );
          }}
        >
          Apply Filter
        </Button>
        <Button
          variant="ghost"
          shade="neutral"
          onClick={() => {
            setFilter((prev) =>
              prev
                ? {
                    ...prev,
                    filter: {
                      interestAmount: {
                        min: null,
                        max: null,
                      },
                      savingBalance: {
                        min: null,
                        max: null,
                      },
                      taxAmount: {
                        min: null,
                        max: null,
                      },
                    },
                  }
                : null
            );
            methods.reset({
              ...methods.getValues(),
              filter: {
                interestAmount: {
                  min: null,
                  max: null,
                },
                savingBalance: {
                  min: null,
                  max: null,
                },
                taxAmount: {
                  min: null,
                  max: null,
                },
              },
            });
          }}
        >
          Reset To Default
        </Button>
      </Box>
    </Box>
  );
};
