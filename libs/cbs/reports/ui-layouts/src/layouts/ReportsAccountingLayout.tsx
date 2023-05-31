import React from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeader } from '@myra-ui';

import { ReportsInnerSidebar } from '../components/ReportsInnerSidebar';

interface ReportsCbsLayoutProps {
  children: React.ReactNode;
}

export const ReportsAccountingLayout = ({ children }: ReportsCbsLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        heading="Accounting Reports"
        tabItems={[
          {
            title: 'reportsListView',
            key: 'list-view',
          },
        ]}
      />

      {router.query['objState'] !== 'table-view' && (
        <Box
          w="250px"
          px="s8"
          position="fixed"
          py="s40"
          borderRight="1px"
          borderRightColor="border.layout"
          minHeight="100vh"
          bg="white"
        >
          <Box pt="s16">
            <ReportsInnerSidebar
              tabs={[
                {
                  title: 'Transaction Report',
                  to: '/accounting/reports/transactions',
                },
                {
                  title: 'Inventory Report',
                  to: '/accounting/reports/inventory',
                },
              ]}
            />
          </Box>
        </Box>
      )}

      <Box
        ml={router.query['objState'] !== 'table-view' ? '250px' : '0'}
        bg="white"
        minH="calc(100vh-110px)"
      >
        {children}
      </Box>
    </>
  );
};
