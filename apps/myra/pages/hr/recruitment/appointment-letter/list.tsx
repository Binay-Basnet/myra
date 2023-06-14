import { ReactElement } from 'react';
import { HrRecruitmentAppointmentLetterList } from '@hr/feature-recruitment';

import { HRLayout, HRRecruitmentSidebarayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AppointmentLetterList = () => <HrRecruitmentAppointmentLetterList />;

AppointmentLetterList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HRRecruitmentSidebarayout>{page}</HRRecruitmentSidebarayout>
    </HRLayout>
  );
};
export default AppointmentLetterList;
