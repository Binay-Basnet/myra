import { SettingsDepositProductsAdd } from '@coop/cbs/settings/deposit-products';
import { SettingsLayout } from '@coop/cbs/settings/ui-layout';

const DepositProducts = () => <SettingsDepositProductsAdd />;

export default DepositProducts;

DepositProducts.getLayout = function getLayout(page) {
  return <SettingsLayout>{page}</SettingsLayout>;
};
