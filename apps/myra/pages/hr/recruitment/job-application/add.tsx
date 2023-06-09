import { ReactElement } from 'react';
import { HrRecruitmentJobApplicationAdd } from '@hr/feature-recruitment';

import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const JobApplicationAdd = () => <HrRecruitmentJobApplicationAdd />;

JobApplicationAdd.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default JobApplicationAdd;
