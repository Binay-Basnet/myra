import { SettingsDepositProducts } from '@coop/cbs/settings/deposit-products';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const DepositProducts = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_SAVING_PRODUCTS" showError isErrorCentered>
    <SettingsDepositProducts />
  </Can>
);

export default DepositProducts;

DepositProducts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
