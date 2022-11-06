import { useFormContext } from 'react-hook-form';
import Image from 'next/image';
import dayjs from 'dayjs';

import { ReportPeriodType } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

import { getPeriodDate } from '../utils/getPeriodDate';

type ReportFilter = {
  memberId: string;
  predefinedPeriod: ReportPeriodType;
  period?: {
    from?: string;
    to?: string;
  };
};

interface ReportOrganizationProps {
  filter: ReportFilter;
}

export const ReportOrganization = ({ filter }: ReportOrganizationProps) => {
  const { watch } = useFormContext();

  const period = watch('period');

  return (
    <Box p="s32" display="flex" flexDir="column" gap="s16" w="100%">
      <Box display="flex" alignItems="center" justifyContent="space-between">
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
            Share Statement Report
          </Text>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Box display="flex" gap="s4">
            <Text fontSize="r1" color="gray.700">
              Address:
            </Text>
            <Text fontSize="r1" color="gray.700" fontWeight="500">
              Ekantakuna, Lalitpur, Province 3
            </Text>
          </Box>

          <Box display="flex" gap="s4">
            <Text fontSize="r1" color="gray.700">
              Regd No:
            </Text>
            <Text fontSize="r1" color="gray.700" fontWeight="500">
              112233/2077/2978
            </Text>
          </Box>

          <Box display="flex" gap="s4">
            <Text fontSize="r1" color="gray.700">
              Pan No:
            </Text>
            <Text fontSize="r1" color="gray.700" fontWeight="500">
              123456789
            </Text>
          </Box>
        </Box>
        <Box display="flex" flexDir="column" alignItems="flex-end">
          <Box display="flex" gap="s4">
            <Text fontSize="r1" color="gray.700">
              Statement from:
            </Text>
            {period === 'everything' ? (
              <Text fontSize="r1" color="gray.700" fontWeight="500">
                Everything
              </Text>
            ) : (
              <Text fontSize="r1" color="gray.700" fontWeight="500">
                {getPeriodDate({ period: filter.predefinedPeriod }).from} to{' '}
                {getPeriodDate({ period: filter.predefinedPeriod }).to}
              </Text>
            )}
          </Box>

          <Box display="flex" gap="s4">
            <Text fontSize="r1" color="gray.700">
              Printed Date:
            </Text>
            <Text fontSize="r1" color="gray.700" fontWeight="500">
              {dayjs().format('YYYY-MM-DD')}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
