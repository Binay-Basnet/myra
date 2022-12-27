import { ReactElement } from 'react';

import { COADetailPage } from '@coop/cbs/settings/coa';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const LoanProductDetailPage = () => <COADetailPage />;

LoanProductDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
export default LoanProductDetailPage;
