import { CbsSettingsFeatureDeposit } from '@coop/cbs/settings/deposit';
import {
  SettingsDepositLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const Deposit = () => <CbsSettingsFeatureDeposit />;

export default Deposit;

Deposit.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsDepositLayout>{page}</SettingsDepositLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
