import React, { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';
import { TbArrowsDiagonalMinimize2 } from 'react-icons/tb';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel, Spinner } from '@chakra-ui/react';
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  GridItem,
  Icon,
  NoDataState,
  Text,
} from '@myra-ui';

import { useReport } from '@coop/cbs/reports';
import { ReportOrganizationHeader } from '@coop/cbs/reports/components';
import { Column, Table } from '@myra-ui/table';

export const ReportHeader = ({ children }: { children: React.ReactNode }) => (
  <Box position="sticky" bg="white" top="110px" zIndex="10">
    {children}
  </Box>
);

export const ReportBody = ({ children }: { children: React.ReactNode }) => (
  <Box h="50vh" flexGrow={1} p="s16" gap="s16" display="flex" justifyContent="space-between">
    {children}
  </Box>
);

export const ReportContent = ({ children }: { children: React.ReactNode }) => {
  const { isFilterShown, data, isLoading, filters } = useReport();

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" w="100%" mb="100px" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (filters && (!data || data?.length === 0)) {
    return (
      <Box display="flex" w="100%" justifyContent="center" overflowY="auto">
        <Box
          transition="all 0.1s ease-in-out"
          width={isFilterShown ? '100%' : 'clamp(860px, 80%, 75vw)'}
          bg="white"
          borderRadius="br2"
        >
          <NoDataState
            custom={{
              title: 'No Reports Found',
              subtitle: 'Please select a different member or a different filter to get reports',
            }}
          />
        </Box>
      </Box>
    );
  }

  if (!data || data?.length === 0) {
    return (
      <Box display="flex" w="100%" justifyContent="center" overflowY="auto">
        <Box
          overflowY="auto"
          width={isFilterShown ? '100%' : 'clamp(860px, 80%, 75vw)'}
          borderRadius="br2"
        />
      </Box>
    );
  }

  return (
    <Box display="flex" w="100%" justifyContent="center" overflowY="auto">
      <Box
        transition="all 0.1s ease-in-out"
        width={isFilterShown ? '100%' : 'clamp(860px, 80%, 75vw)'}
        bg="white"
        overflowY="auto"
        borderRadius="br2"
        h="100%"
      >
        {children}
      </Box>
    </Box>
  );
};

export const OrganizationHeader = () => {
  const { report } = useReport();

  return <ReportOrganizationHeader reportType={report} />;
};

export const ReportFilters = ({ children }: { children: React.ReactNode }) => {
  const { isFilterShown, setFilters, defaultFilters } = useReport();
  const { getValues, setValue } = useFormContext();
  const [indices, setIndices] = useState(Array.from(Array(20).keys()));

  if (!isFilterShown) return null;

  return (
    <Box
      borderRadius="br2"
      color="white"
      flexShrink={0}
      transition="all 0.1s ease-in-out"
      width={isFilterShown ? '20%' : '0px'}
      maxW="320px"
      bg="white"
      visibility={!isFilterShown ? 'hidden' : 'visible'}
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      overflowY="auto"
    >
      <Box display="flex" flexDir="column">
        <Box
          h="56px"
          px="s16"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px"
          borderBottomColor="border.layout"
        >
          <Text fontSize="r2" color="gray.800" fontWeight="600">
            Filters
          </Text>

          {indices.length === 0 ? (
            <Button
              shade="neutral"
              variant="ghost"
              onClick={() => setIndices(Array.from(Array(20).keys()))}
              leftIcon={<Icon as={TbArrowsDiagonalMinimize2} />}
            >
              Expand
            </Button>
          ) : (
            <Button
              shade="neutral"
              variant="ghost"
              onClick={() => setIndices([])}
              leftIcon={<Icon as={TbArrowsDiagonalMinimize2} />}
            >
              Collapse
            </Button>
          )}
        </Box>
        <Accordion index={indices} p={0} allowMultiple allowToggle>
          {children}
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
            setFilters((prev) =>
              prev
                ? {
                    ...prev,
                    filter: getValues()['filter'],
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
            setFilters((prev) =>
              prev
                ? {
                    ...prev,
                    ...defaultFilters,
                  }
                : null
            );

            setValue('filter', defaultFilters?.['filter']);
          }}
        >
          Reset To Default
        </Button>
      </Box>
    </Box>
  );
};

