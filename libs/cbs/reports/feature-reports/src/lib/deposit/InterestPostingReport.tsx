import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import {
  InterestPostingReportEntry,
  InterestStatementFilter,
  useGetInterestStatementReportQuery,
} from '@coop/cbs/data-access';
import {
  InterestStatementInputs,
  InterestStatementReportTable,
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

type ReportFilterType = InterestStatementFilter & {
  memberId: string;
};

export const InterestPostingReport = () => {
  const methods = useForm<ReportFilterType>({
    defaultValues: {},
  });

  const [filter, setFilter] = useState<ReportFilterType | null>(null);

  const { watch } = methods;

  const memberId = watch('memberId');
  const periodType = watch('period');
  const accountId = watch('accountId');

  const [hasShownFilter, setHasShownFilter] = useState(false);

  const { data: savingStatementData, isFetching: reportLoading } =
    useGetInterestStatementReportQuery(
      {
        data: {
          period: filter?.period,
          accountId: filter?.accountId as string,
          filter: filter?.filter,
        },
      },
      { enabled: !!filter }
    );
  const interestStatement = savingStatementData?.report?.interestStatementReport?.data;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!memberId && !!periodType && !!accountId}
          paths={[
            { label: 'Saving Statement', link: '/reports/cbs/savings' },
            {
              label: 'Interest Statement',
              link: '/reports/cbs/interest-statement/new',
            },
          ]}
        />
        <InterestStatementInputs
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

              if (interestStatement?.entries && interestStatement.entries?.length !== 0) {
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
                    <InterestStatementReportTable
                      interestReport={interestStatement.entries as InterestPostingReportEntry[]}
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
          <InterestStatementFilters hasShownFilter={hasShownFilter} setFilter={setFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

interface InterestStatementFilterProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<ReportFilterType | null>>;
}

export const InterestStatementFilters = ({
  hasShownFilter,
  setFilter,
}: InterestStatementFilterProps) => {
  const methods = useFormContext<ReportFilterType>();

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
                    Interest Rate
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
                    filter: {
                      ...methods.getValues()['filter'],
                      interestAmount: methods.getValues().filter?.interestAmount,
                    },
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
