import React, { useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel } from '@chakra-ui/react';

import {
  BranchReportFilter,
  ServiceCenter,
  useGetAllDistrictsQuery,
  useGetAllLocalGovernmentQuery,
  useGetAllProvinceQuery,
  useGetBranchReportQuery,
} from '@coop/cbs/data-access';
import {
  ReportHeader,
  ReportOrganization,
  ReportOrganizationHeader,
  SCReportTable,
  ServiceCenterReportInputs,
} from '@coop/cbs/reports/components';
import { Report } from '@coop/cbs/reports/list';
import { FormCheckbox, FormSelect } from '@coop/shared/form';
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

export const ServiceCenterReport = () => {
  const methods = useForm<BranchReportFilter>({
    mode: 'onSubmit',
    defaultValues: {},
  });

  const [hasShownFilter, setHasShownFilter] = useState(true);
  const [filter, setFilter] = useState<BranchReportFilter | null>(null);

  const { watch } = methods;

  const taxDeductDatePeriod = watch('periodType');

  const { data: serviceCenterReportData, isFetching: reportLoading } = useGetBranchReportQuery(
    {
      data: filter as BranchReportFilter,
    },
    { enabled: !!filter }
  );
  const serviceCenterReport = serviceCenterReportData?.report?.branchReport?.data;

  return (
    <FormProvider {...methods}>
      <Box bg="white" minH="calc(100vh - 110px)" w="100%" display="flex" flexDir="column">
        <ReportHeader
          hasSave={!!taxDeductDatePeriod}
          paths={[
            { label: 'Service Center Reports', link: '/reports/cbs/service-center' },
            {
              label: 'Service Center List Report',
              link: '/reports/cbs/service-center/list-report/new',
            },
          ]}
        />
        <ServiceCenterReportInputs
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

              if (serviceCenterReport && serviceCenterReport.length !== 0) {
                return (
                  <Box display="flex" flexDir="column" maxW="100%">
                    <ReportOrganizationHeader reportType={Report.SERVICE_CENTER_LIST_REPORT} />
                    {filter?.periodType && (
                      <ReportOrganization statementDate={filter?.periodType} />
                    )}
                    <Box px="s32">
                      <Divider />
                    </Box>
                    <SCReportTable report={serviceCenterReport as ServiceCenter[]} />
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
          <ServiceCenterFilters hasShownFilter={hasShownFilter} setFilter={setFilter} />
        </Box>
      </Box>
    </FormProvider>
  );
};

interface ServiceCenterReportFilters {
  hasShownFilter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<BranchReportFilter | null>>;
}

export const ServiceCenterFilters = ({ hasShownFilter, setFilter }: ServiceCenterReportFilters) => {
  const methods = useFormContext<BranchReportFilter>();

  const { data } = useGetAllProvinceQuery();
  const { data: districtsData } = useGetAllDistrictsQuery();
  const { data: localGovernmentData } = useGetAllLocalGovernmentQuery();

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
        <Accordion pb="s16" allowMultiple>
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
                    Address
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt={0} pb="s16" px="s16" display="flex" flexDir="column" gap="s16">
                  <FormSelect
                    name="filter.provinceId"
                    label="Province"
                    options={data?.administration?.provinces.map((province) => ({
                      label: province.name,
                      value: province.id,
                    }))}
                  />
                  <FormSelect
                    name="filter.districtId"
                    label="District"
                    options={districtsData?.administration?.districts.map((district) => ({
                      label: district.name,
                      value: district.id,
                    }))}
                  />
                  <FormSelect
                    name="filter.localGovernmentId"
                    label="Local Government"
                    options={localGovernmentData?.administration?.municipalities.map(
                      (district) => ({
                        label: district.name,
                        value: district.id,
                      })
                    )}
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
                    Extension Counter
                  </Text>
                  <Icon
                    as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
                    color="gray.800"
                    flexShrink={0}
                  />
                </AccordionButton>
                <AccordionPanel pt={0} pb="s16" px="s16">
                  <FormCheckbox label="Extension Counter" name="filter.isExtensionCounter" />
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
                    filter: methods.getValues().filter,
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
                      districtId: null,
                      provinceId: null,
                      isExtensionCounter: false,
                      localGovernmentId: null,
                    },
                  }
                : null
            );
            methods.reset({
              ...methods.getValues(),
              filter: {
                districtId: null,
                provinceId: null,
                isExtensionCounter: false,
                localGovernmentId: null,
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
