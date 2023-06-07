import { ReactElement } from 'react';
import { HrRecruitmentStaffPlanningAdd } from '@hr/feature-recruitment';

import { HRLayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <HrRecruitmentStaffPlanningAdd />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return <HRLayout>{page}</HRLayout>;
};
export default AccountingQuickTransferList;
