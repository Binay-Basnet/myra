import { ReactElement } from 'react';
import { HrRecruitmentJobOfferAdd } from '@hr/feature-recruitment';

import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const JobOfferAdd = () => <HrRecruitmentJobOfferAdd />;

JobOfferAdd.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default JobOfferAdd;
