import { SettingsLoanProduct } from '@coop/cbs/settings//feature-loan';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Loan = () => <SettingsLoanProduct />;

export default Loan;
Loan.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
