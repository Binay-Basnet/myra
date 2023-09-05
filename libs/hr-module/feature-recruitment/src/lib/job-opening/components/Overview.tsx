import { Box, Text } from '@myra-ui';

import { JobOpeningOverview } from '@coop/cbs/data-access';
import { DetailsKeyValueCard, DetailsPageHeaderBox } from '@coop/shared/components';

export const Overview = (props: { data: JobOpeningOverview }) => {
  const { data } = props;
  return (
    <>
      <DetailsPageHeaderBox title="Overview" />
      <DetailsKeyValueCard
        title="General Information"
        keyValueList={[
          { label: 'Job Title', value: data?.jobTitle as string },
          { label: 'Job Id', value: data?.jobId as string },
          { label: 'Staff Plan', value: data?.staffPlan as string },
          { label: 'Department', value: data?.department as string },
          { label: 'Designation', value: data?.designation as string },
          { label: 'Experience Level', value: data?.experienceLevel as string },
          { label: 'Description', value: data?.description as string },
        ]}
      />

      <Box mx="s24" p="s16" bg="white" borderRadius={4} boxShadow="xs">
        <Text fontSize="r1" color="gray.600" mb="s24">
          Salary Range
        </Text>
        <Box ml="s24">
          <ul>
            <li>
              <Box display="flex" fontSize="r1" color="gray.700">
                Default Amount: &nbsp;<Text fontWeight="semibold">{data?.defaulAmount}</Text>
              </Box>
            </li>
            <li>
              {' '}
              <Box display="flex" fontSize="r1" color="gray.700">
                Minimum Salary: &nbsp;<Text fontWeight="semibold">{data?.minimumAmount}</Text>
              </Box>
            </li>
            <li>
              <Box display="flex" fontSize="r1" color="gray.700">
                Maximum Salary: &nbsp;<Text fontWeight="semibold">{data?.maximumAmount}</Text>
              </Box>
            </li>
          </ul>
        </Box>
      </Box>
    </>
  );
};

export default Overview;
