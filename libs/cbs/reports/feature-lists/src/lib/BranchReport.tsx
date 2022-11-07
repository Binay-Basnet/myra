import { ReportLinkText } from '@coop/cbs/reports/list';
import { Box, Text } from '@coop/shared/ui';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

export const BranchReport = () => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Branch Reports
    </Text>
    {REPORTS[ReportGroup.BRANCH].map((report) => (
      <ReportLinkText key={report.id}>{report.report}</ReportLinkText>
    ))}
  </Box>
);
