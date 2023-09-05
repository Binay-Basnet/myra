import { useRouter } from 'next/router';

import { Box, Text } from '@myra-ui';

import { StaffPlanRecord } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import {
  DetailsAlertBar,
  DetailsKeyValueCard,
  DetailsKeyValueCards,
  DetailsPageHeaderBox,
} from '@coop/shared/components';

export const Overview = (props: { data: StaffPlanRecord }) => {
  const { data } = props;
  const router = useRouter();

  return (
    <>
      <Box mb="-s16">
        <DetailsAlertBar
          title="Create new Job Opening"
          buttonText="Create Job Opening"
          alertButtonHandler={() => router.push(ROUTES?.HR_RECRUITMENT_JOB_OPENING_ADD)}
        />
      </Box>
      <DetailsPageHeaderBox title="Overview" />
      <DetailsKeyValueCards
        keyValueList={[
          { label: 'Total Vacancies', value: data?.total_vacancies },
          { label: 'Total Cost Estimation', value: data?.total_cost_estimation },
        ]}
      />
      <DetailsKeyValueCard
        title="General Information"
        keyValueList={[
          { label: 'Staff Plan', value: data?.title },
          { label: 'Staff Plan ID', value: data?.id },
          { label: 'Total Vacancies', value: data?.total_vacancies },
          { label: 'Open Position', value: data?.total_vacancies },
          { label: 'Date from', value: data?.date?.from?.local },
          { label: 'Date to', value: data?.date?.to?.local },
        ]}
      />

      <Box mx="s24" p="s16" bg="white" borderRadius={4} boxShadow="xs">
        <Text fontSize="r1" color="gray.600" mb="s24">
          Note
        </Text>
        <Text fontSize="s3" color="gray.700">
          {data?.note}
        </Text>
      </Box>
    </>
  );
};

export default Overview;
