import { SettingsLoanProductForm } from '@coop/cbs/settings/feature-loan';
import { SettingsLayout } from '@coop/cbs/settings/ui-layout';

const Loan = () => <SettingsLoanProductForm />;

export default Loan;
Loan.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
