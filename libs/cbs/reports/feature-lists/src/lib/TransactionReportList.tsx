import { Box, Text } from '@myra-ui';

import { ReportLinkText } from '@coop/cbs/reports/list';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

interface ITransactionReportListProps {
  reportParentLink?: string;
}

export const TransactionReportList = ({
  reportParentLink = '/reports/cbs/transactions',
}: ITransactionReportListProps) => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Transaction Report
    </Text>
    {REPORTS[ReportGroup.TRANSACTION_REPORT].map((report) => (
      <ReportLinkText
        link={report.link ? `${reportParentLink}/${report.link}/new` : undefined}
        key={report.id}
      >
        {report.report}
      </ReportLinkText>
    ))}
  </Box>
);
