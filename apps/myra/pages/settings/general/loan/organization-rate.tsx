import { LoanOrganizationRate } from '@coop/cbs/settings/loan-products';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsLoanLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const LoanOrganizationRatePage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_LOAN_PARAMETERS" showError isErrorCentered>
    <LoanOrganizationRate />
  </Can>
);

LoanOrganizationRatePage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsLoanLayout>{page}</SettingsLoanLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};

export default LoanOrganizationRatePage;
