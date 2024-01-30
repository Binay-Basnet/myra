import React, { useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { IoFilterOutline } from 'react-icons/io5';
import { TbArrowsDiagonalMinimize2 } from 'react-icons/tb';
import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { AccordionPanel, Spinner } from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  Button,
  Divider,
  GridItem,
  Icon,
  Text,
} from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useAppSelector } from '@coop/cbs/data-access';
import { useReport } from '@coop/cbs/reports';
import { useTranslation } from '@coop/shared/utils';

import { ReportOrganizationHeader } from './ReportOrganizationHeader';

export const ReportHeader = ({ children }: { children: React.ReactNode }) => (
  <Box position="sticky" bg="white" top="0px" zIndex="10">
    {children}
  </Box>
);

export const ReportBody = ({ children }: { children: React.ReactNode }) => (
  <Box h="50vh" flexGrow={1} p="s16" py="s8" gap="s8" display="flex" justifyContent="space-between">
    {children}
  </Box>
);

export const ReportContent = ({
  children,
  showSignatures,
}: {
  children: React.ReactNode;
  showSignatures?: boolean;
}) => {
  const { t } = useTranslation();

  const { isFilterShown, data, isLoading, filters, printRef } = useReport();
  const user = useAppSelector((state) => state.auth.user);

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" w="100%" mb="100px" justifyContent="center">
        <Spinner size="xl" />
      </Box>
    );
  }

  // if (filters && (!data || data?.length === 0)) {
  //   return (
  //     <Box display="flex" w="100%" justifyContent="center" overflowY="auto">
  //       <Box
  //         transition="all 0.1s ease-in-out"
  //         width={isFilterShown ? '100%' : 'clamp(860px, 80%, 75vw)'}
  //         bg="white"
  //         borderRadius="br2"
  //       >
  //         <NoDataState
  //           custom={{
  //             title: 'No Reports Found',
  //             subtitle: 'Please select a different member or a different filter to get reports',
  //           }}
  //         />
  //       </Box>
  //     </Box>
  //   );
  // }
  //
  if (!filters && (!data || data?.length === 0)) {
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
        ref={printRef}
        transition="all 0.1s ease-in-out"
        width={isFilterShown ? '100%' : 'clamp(860px, 80%, 75vw)'}
        bg="white"
        overflowY="auto"
        borderRadius="br2"
        h="100%"
        sx={{
          '@media print': {
            display: 'block',
            // flexDir: 'column',
            w: '100%',
            h: '100%',
            // minW: '100%',
            // maxW: '100%',
            overflow: 'visible',
            color: '#000',
            // overflowX: 'visible',
            borderRadius: '0',
          },
          '@page': {
            size: 'auto !important',
            margin: '0.2in',
            marginLeft: '0.4in',
            marginBottom: '0',
            // zoom: '0.6',
            // scale: '0.2',
          },
        }}
      >
        {children}
        {showSignatures && (
          <Box
            // position="fixed"
            w="100%"
            bottom="100px"
            pt="s40"
            left={0}
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            gap="s32"
            px="s32"
          >
            <Box display="flex" flexDir="column" alignItems="center" gap="s12">
              <Divider borderTop="1px dotted black" />
              <Text fontSize="s2" color="gray.800" fontWeight="500">
                {`${t['reportsPrintPreparedBy']} [${user?.firstName?.en}]`}
              </Text>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center" gap="s12">
              <Divider borderTop="1px dotted black" />
              <Text fontSize="s2" color="gray.800" fontWeight="500">
                {t['reportsPrintCheckedBy']}
              </Text>
            </Box>
            <Box display="flex" flexDir="column" alignItems="center" gap="s12">
              <Divider borderTop="1px dotted black" />
              <Text fontSize="s2" color="gray.800" fontWeight="500">
                {t['reportsPrintApprovedBy']}
              </Text>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export const OrganizationHeader = () => {
  const { report } = useReport();

  return <ReportOrganizationHeader reportType={report} />;
};

export const ReportFilters = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

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
            {t['reportsDrawerFilters']}
          </Text>

          {indices?.length === 0 ? (
            <Button
              shade="neutral"
              variant="ghost"
              onClick={() => setIndices(Array.from(Array(20).keys()))}
              leftIcon={<Icon as={TbArrowsDiagonalMinimize2} />}
            >
              {t['reportsDrawerExpand']}
            </Button>
          ) : (
            <Button
              shade="neutral"
              variant="ghost"
              onClick={() => setIndices([])}
              leftIcon={<Icon as={TbArrowsDiagonalMinimize2} />}
            >
              {t['reportsDrawerCollapse']}
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
          {t['reportsDrawerApplyFilter']}
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
          {t['reportsDrawerResetToDefault']}
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
  children?: React.ReactNode;
  hideDate?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { getValues, watch } = useFormContext<NonNullable<T>>();

  const { isFilterShown, setIsFilterShown, setFilters } = useReport();

  const { t } = useTranslation();

  // console.log(
  //   Object.keys(omit(getValues(), ['filter', 'period'])).some((field) => !!watch()[field])
  // );
  //

  return (
    <Box display="flex" alignItems="flex-end" gap="s20" px="s16" py="s8">
      <Box as="form" display="grid" width="100%" gridTemplateColumns="repeat(4, 1fr)" gap="s20">
        {children}
      </Box>
      <Box display="flex" alignItems="end" gap="s16">
        <Button
          // // TODO! Fix this
          isDisabled={hideDate ? false : !watch()?.['period']}
          size="lg"
          onClick={() => {
            queryClient.invalidateQueries(['']);
            setFilters({
              ...getValues(),
            });
          }}
        >
          {t['reportsCreateReport']}
        </Button>

        {isFilterShown ? (
          <Button size="lg" gap="s4" onClick={() => setIsFilterShown((prev) => !prev)}>
            <Icon as={IoFilterOutline} />
            {t['reportsHideFilter']}
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
            {t['reportsShowFilter']}
          </Button>
        )}
      </Box>
    </Box>
  );
};

interface IReportTableProps<T> {
  data?: T[] | null;
  columns: Column<T>[];
  hasSNo?: boolean;
  showFooter?: boolean;
  tableTitle?: string;
  getSubRows?: (row: T) => T[];

  freezeFirstColumn?: boolean;
  expandFirstLevel?: boolean;
}

export const ReportTable = <T,>({
  data: tableData,
  columns,
  hasSNo = true,
  showFooter = false,
  tableTitle,
  getSubRows,
  freezeFirstColumn = true,
  expandFirstLevel,
}: IReportTableProps<T>) => {
  const { data } = useReport();

  return (
    <Box py="s16" px="s16">
      <Table
        showFooter={showFooter}
        variant="report"
        size="report"
        isStatic
        noDataTitle="Reports"
        freezeFirstColumn={freezeFirstColumn}
        expandFirstLevel={expandFirstLevel}
        getSubRows={getSubRows || ((row) => (row as { children: T[] })['children'])}
        data={
          ((tableData
            ? hasSNo
              ? tableData?.map((d, index) => ({ ...d, index: index + 1 }))
              : tableData
            : hasSNo
            ? data?.map((d, index) => ({ ...d, index: index + 1 }))
            : data) || []) as unknown as T[]
        }
        columns={columns}
        tableTitle={tableTitle}
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
