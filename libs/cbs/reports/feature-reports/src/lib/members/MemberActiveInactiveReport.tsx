import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import {
  ActiveInactiveMemberReportData,
  ActiveInactiveMemberStatement,
  FormFieldSearchTerm,
  MemberStatus,
  MemberType,
  useGetActiveInactiveMemberReportQuery,
  useGetIndividualKymOptionsQuery,
  useGetInstitutionKymOptionsQuery,
} from '@coop/cbs/data-access';
import {
  MemberActivationReportInputs,
  MemberActivationsReportTable,
  ReportHeader,
  ReportOrganization,
  ReportOrganizationHeader,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { FormAmountFilter, FormRadioGroup, FormSelect } from '@coop/shared/form';
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

export const MemberActiveInactiveReport = () => {
  const methods = useForm<ActiveInactiveMemberReportData>({
    defaultValues: {
      filter: {
        gender: 'ALL',
        ageRange: {
          min: null,
          max: null,
        },
        institutionType: 'ALL',
        memberType: MemberType.All,
        occupation: 'ALL',
        status: MemberStatus.All,
      },
    },
  });

  const [hasShownFilter, setHasShownFilter] = useState(false);
  const [filter, setFilter] = useState<ActiveInactiveMemberReportData | null>(null);

  const { watch } = methods;

  const taxDeductDatePeriod = watch('periodType');

  const { data: memberActiveInactiveReportData, isFetching: reportLoading } =
    useGetActiveInactiveMemberReportQuery(
      {
        data: filter as ActiveInactiveMemberReportData,
      },
      { enabled: !!filter }
    );
  const memberActiveInactiveReport =
    memberActiveInactiveReportData?.report?.activeInactiveMemberReport?.statement;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!taxDeductDatePeriod}
          paths={[
            { label: 'Member Reports', link: '/reports/cbs/members' },
            {
              label: 'Member Active Inactive Report',
              link: '/reports/cbs/members/activations/new',
            },
          ]}
        />
        <MemberActivationReportInputs
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

              if (
                memberActiveInactiveReport &&
                'reportStatement' in memberActiveInactiveReport &&
                memberActiveInactiveReport.reportStatement
              ) {
                return (
                  <Box display="flex" flexDir="column" w="100%">
                    <ReportOrganizationHeader reportType={Report.SERVICE_CENTER_LIST_REPORT} />
                    {filter?.periodType && (
                      <ReportOrganization statementDate={filter?.periodType} />
                    )}
                    <Box px="s32">
                      <Divider />
                    </Box>
                    {/* <ReportMember */}
                    {/*  member={savingStatementData.report.savingStatementReport?.member} */}
                    {/* /> */}
                    <MemberActivationsReportTable
                      report={
                        memberActiveInactiveReport.reportStatement as ActiveInactiveMemberStatement[]
                      }
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
          <ReportFilter hasShownFilter={hasShownFilter} setFilter={setFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

interface ReportFilterProps {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<ActiveInactiveMemberReportData | null>>;
}

export const ReportFilter = ({ hasShownFilter, setFilter }: ReportFilterProps) => {
  const methods = useFormContext();

  const { data: genderFields } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
  });

  const { data: occupationFields } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const { data: organizationFields } = useGetInstitutionKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.OrganizationType,
  });

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
        <Accordion allowToggle allowMultiple>
          <AccordionItem
            py="s12"
            border="none"
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  px="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Status
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt="0" px="s16">
                  <FormRadioGroup
                    name="filter.status"
                    options={[
                      {
                        label: 'All',
                        value: MemberStatus.All,
                      },
                      {
                        label: 'Active',
                        value: MemberStatus.Active,
                      },
                      {
                        label: 'Inactive',
                        value: MemberStatus.Inactive,
                      },
                    ]}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
          <AccordionItem
            py="s12"
            border="none"
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  px="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Gender Wise
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt="0" px="s16">
                  <FormRadioGroup
                    name="filter.gender"
                    options={[
                      { label: 'All', value: 'ALL' },
                      ...(genderFields?.form?.options?.predefined?.data?.map((gender) => ({
                        label: gender?.name?.local as string,
                        value: gender?.id as string,
                      })) ?? []),
                    ]}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem
            py="s16"
            border="none"
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  px="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Member Type
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt="0" px="s16">
                  <FormRadioGroup
                    name="filter.memberType"
                    options={[
                      { label: 'All', value: MemberType.All },
                      { label: 'Individual', value: MemberType.Individual },
                      { label: 'Institution', value: MemberType.Institution },
                      { label: 'Cooperative', value: MemberType.Cooperative },
                      { label: 'Cooperative Union', value: MemberType.CooperativeUnion },
                    ]}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem
            py="s12"
            border="none"
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  px="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Institution Type
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt="0" px="s16">
                  <FormRadioGroup
                    name="filter.gender"
                    options={[
                      { label: 'All', value: 'ALL' },
                      ...(organizationFields?.form?.options?.predefined?.data?.map((gender) => ({
                        label: gender?.name?.local as string,
                        value: gender?.id as string,
                      })) ?? []),
                    ]}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem
            py="s12"
            border="none"
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  px="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Occupation Wise
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt="0" px="s16">
                  <FormSelect
                    label="Occupation Wise"
                    name="filter.occupation"
                    options={[
                      { label: 'All', value: 'ALL' },
                      ...(occupationFields?.form?.options?.predefined?.data?.map((gender) => ({
                        label: gender?.name?.local as string,
                        value: gender?.id as string,
                      })) ?? []),
                    ]}
                  />
                </AccordionPanel>
              </>
            )}
          </AccordionItem>

          <AccordionItem
            py="s12"
            border="none"
            borderBottom="1px"
            borderBottomColor="border.layout"
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  border="none"
                  px="s16"
                  bg="white"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  _hover={{}}
                  _expanded={{}}
                >
                  <Text color="gray.800" fontWeight="500">
                    Age Range
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt="0" px="s16">
                  <FormAmountFilter name="filter.ageRange" />
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
                      gender: 'ALL',
                      ageRange: {
                        min: null,
                        max: null,
                      },
                      institutionType: 'ALL',
                      memberType: MemberType.All,
                      occupation: 'ALL',
                      status: MemberStatus.All,
                    },
                  }
                : null
            );
            methods.reset({
              ...methods.getValues(),

              filter: {
                gender: 'ALL',
                ageRange: {
                  min: null,
                  max: null,
                },
                institutionType: 'ALL',
                memberType: MemberType.All,
                occupation: 'ALL',
                status: MemberStatus.All,
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