interface IReportFilterProps {
  title: string;
  children: React.ReactNode;
}

export const ReportFilter = ({ title, children }: IReportFilterProps) => (
  <AccordionItem
    minH="s44"
    display="flex"
    flexDir="column"
    justifyContent="center"
    px="s16"
    borderRadius="none"
    borderBottom="1px"
    borderBottomColor="border.layout"
    border="none"
  >
    {({ isExpanded }) => (
      <>
        <AccordionButton
          border="none"
          borderRadius="none"
          p="0"
          h="s44"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          _hover={{}}
          _expanded={{}}
        >
          <Text color="gray.800" fontWeight="500">
            {title}
          </Text>
          <Icon
            as={isExpanded ? ChevronDownIcon : ChevronRightIcon}
            color="gray.800"
            flexShrink={0}
          />
        </AccordionButton>
        <AccordionPanel py="s16" px={0}>
          {children}
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
);

export const ReportInputs = <T extends FieldValues | null>({
  children,
  hideDate,
}: {
  children: React.ReactNode;
  hideDate?: boolean;
}) => {
  const { getValues, watch } = useFormContext<NonNullable<T>>();

  const { isFilterShown, setIsFilterShown, defaultFilters, setFilters } = useReport();

  // console.log(
  //   Object.keys(omit(getValues(), ['filter', 'period'])).some((field) => !!watch()[field])
  // );
  //

  return (
    <Box display="flex" alignItems="flex-end" gap="s20" px="s16" py="s16">
      <Box as="form" display="grid" width="100%" gridTemplateColumns="repeat(4, 1fr)" gap="s20">
        {children}
      </Box>
      <Box display="flex" gap="s16">
        <Button
          // TODO! Fix this
          isDisabled={hideDate ? false : !watch()?.['period']?.['periodType']}
          size="lg"
          onClick={() => {
            setFilters({
              ...getValues(),
              ...defaultFilters,
            });
          }}
        >
          Create Report
        </Button>

        {isFilterShown ? (
          <Button size="lg" gap="s4" onClick={() => setIsFilterShown((prev) => !prev)}>
            <Icon as={IoFilterOutline} />
            Hide Filter
          </Button>
        ) : (
          <Button
            size="lg"
            variant="outline"
            shade="neutral"
            gap="s4"
            onClick={() => setIsFilterShown((prev) => !prev)}
          >
            <Icon as={IoFilterOutline} />
            Show Filter
          </Button>
        )}
      </Box>
    </Box>
  );
};

interface IReportTableProps<T extends Record<string, unknown>> {
  data?: T[] | null;
  columns: Column<T>[];
  hasSNo?: boolean;
  showFooter?: boolean;
}

export const ReportTable = <T extends Record<string, unknown>>({
  data: tableData,
  columns,
  hasSNo = true,
  showFooter = false,
}: IReportTableProps<T>) => {
  const { data } = useReport();

  return (
    <Box py="s16" px="s16">
      <Table
        showFooter={showFooter}
        variant="report"
        size="report"
        isStatic
        data={
          tableData
            ? ((hasSNo
                ? tableData?.map((d, index) => ({ ...d, index: index + 1 }))
                : tableData) as unknown as T[])
            : ((hasSNo
                ? data?.map((d, index) => ({ ...d, index: index + 1 }))
                : data) as unknown as T[])
        }
        columns={columns}
      />
    </Box>
  );
};

interface IReportMetaProps {
  metaData: Record<string, string>;
}

export const ReportMeta = ({ metaData }: IReportMetaProps) => (
  <Box px="s16" pt="s16" display="flex" justifyContent="space-between">
    <Box w="50%" display="flex" flexWrap="wrap">
      <Box w="70%" display="grid" gridTemplateColumns="repeat(2, 1fr)">
        <GridItem>
          <Box display="flex" flexDir="column">
            {Object.keys(metaData)?.map((label) => (
              <Text fontSize="r1" color="gray.700" key={label}>
                {label}:
              </Text>
            ))}
          </Box>
        </GridItem>
        <GridItem>
          <Box display="flex" flexDir="column" fontWeight="500">
            {Object.values(metaData)?.map((value) => (
              <Text fontSize="r1" color="gray.700" key={value}>
                {value}
              </Text>
            ))}
          </Box>
        </GridItem>
      </Box>
    </Box>
  </Box>
);
