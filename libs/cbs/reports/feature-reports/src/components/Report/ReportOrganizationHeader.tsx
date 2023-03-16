import { Avatar, Box, Text } from '@myra-ui';

import { useAppSelector } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports/list';

export const ReportOrganizationHeader = ({ reportType }: { reportType: Report }) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <Box px="s16" py="s16" display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" gap="s16">
        <Box position="relative" w="60px" h="60px">
          <Avatar
            w="60px"
            h="60px"
            name={user?.organization?.basicDetails?.name as string}
            src={user?.organization?.basicDetails?.logo as string}
          />
        </Box>

        <Box display="flex" flexDir="column" gap="s4">
          <Text fontSize="l1" fontWeight="500" color="gray.800" lineHeight="0.8">
            {user?.organization?.basicDetails?.name}
          </Text>
          <Text fontSize="r1" fontWeight="400" color="gray.700">
            Contact: {user?.organization?.contactDetails?.phoneNumber} | Email:{' '}
            {user?.organization?.contactDetails?.email ?? 'N/A'} | Website:{' '}
            {user?.organization?.contactDetails?.website ?? 'N/A'}
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
};
