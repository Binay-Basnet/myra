import { useEffect, useState } from 'react';

import { Avatar, Box, Text } from '@myra-ui';

import { useGetSingleEmployeeDetailsQuery } from '@coop/cbs/data-access';

type EmployeeDetailType = {
  employeeId: string;
};

export const EmployeeCard = ({ employeeId }: EmployeeDetailType) => {
  const [triggerQuery, setTriggerQuery] = useState(false);
  const { data: employeeData } = useGetSingleEmployeeDetailsQuery(
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
  const employeeDetails = employeeData?.hr?.employee?.employee?.getEmployee?.record;
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
          <Avatar
            name={`${employeeDetails?.firstName} ${employeeDetails?.middleName} ${employeeDetails?.lastName}`}
            size="lg"
            src=""
          />
          <Box>
            <Text
              fontSize="r1"
              fontWeight="500"
              color="primary.500"
              cursor="pointer"
              wordBreak="break-word"
            >
              {`${employeeDetails?.firstName} ${employeeDetails?.middleName} ${employeeDetails?.lastName}`}
            </Text>

            <Text fontSize="s3" fontWeight="400" color="gray.800">
              {employeeDetails?.id}
            </Text>

            <Text fontSize="s3" fontWeight="400" color="gray.800">
              {`${employeeDetails?.gender} | ${employeeDetails?.age}`}
            </Text>
          </Box>
        </Box>
        {/* <Box border="1px solid" borderRadius="br2" borderColor="border.layout">
          <Box bg="highlight.500" p="s16" display="flex" flexDirection="column" gap="s8">
            <Text fontSize="s3" fontWeight="600" color="primary.500">
              {employeeDetails?.employeeStatus}
            </Text>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};
