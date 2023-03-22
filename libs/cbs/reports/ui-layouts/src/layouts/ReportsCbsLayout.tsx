import React from 'react';
import { useRouter } from 'next/router';

import { Box, PageHeader, Scrollable } from '@myra-ui';

import { featureCode } from '@coop/shared/utils';

import { ReportsInnerSidebar } from '../components/ReportsInnerSidebar';

interface ReportsCbsLayoutProps {
  children: React.ReactNode;
}

export const ReportsCbsLayout = ({ children }: ReportsCbsLayoutProps) => {
  const router = useRouter();

  return (
    <>
      <PageHeader
        heading={`Core Banking System Reports - ${featureCode?.cbsReports}`}
        tabItems={[
          {
            title: 'reportsListView',
            key: 'list-view',
          },
        ]}
      />
      <Box display="flex">
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
        <Scrollable detailPage>
          <Box
            ml={router.query['objState'] !== 'table-view' ? '250px' : '0'}
            bg="white"
            // minH="calc(100vh-170px)"
          >
            {children}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};
