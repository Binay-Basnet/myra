import { LoanProductsInsurance as LoanProductsInsuranceForm } from '@coop/cbs/settings/loan-products';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsLoanLayout,
} from '@coop/cbs/settings/ui-layout';
const LoanProductsInsurance = () => {
  return <LoanProductsInsuranceForm />;
};

export default LoanProductsInsurance;

LoanProductsInsurance.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsLoanLayout>{page}</SettingsLoanLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
