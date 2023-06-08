import { ReactElement } from 'react';
import { HrRecruitmentStaffPlanningList } from '@hr/feature-recruitment';

import { HRLayout, HRRecruitmentSidebarayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const StaffPlanningList = () => <HrRecruitmentStaffPlanningList />;

StaffPlanningList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HRRecruitmentSidebarayout>{page}</HRRecruitmentSidebarayout>
    </HRLayout>
  );
};
export default StaffPlanningList;
