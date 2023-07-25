import { TransactionConstraintsList } from '@coop/cbs/settings/transaction-constraints';
import { SettingsGeneralLayout, SettingsLayout } from '@coop/cbs/settings/ui-layout';
import { Can } from '@coop/cbs/utils';

const Loan = () => (
  <Can I="SHOW_IN_MENU" a="SETTINGS_TRANSACTION_CONSTRAINT" showError isErrorCentered>
    <TransactionConstraintsList />
  </Can>
);

export default Loan;
Loan.getLayout = function getLayout(page) {
  return (
    <SettingsLayout>
      <SettingsGeneralLayout>{page}</SettingsGeneralLayout>
    </SettingsLayout>
  );
};
