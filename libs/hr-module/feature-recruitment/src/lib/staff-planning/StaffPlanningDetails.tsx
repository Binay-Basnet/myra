import { IoCopyOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, DetailPageHeader, DetailPageTabs, Divider, Icon, Scrollable, Text } from '@myra-ui';

import { StaffPlanRecord, useGetStaffPlanQuery } from '@coop/cbs/data-access';

import Overview from './components/Overview';
import Vacancies from './components/Vacancies';

export const StaffPlanningDetails = () => {
  const router = useRouter();
  const tabQuery = router.query['tab'] as string;

  const { data } = useGetStaffPlanQuery(
    { id: router?.query?.['id'] as string },
    { enabled: !!router?.query?.['id'] }
  );
  const staffPlanData = data?.hr?.recruitment?.recruitment?.getStaffPlan?.data;

  return (
    <>
      <Box position="sticky" top="0" zIndex={10}>
        <DetailPageHeader
          title="Staff Planning"
          member={{
            name: staffPlanData?.title as string,
          }}
        />
      </Box>
      <Box display="flex">
        <Box
          w="320px"
          h="100%"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          borderRight="1px"
          borderRightColor="border.layout"
        >
          <Box p="s16">
            <Text fontSize="r1" fontWeight="medium">
              {staffPlanData?.title} ({staffPlanData?.date?.from?.local},{' '}
              {staffPlanData?.date?.to?.local})
            </Text>
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                {staffPlanData?.id}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => {}}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt="s16">
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                Total Cost Estimation
              </Text>
              <Text fontSize="r2" fontWeight="medium">
                {staffPlanData?.total_cost_estimation}
              </Text>
            </Box>
          </Box>
          <Divider />
          <Box p="s16">
            <Text fontSize="r1" fontWeight="medium">
              Total vacancies: {staffPlanData?.total_vacancies}
            </Text>
          </Box>
          <Divider />
          <DetailPageTabs tabs={['Overview', 'Vacancies']} />
        </Box>

        <Scrollable detailPage>
          <Box display="flex" flexDir="column" gap="s16" bg="background.500" minH="100vh">
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
              <Overview data={staffPlanData as StaffPlanRecord} />
            )}
            {tabQuery === 'vacancies' && <Vacancies data={staffPlanData as StaffPlanRecord} />}
          </Box>
        </Scrollable>
      </Box>
    </>
  );
};

export default StaffPlanningDetails;
