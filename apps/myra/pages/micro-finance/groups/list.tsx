import { ReactElement } from 'react';
import { MicrofinanceLayout, MicrofinanceSidebarLayout } from '@micro-finance';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <>gg it is</>;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MicrofinanceLayout>
      <MicrofinanceSidebarLayout>{page}</MicrofinanceSidebarLayout>
    </MicrofinanceLayout>
  );
};
export default AccountingQuickTransferList;
