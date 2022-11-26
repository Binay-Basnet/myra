import React from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeaderWithTabs } from '@myra-ui';

import { ReportsInnerSidebar } from '../components/ReportsInnerSidebar';

interface ReportsCbsLayoutProps {
  children: React.ReactNode;
}

export const ReportsCbsLayout = ({ children }: ReportsCbsLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <PageHeaderWithTabs
        heading="Core Banking System Reports"
        tabItems={[
          {
            title: 'reportsListView',
            key: 'list-view',
          },
          // {
          //   title: 'reportsTableView',
          //   key: 'table-view',
          // },
        ]}
      />

      {router.query['objState'] !== 'table-view' && (
        <Box
          w="250px"
          px="s8"
          position="fixed"
          py="s16"
          borderRight="1px"
          borderRightColor="border.layout"
          minHeight="100vh"
          bg="white"
        >
          <ReportsInnerSidebar />
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
