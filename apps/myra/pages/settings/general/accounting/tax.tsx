import { AccountingTaxSettings } from '@coop/cbs/settings/accounting';
import {
  SettingsAccountingLayout,
  SettingsGeneralLayout,
  SettingsLayout,
} from '@coop/cbs/settings/ui-layout';

const AccountingTaxPage = () => <AccountingTaxSettings />;

export default AccountingTaxPage;

AccountingTaxPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsAccountingLayout>{page}</SettingsAccountingLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
