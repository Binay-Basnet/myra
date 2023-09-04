import { StaffPlanRecord } from '@coop/cbs/data-access';
import {
  DetailsKeyValueCard,
  DetailsKeyValueCards,
  DetailsPageHeaderBox,
} from '@coop/shared/components';

export const Overview = (props: { data: StaffPlanRecord }) => {
  const { data } = props;
  return (
    <>
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
    </>
  );
};

export default Overview;
