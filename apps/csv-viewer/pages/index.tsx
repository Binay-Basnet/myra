import React, { useEffect, useRef, useState } from 'react';
import DataGrid, { DataGridHandle } from 'react-data-grid';
import { IoMdClose } from 'react-icons/io';
import { Spinner } from '@chakra-ui/react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { Box, Icon, Input, Text } from '@myra-ui';

import { privateAgent } from '@coop/csv-viewer/data-access';
import { getAPIUrl } from '@coop/shared/utils';

import { AppBar } from '../components/AppBar';

import 'react-data-grid/lib/styles.css';

export type Tab = {
  label: string;
  value: string;
};

export const TableSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.8333 2.5H4.16667C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5Z"
      stroke="#636972"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.5 7.5H17.5"
      stroke="#636972"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 17.5V7.5"
      stroke="#636972"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const getCSVs = async () => {
  const response = await privateAgent.get<{ data: string[] }>(`${getAPIUrl()}/home`);

  return response?.data;
};

const getCSV = async (csv: string, page: number) => {
  const response = await privateAgent.get<{
    data: {
      data: Record<string, string>;
    }[];
    total_pages: number;
  }>(`${getAPIUrl()}/file`, {
    params: {
      file_name: csv,
      page,
    },
  });

  return response?.data;
};

