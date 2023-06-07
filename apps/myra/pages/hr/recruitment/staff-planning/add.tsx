import { ReactElement } from 'react';
import { HrRecruitmentStaffPlanningAdd } from '@hr/feature-recruitment';

import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const StaffPlanningAdd = () => <HrRecruitmentStaffPlanningAdd />;

StaffPlanningAdd.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default StaffPlanningAdd;
