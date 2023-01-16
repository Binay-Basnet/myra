import { SettingsLoanProduct } from '@coop/cbs/settings//feature-loan';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const Loan = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_LOAN_PRODUCTS" showError isErrorCentered>
    <SettingsLoanProduct />
  </Can>
);

export default Loan;
Loan.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