export const Index = () => {
  const tabRef = useRef<HTMLInputElement | null>(null);

  const { data: tabList } = useQuery({
    queryKey: ['home'],
    queryFn: getCSVs,
  });

  const [currentTabs, setCurrentTabs] = useState<Tab[]>([]);
  const [selectedTab, setSelectedTab] = useState<Tab | null>(null);

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  }, [selectedTab?.value]);

  const tabs = React.useMemo(
    () =>
      tabList?.data?.map((tab) => ({
        label: tab.split('.')[0],
        value: tab,
      })),
    [tabList]
  );

  useEffect(() => {
    if (tabs) {
      setSelectedTab(tabs[0]);
      setCurrentTabs([tabs[0]]);
    }
  }, [tabs]);

  return (
    <Box h="100vh" w="100vw" display="flex" flexDir="column" bg="background.500" overflow="auto">
      <AppBar />
      <Box bg="#f8f8f8" height="calc(100% - 5.75rem)" display="flex" flexDir="row">
        <Resizer width="12rem" constraints={['12rem', '50rem']}>
          <Box w="100%" display="flex" flexDir="column" gap="s16" p="s8">
            <Input placeholder="Search Table" size="sm" />
            <Box>
              {tabs?.map((tab) => (
                <Box
                  h="28px"
                  px="s8"
                  borderRadius="2px"
                  fontSize="s3"
                  cursor="pointer"
                  onClick={() => {
                    setCurrentTabs((prev) =>
                      prev?.some((p) => p.value === tab.value) ? prev : [...prev, tab]
                    );

                    setSelectedTab(tab);
                  }}
                  display="flex"
                  alignItems="center"
                  gap="s8"
                  position="relative"
                  // bg={selectedTab.value === tab.value ? '#e6e6e6' : 'transparent'}
                  color={selectedTab?.value === tab.value ? 'gray.900' : 'gray.600'}
                  key={tab.value}
                >
                  <Box flexShrink={0}>
                    <TableSvg />
                  </Box>

                  <Text wordBreak="break-all" noOfLines={1}>
                    {tab.label}
                  </Text>
                  {selectedTab?.value === tab.value ? (
                    <motion.div
                      layoutId="background"
                      transition={{
                        duration: 0.1,
                      }}
                      style={{
                        position: 'absolute',
                        left: 0,
                        borderRadius: '2px',
                        zIndex: '-1',
                        width: '100%',
                        top: 0,
                        height: '28px',
                        background: '#e6e6e6',
                      }}
                    />
                  ) : null}
                </Box>
              ))}
            </Box>
          </Box>
        </Resizer>
        <Box
          sx={{
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          overflowX="auto"
          flex={1}
          w="100%"
          bg="white"
          display="flex"
          flexDir="column"
        >
          <Box
            sx={{
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            overflowX="auto"
            display="flex"
            h="40px"
            flexShrink={0}
            ref={tabRef}
          >
            {currentTabs?.map((tab) => (
              <Box
                h="100%"
                px="s16"
                cursor="pointer"
                ref={selectedTab?.value === tab.value ? tabRef : null}
                onClick={() => setSelectedTab(tab)}
                borderRight="1px"
                borderRightColor="border.layout"
                fontSize="s3"
                bg={tab.value === selectedTab?.value ? 'white' : 'transparent'}
                display="flex"
                alignItems="center"
                position="relative"
                justifyContent="center"
                key={tab.value}
                gap="s8"
              >
                <Text>{tab.label}</Text>
                {currentTabs.length > 1 && (
                  <Icon
                    as={IoMdClose}
                    size="sm"
                    cursor="pointer"
                    color="gray.700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentTabs((prev) => {
                        const index = prev?.findIndex((v) => v.value === tab.value);

                        if (selectedTab?.value === tab.value) {
                          if (index === 0) {
                            setSelectedTab(currentTabs[1]);
                          } else if (index) {
                            setSelectedTab(currentTabs[index - 1]);
                          }
                        }

                        return prev?.filter((p) => p.value !== tab.value) || [];
                      });
                    }}
                    _hover={{ color: 'gray.800' }}
                  />
                )}
                {selectedTab?.value === tab.value ? (
                  <motion.div
                    layoutId="underline"
                    transition={{
                      duration: 0.1,
                    }}
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'green',
                      zIndex: '2',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: '#E0E5EB',
                    }}
                  />
                )}
              </Box>
            ))}
            <Box flex={1} h="40px" borderBottom="1px" borderBottomColor="border.layout" />
          </Box>
          {selectedTab?.value && (
            <Box
              p="s12"
              h="calc(100vh - 40px)"
              display="flex"
              alignItems="center"
              w="100%"
              justifyContent="center"
              overflowY="auto"
            >
              <DataGridTable tab={selectedTab?.value} />{' '}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

interface DataGridTableProps {
  tab: string;
}

const DataGridTable = React.memo(
  ({ tab }: DataGridTableProps) => {
    const tableContainerRef = React.useRef<DataGridHandle>(null);

    const {
      data: csvData,
      isFetching,
      fetchNextPage,
      isFetchingNextPage,
    } = useInfiniteQuery(['csv', tab], async ({ pageParam = 1 }) => getCSV(tab, pageParam), {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });

    const flatData = React.useMemo(
      () => csvData?.pages?.flatMap((page) => page.data) ?? [],
      [csvData]
    );

    const totalDBRowCount =
      flatData.length < 1000 ? flatData.length : (csvData?.pages[0].total_pages || 0) * 1000;
    const totalFetched = flatData.length;

    // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
    const fetchMoreOnBottomReached = React.useCallback(
      (containerRefElement?: HTMLDivElement | null) => {
        if (containerRefElement) {
          const { scrollHeight, scrollTop, clientHeight } = containerRefElement || {};
          // once the user has scrolled within 300px of the bottom of the table, fetch more data if there is any

          if (
            scrollHeight - scrollTop - clientHeight < 300 &&
            !isFetching &&
            totalFetched < totalDBRowCount
          ) {
            fetchNextPage();
          }
        }
      },
      [fetchNextPage, isFetching, totalFetched, totalDBRowCount]
    );

    // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
    React.useEffect(() => {
      fetchMoreOnBottomReached(tableContainerRef.current?.element);
    }, [fetchMoreOnBottomReached]);

    const finalData = flatData?.map((d) => d.data) || [];

    const columns =
      finalData.length !== 0
        ? Object.keys(finalData[0])?.map((column) => ({
            name: column,
            key: column,
          }))
        : [];

    if (isFetching && !isFetchingNextPage) {
      return <Spinner />;
    }
    return (
      <DataGrid
        onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
        className="rdg-light"
        style={{
          height: '100%',
          width: '100%',
          background: '#fff',
          color: 'gray',
          fontSize: '13px',
        }}
        columns={columns}
        rows={finalData}
      />
    );
  },
  (prevProps, nextProps) => prevProps.tab === nextProps.tab
);

interface ResizerProps {
  children: React.ReactNode;
  width: string | number;

  constraints: [number | string, number | string];
}

export const Resizer = ({ constraints, width, children }: ResizerProps) => {
  const sidebarRef = React.useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(width);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX - Number(sidebarRef?.current?.getBoundingClientRect()?.left)
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <Box
      as="div"
      flexGrow={0}
      flexShrink={0}
      minW={constraints[0]}
      maxW={constraints[1]}
      display="flex"
      borderRight="1px"
      borderRightColor="border.layout"
      zIndex={2}
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Box flex={1}>{children}</Box>
      <Box
        flexGrow={0}
        flexShrink={0}
        flexBasis="8px"
        justifySelf="flex-end"
        cursor="col-resize"
        resize="horizontal"
        _hover={{
          w: '3px',
          bg: '#c1c3c5b4',
        }}
        onMouseDown={startResizing}
      />
    </Box>
  );
};

export default Index;
