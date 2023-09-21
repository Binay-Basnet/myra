import React from 'react';
import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';
import { Table } from '@myra-ui/table';

import { Can } from '@coop/cbs/utils';
import { PopoverComponent } from '@coop/myra/components';

import { REPORTS } from '../constants/REPORTS';

const moduleObj = {
  CBS: 'cbs-reports',
  ACCOUNTING: 'accounting-reports',
};
type ModulesType = {
  module: keyof typeof moduleObj;
};
export const ShareReportList = ({ module }: ModulesType) => {
  const router = useRouter();
  const listName = router.query['report-group'] as keyof typeof REPORTS;
  return (
    <Box display="flex" flexDir="column" p="s16" gap="s16">
      <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16" textTransform="capitalize">
        {listName.toLowerCase()} Report
      </Text>
      {REPORTS[listName].map((report) => (
        <Can I="SHOW_IN_MENU" a={report.acl}>
          <ReportLinkText
            key={report.id}
            link={
              'link' in report
                ? `/${module?.toLocaleLowerCase()}/reports/${moduleObj[module]}/${listName}/${
                    report.link
                  }/new`
                : undefined
            }
          >
            {/* {report.id} -  */}
            {report.report}
          </ReportLinkText>
        </Can>
      ))}
    </Box>
  );
};

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
          width: '3.125rem',
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

  return link ? (
    <Text
      w="100%"
      fontSize="r1"
      cursor={link ? 'pointer' : 'default'}
      color={link ? 'gray.600' : 'gray.400'}
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
  ) : null;
};
