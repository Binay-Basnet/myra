import { ReactElement } from 'react';
import { HrRecruitmentJobOpeningAdd } from '@hr/feature-recruitment';

import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const JobOpeningEdit = () => <HrRecruitmentJobOpeningAdd />;

JobOpeningEdit.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default JobOpeningEdit;
