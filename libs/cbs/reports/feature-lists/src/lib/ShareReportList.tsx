import React from 'react';
import { useRouter } from 'next/router';

import { PopoverComponent } from '@coop/myra/components';
import { Table } from '@coop/shared/table';
import { Box, Text } from '@coop/shared/ui';
import { featureCode } from '@coop/shared/utils';

export const ShareReportList = () => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Share Report
    </Text>
    <Box display="flex" flexDir="column" gap="s16">
      <ReportLinkText link="/reports/cbs/share-report/new">
        102 - Share Register - {featureCode?.shareRegister}
      </ReportLinkText>
      <ReportLinkText link="/reports/cbs/share-report/new">
        302 - Share Transaction Report
      </ReportLinkText>
      <ReportLinkText link="/reports/cbs/share-report/new">
        120 - Share Consolidated Report
      </ReportLinkText>
      <ReportLinkText link="/reports/cbs/share-report/new">
        300 - Share Bonus Distribution Report
      </ReportLinkText>
      <ReportLinkText link="/reports/cbs/share-report/new">
        145 - Share Certificate Print
      </ReportLinkText>
    </Box>
  </Box>
);

export const ShareReportTable = () => (
  <Table
    data={[
      {
        code: 102,
        reportName: 'Share Register',
        category: 'Share',
      },
      {
        code: 302,
        reportName: 'Board of Directors Detail Register',
        category: 'Organization Profile / Report',
      },
      {
        code: 120,
        reportName: 'Board of Directors',
        category: 'Member',
      },
      {
        code: 300,
        reportName: 'Share Consolidated Report',
        category: 'Share',
      },
      {
        code: 300,
        reportName: 'Share Certificate Print',
        category: 'Share',
      },
    ]}
    columns={[
      {
        header: 'Code',
        accessorKey: 'code',
        meta: {
          width: '50px',
        },
      },
      {
        header: 'Report Name',
        accessorKey: 'reportName',
        meta: {
          width: '100%',
        },
      },
      {
        header: 'Share',
        accessorKey: 'category',
        meta: {
          width: '300px',
        },
      },
      {
        id: '_actions',
        header: '',
        cell: () => (
          <PopoverComponent
            items={[
              {
                title: 'memberListTableViewMemberProfile',
              },
              {
                title: 'memberListTableEditMember',
              },
              {
                title: 'memberListTableMakeInactive',
              },
            ]}
          />
        ),
        meta: {
          width: '60px',
        },
      },
    ]}
  />
);

interface ReportLinkTextProps {
  children: React.ReactNode;
  link: string;
}

export const ReportLinkText = ({ children, link }: ReportLinkTextProps) => {
  const router = useRouter();

  return (
    <Text
      fontSize="r1"
      cursor="pointer"
      color="gray.600"
      fontWeight="500"
      onClick={() => link && router.push(link)}
      _hover={{
        textDecoration: 'underline',
        color: 'primary.500',
      }}
    >
      {children}
    </Text>
  );
};
