import { Box, Text } from '@myra-ui';

import { ReportLinkText } from '@coop/cbs/reports/list';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

export const ExceptionReportList = () => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Exception Reports{' '}
    </Text>
    {REPORTS[ReportGroup.EXCEPTION].map((report) => (
      <ReportLinkText
        key={report.id}
        link={report.link ? `/reports/cbs/exceptions/${report.link}/new` : undefined}
      >
        {/* {report.id} -  */}
        {report.report}
      </ReportLinkText>
    ))}
  </Box>
);
