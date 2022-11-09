import Image from "next/legacy/image";

import { Report } from '@coop/cbs/reports/list';
import { Box, Text } from '@coop/shared/ui';

export const ReportOrganizationHeader = ({ reportType }: { reportType: Report }) => (
  <Box px="s32" py="s16" display="flex" alignItems="center" justifyContent="space-between">
    <Box display="flex" alignItems="center" gap="s16">
      <Box position="relative" w="s60" h="s60">
        <Image src="/neosystest.png" alt="report-page" layout="fill" />
      </Box>

      <Box display="flex" flexDir="column" gap="s4">
        <Text fontSize="l1" fontWeight="500" color="gray.800" lineHeight="0.8">
          Neosys Saving and Credit Cooperative Society Ltd.
        </Text>
        <Text fontSize="r1" fontWeight="400" color="gray.700">
          Contact: 01-44567 | Email: neosys@gmail.com | Website: www.neosys.com.np
        </Text>
      </Box>
    </Box>

    <Box>
      <Text fontSize="l1" fontWeight="500" color="gray.800">
        {reportType}
      </Text>
    </Box>
  </Box>
);
