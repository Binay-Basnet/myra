import { ReactElement } from 'react';

import { HrLifecycleOnboardingAdd } from '@coop/hr-module/lifecycle';
import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const JobApplicationAdd = () => <HrLifecycleOnboardingAdd />;

JobApplicationAdd.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default JobApplicationAdd;
