import { TransactionsPennyRestrictions } from '@coop/cbs/settings/transactions';
import {
  SettingsGeneralLayout,
  SettingsLayout,
  SettingsTransactionsLayout,
} from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const PennyRestrictionPage = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_TRANSACTION_CONSTRAINT" showError isErrorCentered>
    <TransactionsPennyRestrictions />
  </Can>
);

export default PennyRestrictionPage;
PennyRestrictionPage.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>
        <SettingsTransactionsLayout>{page}</SettingsTransactionsLayout>
      </SettingsGeneralLayout>
    </SettingsLayout>
  );
};
