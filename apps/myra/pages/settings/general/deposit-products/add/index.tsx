import { SettingsDepositProductsAdd } from '@coop/cbs/settings/deposit-products';
import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const DepositProducts = () => {
  return <SettingsDepositProductsAdd />;
};

export default DepositProducts;

DepositProducts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
