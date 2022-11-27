import { ReportLinkText } from '@coop/cbs/reports/list';
import { Box, Text } from '@myra-ui';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

export const OrganizationReportList = () => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Organization Report
    </Text>
    {REPORTS[ReportGroup.ORGANIZATIONS].map((report) => (
      <ReportLinkText key={report.id}>
        {report.id} - {report.report}
      </ReportLinkText>
    ))}
  </Box>
);
