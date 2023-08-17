import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { BPMLayout } from '@coop/bpm/ui-layouts';
import { AccountOpenNew } from '@coop/cbs/accounts/account-form';

const AccountOpen = () => <AccountOpenNew />;

export default AccountOpen;

AccountOpen.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <Scrollable>{page}</Scrollable>
    </BPMLayout>
  );
};
