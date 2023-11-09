import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { Box, Icon, Input, Text } from '@myra-ui';

import { privateAgent } from '@coop/csv-viewer/data-access';
import { getAPIUrl } from '@coop/shared/utils';

import { Resizer, Tab, TableSvg } from '.';
import { AppBar } from '../components/AppBar';

const LedgerStatementReport = dynamic(() => import('../components/LedgerStatementReport'), {
  ssr: false,
});
const LoanStatementReport = dynamic(() => import('../components/LoanStatementReport'), {
  ssr: false,
});

const getReportTypes = async () => {
  const response = await privateAgent.get<{ data: string[] }>(`${getAPIUrl()}/report_types`);

  return response?.data;
};

export const Report = () => {
  const tabRef = useRef<HTMLInputElement | null>(null);

  const { data: tabList } = useQuery({
    queryKey: ['report_types'],
    queryFn: getReportTypes,
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
          {selectedTab?.value === 'LEDGER_STATEMENT' && <LedgerStatementReport />}
          {selectedTab?.value === 'LOAN_STATEMENT' && <LoanStatementReport />}
        </Box>
      </Box>
    </Box>
  );
};

export default Report;
