import { ReactElement } from 'react';
import { HrRecruitmentAppointmentLetterAdd } from '@hr/feature-recruitment';

import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AppointmentLetterAdd = () => <HrRecruitmentAppointmentLetterAdd />;

AppointmentLetterAdd.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default AppointmentLetterAdd;
