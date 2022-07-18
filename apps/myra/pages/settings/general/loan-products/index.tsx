import { CbsSettingsFeatureLoanProducts } from '@coop/cbs/settings/loan-products';
import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const LoanProducts = () => {
  return <CbsSettingsFeatureLoanProducts />;
};

export default LoanProducts;

LoanProducts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
