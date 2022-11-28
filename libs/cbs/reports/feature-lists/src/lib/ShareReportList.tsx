import React from 'react';
import { useRouter } from 'next/router';

import { PopoverComponent } from '@coop/myra/components';
import { Table } from '@coop/shared/table';
import { Box, Text } from '@myra-ui';
import { featureCode } from '@coop/shared/utils';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

export const ShareReportList = () => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Share Report
    </Text>
    {REPORTS[ReportGroup.SHARE].map((report) => (
      <ReportLinkText
        key={report.id}
        link={report.link ? `/reports/cbs/share/${report.link}/new` : undefined}
      >
        {report.id} - {report.report} - {featureCode?.shareRegister}
      </ReportLinkText>
    ))}
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
  link?: string;
}

export const ReportLinkText = ({ children, link }: ReportLinkTextProps) => {
  const router = useRouter();

  return (
    <Text
      w="100%"
      fontSize="r1"
      cursor={link ? 'pointer' : 'default'}
      color="gray.600"
      fontWeight="500"
      onClick={() => link && router.push(link)}
      _hover={
        link
          ? {
              textDecoration: 'underline',
              color: 'primary.500',
            }
          : {}
      }
    >
      {children}
    </Text>
  );
};
