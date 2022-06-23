import { SettingsDepositProductsForm } from '@coop/cbs/settings/deposit-products';
import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const Loan = () => {
  return <SettingsDepositProductsForm />;
};

export default Loan;
Loan.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
