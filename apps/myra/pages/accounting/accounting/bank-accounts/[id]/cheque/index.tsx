import { ReactElement } from 'react';

import { ChequeDetailPage } from '@coop/accounting/accounting';
import { AccountsDetailPageLayout } from '@coop/accounting/ui-components';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';

// const tabList = [
//   {
//     title: 'bankAccountsOverview',
//     to: '/accounting/accounting/bank-accounts/12123/overview',
//   },
//   {
//     title: 'bankAccountsBankStatement',
//     to: '/accounting/accounting/bank-accounts/12123/bank-statement',
//   },
//   {
//     title: 'bankAccountsBookStatement',
//     to: '/accounting/accounting/bank-accounts/12123/book-statement',
//   },
//   {
//     title: 'bankAccountsReconcillationReport',
//     to: '/accounting/accounting/bank-accounts/12123/reconcillation-report',
//   },
//   {
//     title: 'bankAccountsCheque',
//     to: '/accounting/accounting/bank-accounts/12123/cheque',
//   },
//   {
//     title: 'bankAccountsTasks',
//     to: '/accounting/accounting/bank-accounts/12123/tasks',
//   },
//   {
//     title: 'bankAccountsDocuments',
//     to: '/accounting/accounting/bank-accounts/12123/documents',
//   },
//   {
//     title: 'bankAccountsActivity',
//     to: '/accounting/accounting/bank-accounts/12123/activity',
//   },
// ];

// TODO ( Update this page when design arrives )
const AccountingBankAccountsDetail = () => <ChequeDetailPage />;

AccountingBankAccountsDetail.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>
        <AccountsDetailPageLayout>{page}</AccountsDetailPageLayout>
      </AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingBankAccountsDetail;
