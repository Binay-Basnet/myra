import { useEffect, useState } from 'react';

import { Avatar, Box, Text } from '@myra-ui';

import { useGetHrLifecycleEmployeeViewQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';

type EmployeeDetailType = {
  employeeId: string;
};

export const EmployeeCard = ({ employeeId }: EmployeeDetailType) => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const { data: employeeData } = useGetHrLifecycleEmployeeViewQuery(
    {
      id: employeeId as string,
    },
    {
      enabled: triggerQuery && !!employeeId,
    }
  );
  useEffect(() => {
    if (employeeId) {
      setTriggerQuery(true);
    }
  }, [employeeId]);
  const employeeDetails = employeeData?.hr?.employee?.employee?.getEmployeeLifecycleView?.data;
  return (
    <Box w="20rem">
      <Box px="s16" py="s8">
        <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-60">
          Employee Info
        </Text>
      </Box>

      <Box
        p="s16"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        gap="s8"
        borderTop="1px"
        borderColor="border.layout"
      >
        <Box display="flex" gap="s8">
          <Avatar name={`${employeeDetails?.name}`} size="lg" src="" />
          <Box>
            <Text
              fontSize="r1"
              fontWeight="500"
              color="primary.500"
              cursor="pointer"
              wordBreak="break-word"
            >
              {employeeDetails?.name}
            </Text>

            <Text fontSize="s3" fontWeight="400" color="gray.800">
              {employeeDetails?.id}
            </Text>

            <Text fontSize="s3" fontWeight="400" color="gray.800">
              {`${employeeDetails?.gender} | ${employeeDetails?.age}`}
            </Text>
          </Box>
        </Box>
        <Box border="1px solid" borderRadius="br2" borderColor="border.layout">
          <Box
            bg="highlight.500"
            p="s16"
            display="flex"
            flexDirection="column"
            gap="s4"
            borderBottom="1px solid"
            borderRadius="br2"
            borderColor="border.layout"
          >
            <Box>
              <Text fontSize="r1" fontWeight="600" color="primary.500">
                {employeeDetails?.companyName}
              </Text>
              <Text fontSize="s3" fontWeight="500">
                {employeeDetails?.department}
              </Text>
            </Box>
            <Text fontSize="s2" fontWeight="500" color="primary.500">
              {employeeDetails?.status}
            </Text>
          </Box>
          <Box px="s16" py="s8" display="flex" flexDirection="column" gap="s4">
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                Email
              </Text>
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                {employeeDetails?.email}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                Department
              </Text>
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                {employeeDetails?.department}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                Contact Number
              </Text>
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                {employeeDetails?.contactNumber}
              </Text>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                Joining Date
              </Text>
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                {localizedDate(employeeDetails?.joiningDate)}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
