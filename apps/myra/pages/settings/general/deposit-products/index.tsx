import { SettingsDepositProducts } from '@coop/cbs/settings/deposit-products';
import {
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const DepositProducts = () => {
  return <SettingsDepositProducts />;
};

export default DepositProducts;

DepositProducts.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
