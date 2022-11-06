import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { ReportPeriodType } from '@coop/cbs/data-access';
import { Box, Text } from '@coop/shared/ui';

import { getPeriodDate } from '../utils/getPeriodDate';

interface ReportOrganizationProps {
  statementDate?: ReportPeriodType;
}

export const ReportOrganization = ({ statementDate }: ReportOrganizationProps) => {
  const { watch } = useFormContext();

  const period = watch('period');

  return (
    <Box px="s32" py="s16" display="flex" alignItems="center" justifyContent="space-between">
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
            statementDate && (
              <Text fontSize="r1" color="gray.700" fontWeight="500">
                {getPeriodDate({ period: statementDate }).from} to{' '}
                {getPeriodDate({ period: statementDate }).to}
              </Text>
            )
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
  );
};
