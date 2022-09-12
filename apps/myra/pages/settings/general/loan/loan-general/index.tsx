import { CbsSettingsFeatureLoanProducts } from '@coop/cbs/settings/loan-products';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsLoanLayout,
} from '@coop/cbs/settings/ui-layout';

const LoanProducts = () => {
  return <CbsSettingsFeatureLoanProducts />;
};

export default LoanProducts;

LoanProducts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsLoanLayout>{page}</SettingsLoanLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
