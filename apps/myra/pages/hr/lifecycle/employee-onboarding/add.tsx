import { ReactElement } from 'react';

import { HrLifecycleOnboardingAdd } from '@coop/hr-module/lifecycle';
import { HRLayout } from '@coop/hr-module/ui-layouts';

const OnbaordingEmployeeAdd = () => <HrLifecycleOnboardingAdd />;

OnbaordingEmployeeAdd.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default OnbaordingEmployeeAdd;
