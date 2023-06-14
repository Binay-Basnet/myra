import { ReactElement } from 'react';
import { HrRecruitmentJobOfferList } from '@hr/feature-recruitment';

import { HRLayout, HRRecruitmentSidebarayout } from '@coop/hr-module/ui-layouts';

// TODO ( Update this page when design arrives )
const JobOfferList = () => <HrRecruitmentJobOfferList />;

JobOfferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <HRLayout>
      <HRRecruitmentSidebarayout>{page}</HRRecruitmentSidebarayout>
    </HRLayout>
  );
};
export default JobOfferList;
