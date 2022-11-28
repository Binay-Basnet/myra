import { ReportLinkText } from '@coop/cbs/reports/list';
import { Box, Text } from '@myra-ui';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

export const MemberReportList = () => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Member Report
    </Text>
    {REPORTS[ReportGroup.MEMBERS].map((report) => (
      <ReportLinkText
        key={report.id}
        link={report.link ? `/reports/cbs/members/${report.link}/new` : undefined}
      >
        {report.id} - {report.report}
      </ReportLinkText>
    ))}
  </Box>
);
