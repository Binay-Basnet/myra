import { ReportLinkText } from '@coop/cbs/reports/list';
import { Box, Text } from '@coop/shared/ui';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

export const OthersReportList = () => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Other Reports
    </Text>
    {REPORTS[ReportGroup.OTHERS].map((report) => (
      <ReportLinkText
        key={report.id}
        link={report.link ? `/reports/cbs/others/${report.link}/new` : undefined}
      >
        {report.report}
      </ReportLinkText>
    ))}
  </Box>
);
