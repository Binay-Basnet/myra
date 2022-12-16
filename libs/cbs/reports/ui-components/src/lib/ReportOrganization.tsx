import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { Box, Text } from '@myra-ui';

import { LocalizedDateFilter, useAppSelector } from '@coop/cbs/data-access';
import { formatAddress, localizedDate } from '@coop/cbs/utils';

export const ReportOrganization = () => {
  const { watch } = useFormContext();
  const user = useAppSelector((state) => state.auth.user);

  const period = watch('period') as LocalizedDateFilter;
  console.log(period);

  return (
    <Box
      borderBottom="1px"
      borderBottomColor="border.layout"
      px="s16"
      py="s16"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box>
        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Address:
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {formatAddress(user?.organization?.address)}
          </Text>
        </Box>

        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Regd No:
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {user?.organization?.registrationDetails?.regdNo ?? 'N/A'}
          </Text>
        </Box>

        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Pan:
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {user?.organization?.registrationDetails?.panOrVat ?? 'N/A'}
          </Text>
        </Box>
      </Box>
      <Box display="flex" flexDir="column" alignItems="flex-end">
        <Box display="flex" gap="s4">
          <Text fontSize="r1" color="gray.700">
            Statement from:
          </Text>

          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {localizedDate(period?.from)}
          </Text>
          <Text fontSize="r1" color="gray.700">
            to
          </Text>
          <Text fontSize="r1" color="gray.700" fontWeight="500">
            {localizedDate(period?.to)}
          </Text>
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
