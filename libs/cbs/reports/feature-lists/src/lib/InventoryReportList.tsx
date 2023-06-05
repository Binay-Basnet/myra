import { Box, Text } from '@myra-ui';

import { ReportLinkText } from '@coop/cbs/reports/list';

import { ReportGroup, REPORTS } from '../constants/REPORTS';

interface IInventoryReportListProps {
  reportParentLink?: string;
}

export const InventoryReportList = ({
  reportParentLink = '/reports/cbs/inventory',
}: IInventoryReportListProps) => (
  <Box display="flex" flexDir="column" p="s16" gap="s16">
    <Text fontSize="r3" color="gray.800" fontWeight="600" py="s16">
      Inventory Reports{' '}
    </Text>
    {REPORTS[ReportGroup.INVENTORY].map((report) => (
      <ReportLinkText
        key={report.id}
        link={report.link ? `${reportParentLink}/${report.link}/new` : undefined}
      >
        {/* {report.id} -  */}
        {report.report}
      </ReportLinkText>
    ))}
  </Box>
);
