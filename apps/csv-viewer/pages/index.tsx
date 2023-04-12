import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { motion } from 'framer-motion';

import { Box, Icon, Input, Text } from '@myra-ui';

type Tab = {
  label: string;
  value: string;
};

const tabs: Tab[] = [
  {
    label: 'ACTransfer',
    value: 'acTransfer',
  },
  {
    label: 'AccessLog',
    value: 'accesslog',
  },
  {
    label: 'AccountCloseDetails',
    value: 'accountCloseDetails',
  },
  {
    label: 'AccountingOrganization',
    value: 'accountingOrganization',
  },
  {
    label: 'Address',
    value: 'address',
  },
  {
    label: 'Agents',
    value: 'agents',
  },
  {
    label: 'AllAccount',
    value: 'allAccount',
  },
  {
    label: 'AlternativeChannelCharges',
    value: 'alternativeChannelCharges',
  },
  {
    label: 'AuditLog',
    value: 'auditlog',
  },
  {
    label: 'Bank',
    value: 'bank',
  },
  {
    label: 'Branch',
    value: 'branch',
  },
  {
    label: 'Member',
    value: 'member',
  },
  { label: 'MembershipFeePayment', value: 'membershipFeePayment' },
  {
    label: 'Membership ',
    value: 'membershipRequest',
  },
  {
    label: 'MoneyJournal',
    value: 'moneyJournal',
  },
  {
    label: 'CashInTransit',
    value: 'cashInTransit',
  },
  {
    label: 'CbsCodeManagement',
    value: 'cbsCodeManagement',
  },
  {
    label: 'ChartsOfAccounts',
    value: 'chartsofAccounts',
  },
];

const TableSvg = () => (
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

export const Index = () => {
  const tabRef = useRef<HTMLInputElement | null>(null);

  const [currentTabs, setCurrentTabs] = useState<Tab[]>([tabs[0]]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    if (tabRef.current) {
      tabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'end',
      });
    }
  }, [selectedTab.value]);

  return (
    <Box h="100vh" w="100vw" display="flex" flexDir="column" bg="background.500" overflow="hidden">
      <Box
        h="3rem"
        w="100%"
        bg="primary.500"
        display="flex"
        alignItems="center"
        color="white"
        fontSize="r1"
        fontWeight={500}
        px="s16"
      >
        CSV-VIEWER
      </Box>
      <Box
        h="2.75rem"
        px="s16"
        borderBottom="1px"
        bg="#F3F3F3"
        borderBottomColor="border.layout"
        display="flex"
        alignItems="center"
      >
        Myra Prod
      </Box>
      <Box bg="#f8f8f8" height="100%" display="flex" flexDir="row">
        <Resizer width="12rem" constraints={['12rem', '50rem']}>
          <Box w="100%" display="flex" flexDir="column" gap="s16" p="s8">
            <Input placeholder="Search Table" size="sm" />
            <Box>
              {tabs.map((tab) => (
                <Box
                  h="28px"
                  px="s8"
                  borderRadius="2px"
                  fontSize="s3"
                  cursor="pointer"
                  onClick={() => {
                    setCurrentTabs((prev) =>
                      prev.some((p) => p.value === tab.value) ? prev : [...prev, tab]
                    );

                    setSelectedTab(tab);
                  }}
                  display="flex"
                  alignItems="center"
                  gap="s8"
                  position="relative"
                  // bg={selectedTab.value === tab.value ? '#e6e6e6' : 'transparent'}
                  color={selectedTab.value === tab.value ? 'gray.900' : 'gray.600'}
                  key={tab.value}
                >
                  <Box flexShrink={0}>
                    <TableSvg />
                  </Box>

                  <Text wordBreak="break-all" noOfLines={1}>
                    {tab.label}
                  </Text>
                  {selectedTab.value === tab.value ? (
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
          flex={1}
          sx={{
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          overflowX="auto"
          display="flex"
          h="40px"
          ref={tabRef}
        >
          {currentTabs?.map((tab) => (
            <Box
              h="100%"
              px="s16"
              cursor="pointer"
              ref={selectedTab.value === tab.value ? tabRef : null}
              onClick={() => setSelectedTab(tab)}
              borderRight="1px"
              borderRightColor="border.layout"
              fontSize="s3"
              bg={tab.value === selectedTab.value ? 'white' : 'transparent'}
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
                      const index = prev.findIndex((v) => v.value === tab.value);

                      if (selectedTab.value === tab.value) {
                        if (index === 0) {
                          setSelectedTab(currentTabs[1]);
                        } else {
                          setSelectedTab(currentTabs[index - 1]);
                        }
                      }

                      return prev.filter((p) => p.value !== tab.value);
                    });
                  }}
                  _hover={{ color: 'gray.800' }}
                />
              )}
              {selectedTab.value === tab.value ? (
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
      </Box>
    </Box>
  );
};

interface ResizerProps {
  children: React.ReactNode;
  width: string | number;

  constraints: [number | string, number | string];
}

const Resizer = ({ constraints, width, children }: ResizerProps) => {
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
